import React, { useState, useEffect } from 'react';
// import { Value } from 'slate';

// Import the Slate editor.
import styled from 'styled-components';
import { MarkdownEditor } from '../components/MarkdownEditor';

const EditorContainer = styled.div`
  margin: 20px;
  width: 800px;
  min-height: 500px;
  border-radius: 5px;
  -webkit-box-shadow: 0px 4px 13px 3px rgba(176, 176, 176, 0.93);
  -moz-box-shadow: 0px 4px 13px 3px rgba(176, 176, 176, 0.93);
  box-shadow: 0px 4px 13px 3px rgba(176, 176, 176, 0.93);
`;

const initialVal =
  localStorage.getItem('_editorVal') ||
  `
  # Welcome
  This is example content. It is persisted between reloads in localStorage.
`;

export const Note = () => {
  const [value, setValue] = useState(initialVal);

  console.log(value);

  useEffect(() => {
    localStorage.setItem('_editorVal', value);
  }, [value]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <EditorContainer>
        <MarkdownEditor />
      </EditorContainer>
    </div>
  );
};
