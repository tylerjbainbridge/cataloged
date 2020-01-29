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

export const Note = ({ note, updateNote }: any) => {
  const { getValues, watch, setValue, register } = useForm<
    UpdateNoteFormValues
  >({
    defaultValues: {
      value: JSON.parse(note.raw),
    },
  });

  const { value } = getValues();

  const textRef = useRef(serializeToPlainText(value));

  const debouncedUpdateNote = useDebounce((variables: any) =>
    updateNote({ variables }),
  );

  const [deleteItem] = useOptimisticDeleteItem(note.item);

  watch('value');

  // Listen for form changes.
  useEffect(() => {
    register({ name: 'value' });
  }, [register]);

  useEffect(() => {
    const nextText = serializeToPlainText(value);

    if (nextText !== textRef.current) {
      //@ts-ignore
      debouncedUpdateNote({
        noteId: note.id,
        raw: JSON.stringify(value),
        text: removeMarkdown(textRef.current),
      });
    }

    textRef.current = nextText;
  }, [value]);

  // Clean up and delete if needed.
  useEffect(
    () => () => {
      debouncedUpdateNote.cancel();
      if (!textRef.current) deleteItem();
    },
    [],
  );

  return (
    <MarkdownEditor
      // @ts-ignore
      value={value}
      placeholder="Start typing..."
      onChange={(slateVal: any[]) => {
        setValue('value', slateVal);
      }}
    />
  );
};
