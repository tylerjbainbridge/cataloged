import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Node } from 'slate';
import { useMutation } from '@apollo/react-hooks';
import _ from 'lodash';
import removeMarkdown from 'remove-markdown';

import { MarkdownEditor } from './MarkdownEditor';

import { useForm } from 'react-hook-form';
import { useOptimisticDeleteItem } from '../hooks/useOptimisticDeleteItem';

import { UPDATE_NOTE_MUTATION } from '../graphql/note';
import { useDebounce } from '../hooks/useDebounce';
import SlateRichTextEditor from './SlateRichTextEditor';
import { Input } from '@chakra-ui/core';
import { ReactEditor } from 'slate-react';

export const serializeToPlainText = (nodes: any[]) => {
  return nodes.map(n => Node.string(n)).join('\n');
};

export const EMPTY_NOTE_VALUE = [
  {
    children: [{ text: '', marks: [] }],
  },
];

export const EMPTY_NOTE = {
  raw: EMPTY_NOTE_VALUE,
  text: serializeToPlainText(EMPTY_NOTE_VALUE),
};

export interface UpdateNoteFormValues {
  value: any[];
  title: string;
}

export const NoteEditor = ({
  note,
  updateNote,
  editorContainerProps,
  editorInnerContainerProps,
  children,
}: any) => {
  const { getValues, watch, setValue, register } = useForm<
    UpdateNoteFormValues
  >({
    defaultValues: {
      value: JSON.parse(note.raw),
      title: note.title,
    },
  });

  const values = getValues();

  const valuesRef = useRef(values);
  const titleInputRef = useRef(null);
  const editorRef = useRef(null);

  const debouncedUpdateNote = useDebounce(
    (variables: any) => updateNote({ variables }),
    250,
  );

  const [deleteItem] = useOptimisticDeleteItem(note.item);

  watch();

  useEffect(() => {
    if (!note.title) {
      // @ts-ignore
      titleInputRef?.current?.focus();
    } else {
      // @ts-ignore
      ReactEditor.focus(editorRef.current);
    }
  }, []);

  // Listen for form changes.
  useEffect(() => {
    register({ name: 'value' });
    register({ name: 'title' });
  }, [register]);

  useEffect(() => {
    if (!_.isEqual(valuesRef.current, values)) {
      //@ts-ignore
      debouncedUpdateNote({
        noteId: note.id,
        title: values.title,
        raw: JSON.stringify(values.value),
        text: removeMarkdown(serializeToPlainText(values.value)),
      });
    }

    valuesRef.current = values;
  }, [values]);

  // Clean up and delete if needed.
  useEffect(
    () => () => {
      debouncedUpdateNote.cancel();
      if (!serializeToPlainText(values.value) && !values.title) deleteItem();
    },
    [],
  );

  const titleInput = (
    <Input
      name="title"
      onChange={(e: any) => {
        setValue('title', e.target.value);
      }}
      ref={(ref: any) => {
        titleInputRef.current = ref;
      }}
      value={values.title}
      variant="flushed"
      size="lg"
      fontSize="44px"
      fontWeight="bold"
      height="70px"
      p="15px"
      bg="white"
      placeholder="Untitled"
    />
  );

  return (
    <SlateRichTextEditor
      editorRef={(ref: any) => {
        editorRef.current = ref;
      }}
      // @ts-ignore
      editorContainerProps={editorContainerProps}
      editorInnerContainerProps={editorInnerContainerProps}
      value={values.value}
      placeholder="Start typing..."
      onChange={(slateVal: any[]) => {
        setValue('value', slateVal);
      }}
      children={(nodes: any) => children({ ...nodes, titleInput })}
    />
  );
};
