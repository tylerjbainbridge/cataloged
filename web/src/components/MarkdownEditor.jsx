import Prism from 'prismjs';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Slate, Editable, ReactEditor, withReact } from 'slate-react';
import { Text, createEditor } from 'slate';
import { withHistory } from 'slate-history';
import styled, { css } from 'styled-components';
import { Box } from '@chakra-ui/core';

// eslint-disable-next-line
Prism.languages.markdown=Prism.languages.extend("markup",{}),Prism.languages.insertBefore("markdown","prolog",{blockquote:{pattern:/^>(?:[\t ]*>)*/m,alias:"punctuation"},code:[{pattern:/^(?: {4}|\t).+/m,alias:"keyword"},{pattern:/``.+?``|`[^`\n]+`/,alias:"keyword"}],title:[{pattern:/\w+.*(?:\r?\n|\r)(?:==+|--+)/,alias:"important",inside:{punctuation:/==+$|--+$/}},{pattern:/(^\s*)#+.+/m,lookbehind:!0,alias:"important",inside:{punctuation:/^#+|#+$/}}],hr:{pattern:/(^\s*)([*-])([\t ]*\2){2,}(?=\s*$)/m,lookbehind:!0,alias:"punctuation"},list:{pattern:/(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,lookbehind:!0,alias:"punctuation"},"url-reference":{pattern:/!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,inside:{variable:{pattern:/^(!?\[)[^\]]+/,lookbehind:!0},string:/(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,punctuation:/^[\[\]!:]|[<>]/},alias:"url"},bold:{pattern:/(^|[^\\])(\*\*|__)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,lookbehind:!0,inside:{punctuation:/^\*\*|^__|\*\*$|__$/}},italic:{pattern:/(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,lookbehind:!0,inside:{punctuation:/^[*_]|[*_]$/}},url:{pattern:/!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/,inside:{variable:{pattern:/(!?\[)[^\]]+(?=\]$)/,lookbehind:!0},string:{pattern:/"(?:\\.|[^"\\])*"(?=\)$)/}}}}),Prism.languages.markdown.bold.inside.url=Prism.util.clone(Prism.languages.markdown.url),Prism.languages.markdown.italic.inside.url=Prism.util.clone(Prism.languages.markdown.url),Prism.languages.markdown.bold.inside.italic=Prism.util.clone(Prism.languages.markdown.italic),Prism.languages.markdown.italic.inside.bold=Prism.util.clone(Prism.languages.markdown.bold); // prettier-ignore

const DEFAULT_VALUE = [
  {
    children: [
      {
        text:
          'Slate is flexible enough to add **decorations** that can format text based on its content. For example, this editor has **Markdown** preview decorations on it, to make it _dead_ simple to make an editor with built-in Markdown previewing.',
      },
    ],
  },
  {
    children: [{ text: '## Try it out!' }],
  },
  {
    children: [{ text: 'Try it out for yourself!' }],
  },
];

const MarkdownNode = styled.span`
  font-size: 16px;
  font-weight: ${props => props.leaf.bold && 'bold'};
  font-style: ${props => props.leaf.italic && 'italic'};
  text-decoration: ${props => props.leaf.underlined && 'underline'};
  ${props =>
    props.leaf.title &&
    css`
      display: inline-block;
      font-weight: bold;
      font-size: 20px;
      margin: 20px 0 10px 0;
    `}
  ${props =>
    props.leaf.list &&
    css`
      padding-left: 10px;
      font-size: 20px;
      line-height: 10px;
    `}
  ${props =>
    props.leaf.hr &&
    css`
      display: block;
      text-align: center;
      border-bottom: 2px solid #ddd;
    `}
  ${props =>
    props.leaf.blockquote &&
    css`
      display: inline-block;
      border-left: 2px solid #ddd;
      padding-left: 10px;
      color: #aaa;
      font-style: italic;
    `}
  ${props =>
    props.leaf.code &&
    css`
      font-family: monospace;
      background-color: #eee;
      padding: 3px;
    `}
`;

const Leaf = ({ attributes, children, leaf }) => {
  return (
    <MarkdownNode {...attributes} leaf={leaf}>
      {children}
    </MarkdownNode>
  );
};

export const MarkdownEditor = React.memo(
  ({ value = DEFAULT_VALUE, onChange }) => {
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);

    const editorRef = React.useRef(null);

    const renderLeaf = useCallback(props => <Leaf {...props} />, []);

    const decorate = useCallback(([node, path]) => {
      const ranges = [];

      if (!Text.isText(node)) {
        return ranges;
      }

      const getLength = token => {
        if (typeof token === 'string') {
          return token.length;
        } else if (typeof token.content === 'string') {
          return token.content.length;
        } else {
          return token.content.reduce((l, t) => l + getLength(t), 0);
        }
      };

      const tokens = Prism.tokenize(node.text, Prism.languages.markdown);
      let start = 0;

      for (const token of tokens) {
        const length = getLength(token);
        const end = start + length;

        if (typeof token !== 'string') {
          ranges.push({
            [token.type]: true,
            anchor: { path, offset: start },
            focus: { path, offset: end },
          });
        }

        start = end;
      }

      return ranges;
    }, []);

    useEffect(() => {
      ReactEditor.focus(editor);
    }, []);

    return (
      <Box>
        <Slate autoFocus editor={editor} value={value} onChange={onChange}>
          <Editable
            decorate={decorate}
            renderLeaf={renderLeaf}
            placeholder="Write a note..."
          />
        </Slate>
      </Box>
    );
  },
);
