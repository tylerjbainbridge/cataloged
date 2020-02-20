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
import { Text, Box } from '@chakra-ui/core';

export const Portal = ({ children }: any) => {
  return ReactDOM.createPortal(children, document.body);
};

const initialValue = [
  {
    children: [{ text: 'type:', marks: [] }],
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

const CHARACTERS = ['files', 'notes', 'links'];

const initialSearchState = {
  search: '',
  targetRange: null,
  index: 0,
  trigger: '',
};

const MentionExample = () => {
  const ref = useRef();
  const [value, setValue] = useState(initialValue);

  const [searchState, setState] = useState(initialSearchState);

  const renderElement = useCallback(props => <Element {...props} />, []);
  const editor = useMemo(
    () => withMentions(withReact(withHistory(createEditor()))),
    [],
  );

  const chars = CHARACTERS.filter(c =>
    c.toLowerCase().startsWith(searchState.search.toLowerCase()),
  ).slice(0, 10);

  useEffect(() => {
    // @ts-ignore
    ReactEditor.focus(editor);
  }, []);

  console.log(searchState, chars);

  const onKeyDown = useCallback(
    event => {
      switch (event.key) {
        case 'ArrowDown':
          if (searchState.targetRange) {
            event.preventDefault();
            const prevIndex =
              searchState.index >= chars.length - 1 ? 0 : searchState.index + 1;
            setState({ ...searchState, index: prevIndex });
          }

          break;
        case 'ArrowUp':
          if (searchState.targetRange) {
            event.preventDefault();
            const nextIndex =
              searchState.index <= 0 ? chars.length - 1 : searchState.index - 1;
            setState({ ...searchState, index: nextIndex });
          }
          break;
        case 'Tab':
        case 'Enter':
          event.preventDefault();
          if (searchState.trigger) {
            // @ts-ignore
            Transforms.select(editor, searchState.targetRange);

            insertMention(editor, `type:${chars[searchState.index]}`);
          } else {
            // @ts-ignore
            Transforms.select(editor, searchState.targetRange);

            // Editor.before(editor, start);
            insertMention(editor, searchState.search);
          }
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

  // useEffect(() => {
  //   if (searchState.targetRange && searchState.trigger && chars.length > 0) {
  //     const el = ref.current;
  //     // @ts-ignore
  //     const domRange = ReactEditor.toDOMRange(editor, searchState.targetRange);
  //     const rect = domRange.getBoundingClientRect();
  //     // @ts-ignore
  //     el.style.top = `${rect.top + window.pageYOffset + 24}px`;
  //     // @ts-ignore
  //     el.style.left = `${rect.left + window.pageXOffset}px`;
  //   }
  // }, [
  //   chars.length,
  //   editor,
  //   searchState.search,
  //   searchState.targetRange,
  //   searchState.index,
  // ]);

  return (
    <Slate
      // @ts-ignore
      editor={editor}
      value={value}
      onChange={value => {
        // @ts-ignore
        setValue(value);
        const { selection } = editor;

        if (selection && Range.isCollapsed(selection)) {
          const [start] = Range.edges(selection);

          const [node, path] = Editor.node(editor, selection);

          const nodeString = Node.string(node).trim();

          const beforeRange = Editor.range(editor, path, start);
          console.log({ node, path, beforeRange });

          const targetRange = nodeString.match(/^type:/g);

          // @ts-ignore
          const range = Editor.range(editor, path[0], start);

          const search = targetRange
            ? nodeString.replace('type:', '').trim()
            : nodeString;

          // @ts-ignore
          setState({
            search,
            targetRange: beforeRange,
            trigger: targetRange ? 'type' : '',
            index: 0,
          });
        }
      }}
    >
      <Downshift
        isOpen={!!searchState.search}
        inputValue={searchState.search}
        onChange={selection =>
          alert(selection ? `You selected ${selection}` : 'Selection Cleared')
        }
      >
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedItem,
          getRootProps,
        }) => {
          return (
            <Box>
              <Box {...getRootProps()}>
                <Box
                  p="3px"
                  pb="5px"
                  height="15px"
                  borderBottom="2px solid black"
                >
                  <Editable
                    renderElement={renderElement}
                    onKeyDown={onKeyDown}
                    placeholder="Enter some text..."
                  />
                </Box>
                <Box {...getMenuProps()}>
                  {isOpen
                    ? chars.map((item, index) => (
                        <li
                          {...getItemProps({
                            key: item,
                            index,
                            item,
                            style: {
                              backgroundColor:
                                highlightedIndex === index
                                  ? 'lightgray'
                                  : 'white',
                              fontWeight:
                                selectedItem === item ? 'bold' : 'normal',
                            },
                          })}
                        >
                          {item}
                        </li>
                      ))
                    : null}
                </Box>
              </Box>
            </Box>
          );
        }}
      </Downshift>

      {false &&
        searchState.targetRange &&
        searchState.trigger &&
        chars.length > 0 && (
          <Portal>
            <div
              // @ts-ignore
              ref={ref}
              style={{
                top: '-9999px',
                left: '-9999px',
                position: 'absolute',
                zIndex: 1,
                padding: '3px',
                background: 'white',
                borderRadius: '4px',
                boxShadow: '0 1px 5px rgba(0,0,0,.2)',
              }}
            >
              {chars.map((char, i) => (
                <div
                  key={char}
                  style={{
                    padding: '1px 3px',
                    borderRadius: '3px',
                    background:
                      i === searchState.index ? '#B4D5FF' : 'transparent',
                  }}
                >
                  {char}
                </div>
              ))}
            </div>
          </Portal>
        )}
    </Slate>
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

const insertMention = (editor: Editor, character: any) => {
  const mention = { type: 'mention', character, children: [{ text: ' ' }] };
  Transforms.insertNodes(editor, mention);
  Transforms.move(editor);
  Transforms.insertText(editor, ' ');
};

const Element = (props: RenderElementProps) => {
  const { attributes, children, element } = props;

  const sharedStyles = {
    fontSize: '16px',
    verticalAlign: 'middle',
  };

  switch (element.type) {
    case 'mention':
      return <MentionElement {...props} {...sharedStyles} />;
    default:
      return (
        <Text {...attributes} {...sharedStyles}>
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
      {...attributes}
      contentEditable={false}
      padding="4px"
      marginRight="2px"
      verticalAlign="baseline"
      display="inline-block"
      borderRadius="4px"
      backgroundColor="#eee"
      boxShadow={selected && focused ? '0 0 0 2px #B4D5FF' : 'none'}
    >
      <Text>{element.character}</Text>
      {children}
    </Box>
  );
};

export default MentionExample;
