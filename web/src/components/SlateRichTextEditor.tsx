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

import { Editor, Transforms, Range, Point, createEditor } from 'slate';

import { withHistory } from 'slate-history';

import { Toolbar } from './SlateComponents';

import { Button, Box, Heading, Text, List } from '@chakra-ui/core';
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
  '###': 'heading-three',
  '####': 'heading-four',
  '#####': 'heading-five',
  '######': 'heading-six',
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
    () => withShortcuts(withReact(withHistory(createEditor()))),
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
  const textProps = { fontSize: '18px ' };

  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote {...textProps} {...attributes}>
          {children}
        </blockquote>
      );
    case 'bulleted-list':
      return (
        <ul {...textProps} {...attributes}>
          {children}
        </ul>
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
    case 'list-item':
      return (
        <li {...textProps} {...attributes}>
          {children}
        </li>
      );
    case 'numbered-list':
      return (
        <ol {...textProps} {...attributes}>
          {children}
        </ol>
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
