import React, { useCallback, useMemo, useState, useEffect } from 'react';
import isHotkey from 'is-hotkey';
import {
  Editable,
  withReact,
  useSlate,
  Slate,
  RenderLeafProps,
  RenderElementProps,
  ReactEditor,
} from 'slate-react';

import {
  ACTION_ITEM,
  ActionItemPlugin,
  BLOCKQUOTE,
  BlockquotePlugin,
  BoldPlugin,
  decorateSearchHighlight,
  EditablePlugins,
  HeadingPlugin,
  HeadingToolbar,
  HeadingType,
  HoveringToolbar,
  ImagePlugin,
  InlineCodePlugin,
  ItalicPlugin,
  LinkPlugin,
  ListPlugin,
  ListType,
  MARK_BOLD,
  MARK_CODE,
  PARAGRAPH,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_UNDERLINE,
  MentionPlugin,
  ParagraphPlugin,
  SearchHighlightPlugin,
  TablePlugin,
  ToolbarBlock,
  ToolbarImage,
  ToolbarLink,
  ToolbarList,
  ToolbarMark,
  UnderlinePlugin,
  VideoPlugin,
  withBlock,
  withBreakEmptyReset,
  withDeleteStartReset,
  withImage,
  withLink,
  withList,
  withPasteHtml,
  withShortcuts,
  withPasteMd,
  withTable,
  withVideo,
  LINK,
} from 'slate-plugins-next';

import { Editor, Transforms, Range, Point, createEditor } from 'slate';

import { withHistory } from 'slate-history';

import { Toolbar } from './SlateComponents';

import {
  Button,
  Box,
  Heading,
  Text,
  List,
  ListItem,
  Code,
  Link,
} from '@chakra-ui/core';
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaCode,
  FaHeading,
  FaQuoteRight,
  FaListOl,
  FaList,
  FaStrikethrough,
  FaLink,
  FaImage,
} from 'react-icons/fa';

const DEFAULT_VALUE: any = [];

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};

const SHORTCUTS = {
  '*': 'list-item',
  '-': 'list-item',
  '+': 'list-item',
  '>': 'block-quote',
  '#': HeadingType.H2,
  '##': HeadingType.H2,
};

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

const resetOptions = {
  types: [ACTION_ITEM, BLOCKQUOTE],
};

// const SlateReadOnly = ({ value }: any) => {
//   const renderElement = useCallback((props: any) => <Element {...props} />, []);
//   const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);
//   // const editor = useMemo(() => withHistory(withReact(createEditor())), []);

//   const plugins = [
//     ParagraphPlugin(),
//     HeadingPlugin(),
//     BlockquotePlugin(),
//     ListPlugin(),
//     CodePlugin(),
//   ];

//   const editor: any = useMemo(
//     () =>
//       withList(
//         withBreakEmptyReset({} as any)(
//           withDeleteStartReset({} as any)(
//             withBlock(withHistory(withReact(createEditor()))),
//           ),
//         ),
//       ),
//     [],
//   );

