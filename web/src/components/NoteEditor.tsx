import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Node } from 'slate';
import deepEqual from 'fast-deep-equal';

import _ from 'lodash';
import removeMarkdown from 'remove-markdown';

import { useForm } from 'react-hook-form';
import { useOptimisticDeleteItem } from '../hooks/useOptimisticDeleteItem';

import { useDebounce } from '../hooks/useDebounce';
import SlateRichTextEditor from './SlateRichTextEditor';
import { Input } from '@chakra-ui/core';
import { ReactEditor } from 'slate-react';

export const serializeToPlainText = (nodes: any[] = []) => {
  return nodes.map(n => Node.string(n)).join('\n');
};

export const EMPTY_NOTE_VALUE = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
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
    150,
  );

  const [deleteItem] = useOptimisticDeleteItem(note.item);

  watch();

  // console.log({ values });

  useEffect(() => {
    register({ name: 'value' });
    register({ name: 'title' });
    setValue('title', note.title);
    setValue('value', JSON.parse(note.raw));

    if (!note.title) {
      // @ts-ignore
      titleInputRef?.current?.focus();
    } else {
      // @ts-ignore
      // ReactEditor.focus(editorRef.current);
    }
  }, []);

  useEffect(() => {
    if (!deepEqual(valuesRef.current, values)) {
      debouncedUpdateNote.cancel();

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

  const cleanupRef = useRef(null);

  useEffect(() => {
    // @ts-ignore
    cleanupRef.current = () => {
      debouncedUpdateNote.cancel();
      if (!note.text && !note.title) deleteItem();
    };
  }, [note]);

  // Clean up and delete if needed.
  useEffect(
    () => () => {
      // @ts-ignore
      cleanupRef.current();
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
      pl="50px"
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
