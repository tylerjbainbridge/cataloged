import React, {
  useMemo,
  useCallback,
  useRef,
  useEffect,
  useState,
} from 'react';
import ReactDOM from 'react-dom';
import { Editor, Transforms, Range, createEditor, Node } from 'slate';
import { withHistory } from 'slate-history';
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
import { FILTER_CONFIGS } from './Filter';
import { useAuth } from '../hooks/useAuth';

export const Portal = ({ children }: any) => {
  return ReactDOM.createPortal(children, document.body);
};

const initialValue = [
  {
    children: [{ text: '', marks: [] }],
  },
] || [
  {
    children: [
      {
        type: 'mention',
        character: 'R2-D2',
        children: [{ text: '' }],
      },
      { text: '    ' },
    ],
  },
];

const initialSearchState = {
  search: '',
  targetRange: null,
  index: 0,
  filterBy: '',
};

const filterNames = [
  { value: 'type', name: 'type:' },
  { value: 'label', name: 'label:' },
  { value: 'is', name: 'is:' },
];

const MentionExample = () => {
  const ref = useRef();
  const [value, setValue] = useState(initialValue);

  const [searchState, setState] = useState(initialSearchState);

  const renderElement = useCallback(props => <Element {...props} />, []);
  const editor = useMemo(
    () => withMentions(withReact(withHistory(createEditor()))),
    [],
  );

  const { user } = useAuth();

  const inputRef = useRef(null);

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
      options: [{ name: 'favorited', value: true }],
    },
  };

  let options = searchState.filterBy
    ? // @ts-ignore
      filterValues[searchState.filterBy]?.options || []
    : filterNames;

  console.log('searchState.filterBy', searchState.filterBy, options);

  options = options
    .filter(({ name, value }: any) =>
      (name || value).toLowerCase().includes(searchState.search.toLowerCase()),
    )
    .slice(0, 10);

  useEffect(() => {
    // @ts-ignore
    ReactEditor.focus(editor);
  }, []);

  const getCurrentNodeRange = (editor: Editor) => {
    // @ts-ignore
    const [start] = Range.edges(editor.selection);
    // @ts-ignore
    const [node, path] = Editor.node(editor, editor.selection);

    const range = Editor.range(editor, path, start);

    return { node, range, start, path };
  };

  const onKeyDown = useCallback(
    (
      getInputProps,
      { selectedItem, setHighlightedIndex, highlightedIndex }: any,
    ) => (event: any) => {
      const { onKeyDown } = getInputProps();
      const { search, filterBy, targetRange } = searchState;
      console.log({ highlightedIndex });

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
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

          setHighlightedIndex(
            highlightedIndex <= 0 ? null : highlightedIndex - 1,
          );
          break;
        case 'Tab':
        case 'Enter':
          event.preventDefault();

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
            insertMention(editor, { search });
          } else if (filterBy && options[highlightedIndex]) {
            const option = options[highlightedIndex];
            insertMention(editor, {
              search: option.name || option.value,
              filterBy,
            });
          } else if (options[highlightedIndex]) {
            const option = options[highlightedIndex];
            Transforms.insertText(editor, option.name || option.value);
          }

          console.log({ highlightedIndex });

          setState(initialSearchState);
          break;
        case 'Escape':
          event.preventDefault();
          setState(initialSearchState);
          break;
        default:
          break;
      }
    },
    [searchState.search, searchState.targetRange, searchState.index],
  );

  const onChange = (value: Node[]) => {
    // @ts-ignore
    setValue(value);
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const { node, range } = getCurrentNodeRange(editor);

      const nodeString = Node.string(node).trim();

      const filterBy = filterNames.find(({ value }) =>
        nodeString.includes(`${value}:`),
      );

      console.log({ filterBy, nodeString });

      const search = filterBy
        ? nodeString.replace(filterBy.name, '').trim()
        : nodeString;

      // @ts-ignore
      setState({
        search,
        filterBy: filterBy?.value,
        targetRange: range,
        index: 0,
      });
    }
  };

  return (
    <Downshift
      // defaultHighlightedIndex={0}
      selectedItem={''}
      isOpen={!!searchState.search}
      inputValue={searchState.search}
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
            onChange={onChange}
          >
            <Box {...getRootProps({ refKey: 'ref' })}>
              <Box>
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
                  <Box d="flex" minHeight="40px" alignItems="flex-end">
                    <Box width="100%" pb="3px">
                      <Editable
                        renderElement={renderElement}
                        // @ts-ignore
                        onKeyDown={onKeyDown(getInputProps, {
                          selectedItem,
                          highlightedIndex,
                          setHighlightedIndex,
                        })}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                        }}
                        placeholder="Enter some text..."
                      />
                    </Box>
                  </Box>
                </Box>
                {(searchState.filterBy || searchState.search) && (
                  <Box
                    {...getMenuProps()}
                    // @ts-ignore
                    width={inputRef?.current?.offsetWidth}
                    position="absolute"
                    zIndex={100}
                    backgroundColor="white"
                    rounded="lg"
                  >
                    {options.map((item: any, index: number) => (
                      <Box
                        d="flex"
                        alignItems="center"
                        height="35px"
                        pl="10px"
                        {...getItemProps({
                          key: item.name + item.value + index,
                          index,
                          item,
                          // @ts-ignore
                          backgroundColor:
                            highlightedIndex === index ? 'gray.100' : 'white',
                          fontWeight: selectedItem === item ? 'bold' : 'normal',
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

const withMentions = (editor: Editor) => {
  const { isInline, isVoid } = editor;

  editor.isInline = (element: any) => {
    return element.type === 'mention' ? true : isInline(element);
  };

  editor.isVoid = (element: any) => {
    return element.type === 'mention' ? true : isVoid(element);
  };

  return editor;
};

const insertMention = (editor: Editor, filter: any) => {
  const mention = { type: 'mention', filter, children: [{ text: '' }] };
  Transforms.insertNodes(editor, mention);
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
    case 'mention':
      return <MentionElement {...props} {...sharedStyles} />;
    default:
      return (
        <Text {...attributes} lineHeight="18px" {...sharedStyles}>
          {children}
        </Text>
      );
  }
};

const MentionElement = ({ attributes, children, element }: any) => {
  const selected = useSelected();
  const focused = useFocused();
  return (
    <Box
      d="flex"
      alignItems="center"
      {...attributes}
      contentEditable={false}
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
    >
      <Text>
        {element.filter.filterBy ? `${element.filter.filterBy}:` : ''}
        {element.filter.search}
      </Text>
      <Text>{children}</Text>
    </Box>
  );
};

export default MentionExample;