//   return (
//     <Slate editor={editor} value={value} onChange={() => {}}>
//       <EditablePlugins
//         plugins={plugins}
//         renderElement={renderElement}
//         renderLeaf={renderLeaf}
//         readOnly
//       />
//     </Slate>
//   );
// };
const usePluginEditor = ({ placeholder }: any) => {
  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);

  const plugins: any[] = [
    BlockquotePlugin(),
    BoldPlugin(),
    ActionItemPlugin(),
    HeadingPlugin(),
    ImagePlugin(),
    InlineCodePlugin(),
    ItalicPlugin(),
    LinkPlugin(),
    ListPlugin(),
    ParagraphPlugin(),
    TablePlugin(),
    UnderlinePlugin(),
    VideoPlugin(),
  ];

  const onKeyDown: any = [];

  // const [value, setValue] = useState(DEFAULT_VALUE);

  const editor = useMemo(
    () =>
      withBreakEmptyReset(resetOptions)(
        withDeleteStartReset(resetOptions)(
          withPasteMd(
            withShortcuts(
              withList(
                withBlock(
                  withPasteHtml(plugins)(
                    withLink(withTable(withHistory(withReact(createEditor())))),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    [],
  );

  const toolbar = (
    <Toolbar>
      <ToolbarBlock
        format={HeadingType.H1}
        icon={
          <Box d="flex" alignItems="center">
            <FaHeading display="inline" /> 1
          </Box>
        }
      />
      <ToolbarBlock
        format={HeadingType.H2}
        icon={
          <Box d="flex" alignItems="center">
            <FaHeading display="inline" /> 2
          </Box>
        }
      />
      <ToolbarMark format={MARK_BOLD} icon={<FaBold />} />
      <ToolbarMark format={MARK_ITALIC} icon={<FaItalic />} />
      <ToolbarMark format={MARK_UNDERLINE} icon={<FaUnderline />} />
      <ToolbarMark format={MARK_STRIKETHROUGH} icon={<FaStrikethrough />} />
      <ToolbarMark format={MARK_CODE} icon={<FaCode />} />
      <ToolbarList format={ListType.UL_LIST} icon={<FaList />} />
      <ToolbarList format={ListType.OL_LIST} icon={<FaListOl />} />
      {/* <ToolbarLink icon={<FaLink />} /> */}
      {/* <ToolbarImage icon={<FaImage />} /> */}
      <ToolbarBlock format={BLOCKQUOTE} icon={<FaQuoteRight />} />
    </Toolbar>
  );

  const editable = (
    <>
      <HoveringToolbar>
        <ToolbarMark reversed format={MARK_BOLD} icon={<FaBold />} />
        <ToolbarMark reversed format={MARK_ITALIC} icon={<FaItalic />} />
        <ToolbarMark reversed format={MARK_UNDERLINE} icon={<FaUnderline />} />
      </HoveringToolbar>

      <EditablePlugins
        plugins={plugins}
        onKeyDown={onKeyDown}
        // @ts-ignore
        // renderElement={[renderElement]}
        // @ts-ignore
        // renderLeaf={[renderLeaf]}
        placeholder={placeholder}
      />
    </>
  );

  return {
    editable,
    editor,
    toolbar,
  };
};

export const SlateRichTextEditor = ({
  value = DEFAULT_VALUE,
  placeholder = 'Start typing...',
  editorRef,
  children,
  onChange,
}: any) => {
  // const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  // useEffect(() => {
  //   ReactEditor.focus(editor);
  // }, []);

  const { editable, editor, toolbar } = usePluginEditor({
    placeholder,
  });

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={newValue => {
        onChange(newValue);
      }}
    >
      <Box height="100%" width="100%">
        {children({
          editor,
          // @ts-ignore
          editable,
          toolbar,
          containerProps: {
            cursor: 'text',
            onClick: () => {
              ReactEditor.focus(editor);
            },
          },
        })}
      </Box>
    </Slate>
  );
};

// const withShortcuts = (editor: Editor): Editor => {
//   const { deleteBackward, insertText } = editor;

//   editor.insertText = text => {
//     const { selection } = editor;

//     if (text === ' ' && selection && Range.isCollapsed(selection)) {
//       const { anchor } = selection;
//       const block = Editor.above(editor, {
//         match: n => Editor.isBlock(editor, n),
//       });
//       const path = block ? block[1] : [];
//       const start = Editor.start(editor, path);
//       const range = { anchor, focus: start };
//       const beforeText = Editor.string(editor, range);

//       // @ts-ignore
//       const type = SHORTCUTS[beforeText];

//       if (type) {
//         Transforms.select(editor, range);
//         Transforms.delete(editor);
//         Transforms.setNodes(
//           editor,
//           { type },
//           { match: n => Editor.isBlock(editor, n) },
//         );

//         if (type === 'list-item') {
//           const list = { type: 'bulleted-list', children: [] };
//           Transforms.wrapNodes(editor, list, {
//             match: n => n.type === 'list-item',
//           });
//         }

//         return;
//       }
//     }

//     insertText(text);
//   };

//   editor.deleteBackward = (...args) => {
//     const { selection } = editor;

//     if (selection && Range.isCollapsed(selection)) {
//       const match = Editor.above(editor, {
//         match: n => Editor.isBlock(editor, n),
//       });

//       if (match) {
//         const [block, path] = match;
//         const start = Editor.start(editor, path);

//         if (
//           block.type !== 'paragraph' &&
//           Point.equals(selection.anchor, start)
//         ) {
//           Transforms.setNodes(editor, { type: 'paragraph' });

//           if (block.type === 'list-item') {
//             Transforms.unwrapNodes(editor, {
//               match: n => n.type === 'bulleted-list',
//             });
//           }

//           return;
//         }
//       }

//       deleteBackward(...args);
//     }
//   };

//   return editor;
// };

const toggleBlock = (editor: Editor, format: any) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: n => LIST_TYPES.includes(n.type),
    split: true,
  });

  Transforms.setNodes(editor, {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  });

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor: Editor, format: any) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor: Editor, format: any) => {
  const [match] = Editor.nodes(editor, {
    match: n => n.type === format,
  });

  return !!match;
};

const isMarkActive = (editor: Editor, format: any) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const textProps = { fontSize: '20px ' };

const Element = ({ attributes, children, element }: RenderElementProps) => {
  // MARK_BOLD;
  // MARK_ITALIC;
  // MARK_UNDERLINE;
  // MARK_STRIKETHROUGH;
  // MARK_CODE;
  // UL_LIST;
  // OL_LIST;
  // BLOCKQUOTE;

  switch (element.type) {
    case BLOCKQUOTE:
      return (
        <Text as="blockquote" {...textProps} {...attributes}>
          {children}
        </Text>
      );
    case ListType.UL_LIST:
      return (
        <List spacing="7px" styleType="disc" {...textProps} {...attributes}>
          {children}
        </List>
      );
    case HeadingType.H1:
      return (
        <Heading as="h1" size="xl" {...attributes}>
          {children}
        </Heading>
      );
    case HeadingType.H2:
      return (
        <Heading as="h2" size="lg" {...attributes}>
          {children}
        </Heading>
      );
    case ListType.LIST_ITEM:
      return (
        <ListItem {...textProps} {...textProps} {...attributes}>
          {children}
        </ListItem>
      );
    case ListType.OL_LIST:
      return (
        <List
          spacing="7px"
          as="ol"
          styleType="decimal"
          {...textProps}
          {...attributes}
        >
          {children}
        </List>
      );
    case LINK:
      return (
        <Link href={element.url} color="teal.500" isExternal {...attributes}>
          {children}
        </Link>
      );

    default:
      return (
        <Text {...textProps} {...attributes}>
          {children}
        </Text>
      );
  }
};

const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  if (leaf[MARK_BOLD]) {
    return (
      <Box as="span" {...textProps} {...attributes} fontWeight="bold">
        {children}
      </Box>
    );
  }

  if (leaf[MARK_CODE]) {
    return (
      <Box {...textProps} {...attributes} as={Code}>
        {children}
      </Box>
    );
  }

  if (leaf[MARK_ITALIC]) {
    return (
      <Box {...textProps} {...attributes} as="em">
        {children}
      </Box>
    );
  }

  if (leaf.underline) {
    return (
      <Box {...textProps} {...attributes} as="u">
        {children}
      </Box>
    );
  }

  return (
    <Box as="span" {...textProps} {...attributes}>
      {children}
    </Box>
  );
};

const BlockButton = ({ format, icon }: any) => {
  const editor = useSlate();

  const isActive = isBlockActive(editor, format);

  const styleProps: { color?: string; bg?: string } = {
    color: isActive ? 'black' : '#ccc',
  };

  return (
    <Button
      {...styleProps}
      variant="ghost"
      onMouseDown={event => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      {icon}
    </Button>
  );
};

const MarkButton = ({ format, icon }: any) => {
  const editor = useSlate();

  const isActive = isMarkActive(editor, format);

  const styleProps: { color?: string; bg?: string } = {
    color: isActive ? 'black' : '#ccc',
  };

  return (
    <Button
      // @ts-ignore
      {...styleProps}
      variant="ghost"
      onMouseDown={event => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      {icon}
    </Button>
  );
};

export default SlateRichTextEditor;
