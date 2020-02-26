import React, {
  useMemo,
  useCallback,
  useRef,
  useEffect,
  useState,
} from 'react';
import ReactDOM from 'react-dom';
import { Editor, Transforms, Range, createEditor, Node, Point } from 'slate';
import deepEqual from 'fast-deep-equal';
import _ from 'lodash';
import {
  Slate,
  Editable,
  ReactEditor,
  withReact,
  useSelected,
  useFocused,
  RenderElementProps,
} from 'slate-react';
import Downshift from 'downshift';
import { Text, Box, Button } from '@chakra-ui/core';
import { useAuth } from '../hooks/useAuth';
import { usePrevious } from '../hooks/usePrevious';
import { useLocation } from 'react-router-dom';
import { useHotKey } from '../hooks/useHotKey';

export const Portal = ({ children }: any) => {
  return ReactDOM.createPortal(children, document.body);
};

const getFiltersFromValue = (value: Node[]) => {
  const [{ children = [] } = {}] = value;

  try {
    return children
      .filter(({ type }: any) => type === 'filter')
      .map(({ filter }: any) => filter);
  } catch (e) {
    return [];
  }
};

const initialValue = [
  {
    children: [{ text: '', marks: [] }],
  },
];

export interface Filter {
  name?: string;
  value?: string;
  values?: string[];
}

export interface FilterInputState {
  targetRange: Range | null;
  filter: Filter;
}

const initialSearchState = {
  targetRange: null,
  filter: {
    name: '',
    value: '',
  },
};

export const filterNames = [
  { value: 'type', name: 'type:' },
  { value: '-type', name: '-type:' },
  { value: 'label', name: 'label:' },
  { value: '-label', name: '-label:' },
  { value: 'is', name: 'is:' },
  { value: '-is', name: '-is:' },
];

export const toFilterNode = (filter: Filter) => ({
  type: 'filter',
  filter,
  children: [{ text: '', marks: [] }],
});

const getValueFromFilter = (filters: Filter[] = []) => {
  return filters.length
    ? [
        {
          children: [
            ...filters.reduce(
              // @ts-ignore
              (p, filter) => [
                ...p,
                ...(filter.values
                  ? filter.values.map(value =>
                      toFilterNode({ name: filter.name, value }),
                    )
                  : [toFilterNode(filter)]),
              ],
              [],
            ),
            { text: ' ', type: 'spacer', marks: [] },
          ],
        },
      ]
    : initialValue;
};

