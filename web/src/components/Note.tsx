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
}

export const Note = ({
  note,
  updateNote,
  editorContainerProps,
  editorInnerContainerProps,
}: any) => {
  const { getValues, watch, setValue, register } = useForm<
    UpdateNoteFormValues
  >({
    defaultValues: {
      value: JSON.parse(note.raw),
    },
  });

  const { value } = getValues();

  const valueRef = useRef(value);

  const debouncedUpdateNote = useDebounce(
    (variables: any) => updateNote({ variables }),
    250,
  );

  const [deleteItem] = useOptimisticDeleteItem(note.item);

  watch('value');

  // Listen for form changes.
  useEffect(() => {
    register({ name: 'value' });
  }, [register]);

  useEffect(() => {
    const nextValue = value;

    if (!_.isEqual(nextValue, valueRef.current)) {
      //@ts-ignore
      debouncedUpdateNote({
        noteId: note.id,
        raw: JSON.stringify(value),
        text: removeMarkdown(serializeToPlainText(value)),
      });
    }

    valueRef.current = nextValue;
  }, [value]);

  // Clean up and delete if needed.
  useEffect(
    () => () => {
      debouncedUpdateNote.cancel();
      if (!valueRef.current) deleteItem();
    },
    [],
  );

  return (
    <SlateRichTextEditor
      // @ts-ignore
      editorContainerProps={editorContainerProps}
      editorInnerContainerProps={editorInnerContainerProps}
      value={value}
      placeholder="Start typing..."
      onChange={(slateVal: any[]) => {
        setValue('value', slateVal);
      }}
    />
  );
};
