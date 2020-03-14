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

import { jsx } from 'slate-hyperscript';

import { Editor, Transforms, Range, Point, createEditor } from 'slate';

import { withHistory } from 'slate-history';

import { Toolbar } from './SlateComponents';

import {
  Button,
  Box,
  Heading,
  Text,
  List,
  Link,
  ListItem,
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
} from 'react-icons/fa';

const DEFAULT_VALUE: any = [
  {
    children: [{ text: '', marks: [] }],
  },
];

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
  '#': 'heading-one',
  '##': 'heading-two',
};

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

const SlateReadOnly = ({ value }: any) => {
  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);
  // const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const editor: any = useMemo(
    () => withShortcuts(withReact(withHistory(createEditor()))),
    [],
  );

  return (
    <Slate editor={editor} value={value} onChange={() => {}}>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        readOnly
      />
    </Slate>
  );
};

const SlateRichTextEditor = ({
  value = DEFAULT_VALUE,
  placeholder = 'Start typing...',
  editorRef,
  children,
  onChange,
}: any) => {
  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);
  // const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const editor: any = useMemo(
    () => withHtml(withShortcuts(withReact(withHistory(createEditor())))),
    [],
  );

  if (editorRef) editorRef(editor);

  // useEffect(() => {
  //   ReactEditor.focus(editor);
  // }, []);

  const editable = (
    <Editable
      renderElement={renderElement}
      renderLeaf={renderLeaf}
      placeholder={placeholder}
      spellCheck
      autoFocus
      onKeyDown={event => {
        for (const hotkey in HOTKEYS) {
          // @ts-ignore
          if (isHotkey(hotkey, event)) {
            event.preventDefault();
            // @ts-ignore
            const mark = HOTKEYS[hotkey];
            toggleMark(editor, mark);
          }
        }
      }}
    />
  );

  const toolbar = (
    <Toolbar>
      <MarkButton format="bold" icon={<FaBold />} />
      <MarkButton format="italic" icon={<FaItalic />} />
      <MarkButton format="underline" icon={<FaUnderline />} />
      <MarkButton format="code" icon={<FaCode />} />
      <BlockButton
        format="heading-one"
        icon={
          <Box d="flex" alignItems="center">
            <FaHeading display="inline" /> 1
          </Box>
        }
      />
      <BlockButton
        format="heading-two"
        icon={
          <Box d="flex" alignItems="center">
            <FaHeading display="inline" /> 2
          </Box>
        }
      />
      <BlockButton format="block-quote" icon={<FaQuoteRight />} />
      <BlockButton format="numbered-list" icon={<FaListOl />} />
      <BlockButton format="bulleted-list" icon={<FaList />} />
    </Toolbar>
  );

  return (
    <Slate editor={editor} value={value} onChange={onChange}>
      <Box height="100%" width="100%">
        {children({
          editor,
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

const ELEMENT_TAGS = {
  A: (el: any) => ({ type: 'link', url: el.getAttribute('href') }),
  BLOCKQUOTE: () => ({ type: 'quote' }),
  H1: () => ({ type: 'heading-one' }),
  H2: () => ({ type: 'heading-two' }),
  H3: () => ({ type: 'heading-three' }),
  H4: () => ({ type: 'heading-four' }),
  H5: () => ({ type: 'heading-five' }),
  H6: () => ({ type: 'heading-six' }),
  IMG: (el: any) => ({ type: 'image', url: el.getAttribute('src') }),
  LI: () => ({ type: 'list-item' }),
  OL: () => ({ type: 'numbered-list' }),
  P: () => ({ type: 'paragraph' }),
  PRE: () => ({ type: 'code' }),
  UL: () => ({ type: 'bulleted-list' }),
};

// COMPAT: `B` is omitted here because Google Docs uses `<b>` in weird ways.
const TEXT_TAGS = {
  CODE: () => ({ code: true }),
  DEL: () => ({ strikethrough: true }),
  EM: () => ({ italic: true }),
  I: () => ({ italic: true }),
  S: () => ({ strikethrough: true }),
  STRONG: () => ({ bold: true }),
  U: () => ({ underline: true }),
};

//@ts-ignore
export const deserialize = (el: any) => {
  if (el.nodeType === 3) {
    return el.textContent;
  } else if (el.nodeType !== 1) {
    return null;
  } else if (el.nodeName === 'BR') {
    return '\n';
  }

  console.log({ el });

  const { nodeName } = el;
  let parent = el;

  if (
    nodeName === 'PRE' &&
    el.childNodes[0] &&
    el.childNodes[0].nodeName === 'CODE'
  ) {
    parent = el.childNodes[0];
  }

  // @ts-ignore
  const children = Array.from(parent.childNodes)
    .map(deserialize)
    .flat();

  if (el.nodeName === 'BODY') {
    return jsx('fragment', {}, children);
  }

  // @ts-ignore
  if (ELEMENT_TAGS[nodeName]) {
    // @ts-ignore
    const attrs = ELEMENT_TAGS[nodeName](el);
    return jsx('element', attrs, children);
  }

  // @ts-ignore
  if (TEXT_TAGS[nodeName]) {
    // @ts-ignore
    const attrs = TEXT_TAGS[nodeName](el);
    return children.map((child: any) => jsx('text', attrs, child));
  }

  return children;
};

const withHtml = (editor: Editor): Editor => {
  const { insertData, isInline, isVoid } = editor;

  editor.isInline = element => {
    return element.type === 'link' ? true : isInline(element);
  };

  editor.isVoid = element => {
    return element.type === 'image' ? true : isVoid(element);
  };

  editor.insertData = (data: any) => {
    const html = data.getData('text/html');
    const plain = data.getData('text/plain');

    console.log({ data, plain, html });

    if (html || plain) {
      const parsed = new DOMParser().parseFromString(
        html || plain,
        'text/html',
      );
      const fragment = deserialize(parsed.body);
      Transforms.insertFragment(editor, fragment);
      return;
    }

    insertData(data);
  };

  return editor;
};

const withShortcuts = (editor: Editor): Editor => {
  const { deleteBackward, insertText } = editor;

  editor.insertText = text => {
    const { selection } = editor;

    if (text === ' ' && selection && Range.isCollapsed(selection)) {
      const { anchor } = selection;
      const block = Editor.above(editor, {
        match: n => Editor.isBlock(editor, n),
      });
      const path = block ? block[1] : [];
      const start = Editor.start(editor, path);
      const range = { anchor, focus: start };
      const beforeText = Editor.string(editor, range);

      // @ts-ignore
      const type = SHORTCUTS[beforeText];

      if (type) {
        Transforms.select(editor, range);
        Transforms.delete(editor);
        Transforms.setNodes(
          editor,
          { type },
          { match: n => Editor.isBlock(editor, n) },
        );

        if (type === 'list-item') {
          const list = { type: 'bulleted-list', children: [] };
          Transforms.wrapNodes(editor, list, {
            match: n => n.type === 'list-item',
          });
        }

        return;
      }
    }

    insertText(text);
  };

  editor.deleteBackward = (...args) => {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const match = Editor.above(editor, {
        match: n => Editor.isBlock(editor, n),
      });

      if (match) {
        const [block, path] = match;
        const start = Editor.start(editor, path);

        if (
          block.type !== 'paragraph' &&
          Point.equals(selection.anchor, start)
        ) {
          Transforms.setNodes(editor, { type: 'paragraph' });

          if (block.type === 'list-item') {
            Transforms.unwrapNodes(editor, {
              match: n => n.type === 'bulleted-list',
            });
          }

          return;
        }
      }

      deleteBackward(...args);
    }
  };

  return editor;
};

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

const Element = ({ attributes, children, element }: RenderElementProps) => {
  const textProps = { fontSize: '20px ' };

  console.log(element.type);

  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote {...textProps} {...attributes}>
          {children}
        </blockquote>
      );

    case 'heading-one':
      return (
        <Heading as="h1" size="xl" {...attributes}>
          {children}
        </Heading>
      );
    case 'heading-two':
      return (
        <Heading as="h2" size="lg" {...attributes}>
          {children}
        </Heading>
      );

    case 'bulleted-list':
      return (
        <List styleType="disc" {...textProps} {...attributes}>
          {children}
        </List>
      );
    case 'numbered-list':
      return (
        <List as="ol" styleType="decimal" {...textProps} {...attributes}>
          {children}
        </List>
      );

    case 'list-item':
      return (
        <ListItem mb="5px" {...textProps} {...attributes}>
          {children}
        </ListItem>
      );

    // case 'link':
    //   return (
    //     <Link href={element.url} color="teal.500" isExternal {...attributes}>
    //       {children}
    //     </Link>
    //   );

    default:
      return (
        <Text {...textProps} {...attributes}>
          {children}
        </Text>
      );
  }
};

const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
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
