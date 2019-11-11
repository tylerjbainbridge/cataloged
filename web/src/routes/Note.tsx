import React, { useState, useEffect } from 'react';
// import { Value } from 'slate';

// Import the Slate editor.
// @ts-ignore
import Editor from 'rich-markdown-editor';
import styled from 'styled-components';

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
        <Editor
          id="example"
          style={{
            padding: 20,
            width: '100%',
            height: '100%',
            border: '1px solid black',
          }}
          defaultValue={''}
          onChange={(val: any) => setValue(val)}
        />
      </EditorContainer>
    </div>
  );
};

const EditorContainer = styled.div`
  margin: 20px;
  width: 800px;
  min-height: 500px;
  border-radius: 5px;
  -webkit-box-shadow: 0px 4px 13px 3px rgba(176, 176, 176, 0.93);
  -moz-box-shadow: 0px 4px 13px 3px rgba(176, 176, 176, 0.93);
  box-shadow: 0px 4px 13px 3px rgba(176, 176, 176, 0.93);
`;