const FilterSearchInput = ({ onChange, filters, shouldFocusOnMount }: any) => {
  const [value, setValue] = useState(getValueFromFilter(filters));
  const [isFocused, setIsFocused] = useState(false);

  const [searchState, setState] = useState<FilterInputState>(
    initialSearchState,
  );

  const renderElement = useCallback(props => <Element {...props} />, []);
  const editor = useMemo(() => withFilters(withReact(createEditor())), []);

  const { user } = useAuth();

  const prevFilters = usePrevious(filters);

  const inputRef = useRef(null);

  useHotKey('/', () => {
    // @ts-ignore
    ReactEditor.focus(editor);
  });

  const filterValues: any = {
    type: {
      options: [
        { value: 'file' },
        { value: 'link' },
        { value: 'note' },
        { value: 'contact' },
      ],
    },
    label: {
      options: user.labels.map(({ name }) => ({ value: name })),
    },
    is: {
      options: [
        { value: 'favorited' },
        { value: 'not started' },
        { value: 'in progress' },
        { value: 'done' },
      ],
    },
  };

  const key = (searchState.filter?.name || '').replace('-', '');

  let options = key
    ? // @ts-ignore
      filterValues[key]?.options
    : filterNames;

  const getCurrentNodeRange = (editor: Editor) => {
    // @ts-ignore
    const [start] = Range.edges(editor.selection);
    // @ts-ignore
    const [node, path] = Editor.node(editor, editor.selection);

    const range = Editor.range(editor, path, start);

    return { node, range, start, path };
  };

  useEffect(() => {
    // @ts-ignore
    requestAnimationFrame(() => {
      // Transforms.setSelection(editor, {
      //   anchor: Editor.start(editor, []),
      //   focus: Editor.end(editor, []),
      // });
      // // @ts-ignore
      // ReactEditor.focus(editor);
      // Transforms.select(editor, Editor.end(editor, []));

      if (shouldFocusOnMount) {
        // @ts-ignore
        ReactEditor.focus(editor);
        Transforms.insertText(editor, ' ');
        Transforms.select(editor, Editor.end(editor, []));
      }
    });
  }, []);

  useEffect(() => {
    if (isFocused && onChange) onChange(getFiltersFromValue(value));
  }, [value]);

  useEffect(() => {
    if (!isFocused && deepEqual(prevFilters, filters)) {
      setValue(getValueFromFilter(filters));
    }
  }, [prevFilters]);

  options = options
    .filter(({ name, value }: any) =>
      (name || value)
        .toLowerCase()
        .includes(
          searchState.filter?.name
            ? (searchState.filter?.value || '').toLowerCase()
            : searchState.filter?.value,
        ),
    )
    .slice(0, 10);

  const onKeyDown = useCallback(
    (getInputProps, { setHighlightedIndex, highlightedIndex }: any) => (
      event: any,
    ) => {
      const { onKeyDown } = getInputProps();
      const { filter, targetRange } = searchState;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          event.stopPropagation();

          setHighlightedIndex(
            highlightedIndex !== null
              ? highlightedIndex >= options.length - 1
                ? 0
                : highlightedIndex + 1
              : 0,
          );

          break;
        case 'ArrowUp':
          event.preventDefault();
          event.stopPropagation();

          setHighlightedIndex(
            highlightedIndex <= 0 ? null : highlightedIndex - 1,
          );
          break;
        case 'Tab':
        case 'Enter':
          event.preventDefault();
          event.stopPropagation();

          // @ts-ignore
          if (!targetRange) {
            Transforms.insertNodes(editor, {
              children: [{ text: '' }],
            });
          }

          // @ts-ignore
          Transforms.select(
            editor,
            targetRange || getCurrentNodeRange(editor)?.range,
          );

          if (highlightedIndex === null || !options.length) {
            // foo -> |foo|
            // Generic "all" search
            insertFilter(editor, filter);
          } else if (filter?.name && options[highlightedIndex]) {
            // e.g. type:fi -> |type:file|
            // If there is an active "filter by" and a selected index
            const option = options[highlightedIndex];
            insertFilter(editor, {
              name: filter?.name,
              value: option.name || option.value,
            });
          } else if (options[highlightedIndex]) {
            // e.g. ty -> type:
            // Selecting an option to "filter by"
            const option = options[highlightedIndex];
            Transforms.insertText(editor, option.name || option.value);
          }

          setState(initialSearchState);

          break;
        case 'Escape':
          event.preventDefault();
          event.stopPropagation();

          setState(initialSearchState);
          break;
        case 'Backspace':
          // console.log(getCurrentNodeRange(editor));
          break;
        default:
          break;
      }
    },
    [searchState],
  );

  const onValueChange = ({ setHighlightedIndex, highlightedIndex }: any) => (
    value: Node[],
  ) => {
    setHighlightedIndex(0);

    // @ts-ignore
    setValue(value);
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const { node, range } = getCurrentNodeRange(editor);

      const nodeString = Node.string(node).trim();

      const filterMatch = (nodeString.startsWith('-')
        ? filterNames.filter(({ value }) => value.startsWith('-'))
        : filterNames
      ).find(({ name }) => nodeString.includes(name));

      const search = filterMatch
        ? nodeString.replace(filterMatch.name, '').trim()
        : nodeString;

      // @ts-ignore
      setState({
        targetRange: range,
        filter: {
          value: search,
          name: filterMatch?.value,
        },
      });
    }
  };

  return (
    <Downshift
      // defaultHighlightedIndex={0}
      suppressRefError
      selectedItem={''}
      isOpen={!!searchState.filter?.value}
      inputValue={searchState.filter?.value || ''}
    >
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        highlightedIndex,
        selectedItem,
        getRootProps,
        setHighlightedIndex,
      }) => {
        return (
          <Slate
            // @ts-ignore
            editor={editor}
            value={value}
            onChange={onValueChange({
              selectedItem,
              highlightedIndex,
              setHighlightedIndex,
            })}
          >
            <Box {...getRootProps()} width="100%">
              <Box width="100%">
                <Box
                  p="3px"
                  pb="5px"
                  width="100%"
                  ref={ref => {
                    inputRef.current = ref;
                  }}
                  borderBottom="2px solid black"
                  borderBottomColor="gray.100"
                >
                  <Box
                    d="flex"
                    width="100%"
                    minHeight="40px"
                    alignItems="flex-end"
                  >
                    <Box
                      d="inline-flex"
                      width="100%"
                      height="24px"
                      pb="3px"
                      id="inputContainer"
                      zIndex={100}
                      bg="white"
                    >
                      <Editable
                        renderElement={renderElement}
                        // @ts-ignore
                        onKeyDown={onKeyDown(getInputProps, {
                          selectedItem,
                          highlightedIndex,
                          setHighlightedIndex,
                        })}
                        onBlur={() => {
                          setTimeout(() => {
                            setIsFocused(false);
                          });
                        }}
                        // @ts-ignore
                        onFocus={() => {
                          setTimeout(() => {
                            // Change editor state here.
                            setIsFocused(true);
                          });
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          width: '100%',
                          height: '100%',
                          maxHeight: '50px',
                        }}
                        placeholder='Try typing "type:"'
                      />
                    </Box>
                  </Box>
                </Box>
                {(searchState.filter?.name || searchState?.filter?.value) && (
                  <Box
                    {...getMenuProps({ refKey: 'ref' })}
                    // @ts-ignore
                    width={inputRef?.current?.offsetWidth}
                    position="absolute"
                    zIndex={100}
                    backgroundColor="white"
                    boxShadow="-19px 58px 100px 0px hsla(0, 0%, 0%, 0.18)"
                    roundedBottomRight="lg"
                    roundedBottomLeft="lg"
                  >
                    {options.map((item: any, index: number) => (
                      <Box
                        d="flex"
                        alignItems="center"
                        height="35px"
                        pl="10px"
                        backgroundColor={
                          highlightedIndex === index ? 'gray.100' : 'white'
                        }
                        fontWeight={selectedItem === item ? 'bold' : 'normal'}
                        {...(index === options.length - 1
                          ? {
                              roundedBottomRight: 'lg',
                              roundedBottomLeft: 'lg',
                            }
                          : {})}
                        {...getItemProps({
                          key: item.name + item.value + index,
                          index,
                          item,
                          // @ts-ignore
                        })}
                      >
                        {item.name || item.value}
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            </Box>
          </Slate>
        );
      }}
    </Downshift>
  );
};

const withFilters = (editor: Editor) => {
  const { isInline, isVoid } = editor;

  editor.isInline = (element: any) => {
    return element.type === 'filter' ? true : isInline(element);
  };

  editor.isVoid = (element: any) => {
    return element.type === 'filter' ? true : isVoid(element);
  };

  return editor;
};

const insertFilter = (editor: Editor, filter: any) => {
  Transforms.insertNodes(editor, {
    type: 'filter',
    filter,
    children: [{ text: ' ' }],
  });
  Transforms.insertNodes(editor, { type: 'space', text: ' ' });
  Transforms.move(editor);
};

const Element = (props: RenderElementProps) => {
  const { attributes, children, element } = props;

  const sharedStyles = {
    fontSize: '16px',
    height: '20px',
    verticalAlign: 'middle',
    d: 'flex',
    alignItems: 'center',
  };

  switch (element.type) {
    case 'filter':
      return <FilterElement {...props} {...sharedStyles} />;
    case 'spacer':
      return (
        <Box width="3px" {...props} {...attributes} {...sharedStyles}>
          {children}
        </Box>
      );
    default:
      return (
        <Text {...attributes} lineHeight="18px" {...sharedStyles}>
          {children}
        </Text>
      );
  }
};

const FilterElement = ({ attributes, children, element }: any) => {
  const selected = useSelected();
  const focused = useFocused();

  return (
    <Box
      d="flex"
      alignItems="center"
      {...attributes}
      cursor="pointer"
      variant="outline"
      bg="brand.purple.light"
      color="brand.purple.main"
      padding="1px 2px"
      margin="2px"
      mb="0px"
      verticalAlign="middle"
      display="inline-block"
      rounded="lg"
      boxShadow={selected && focused ? '0 0 0 2px #B4D5FF' : 'none'}
      contentEditable={false}
    >
      <Text contentEditable={false}>
        {element.filter.name && element.filter.name !== 'search'
          ? `${element.filter.name}:`
          : ''}
        {element.filter.value}
      </Text>
      <Text contentEditable={false}>{children}</Text>
    </Box>
  );
};

export default FilterSearchInput;
