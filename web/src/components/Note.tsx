import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Node } from 'slate';
import { useMutation } from '@apollo/react-hooks';
import _ from 'lodash';
import removeMarkdown from 'remove-markdown';

import { MarkdownEditor } from './MarkdownEditor';

import useForm from 'react-hook-form';
import { useOptimisticDeleteItem } from '../hooks/useOptimisticDeleteItem';

import { UPDATE_NOTE_MUTATION } from '../graphql/note';

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

export const Note = ({ note }: { note: any }) => {
  const { getValues, watch, setValue, register } = useForm({
    defaultValues: {
      value: JSON.parse(note.raw),
    },
  });

  const { value } = getValues();

  const textRef = useRef(serializeToPlainText(value));

  const [updateNote] = useMutation(UPDATE_NOTE_MUTATION, {
    variables: {
      noteId: note.id,
      raw: JSON.stringify(value),
      text: removeMarkdown(textRef.current),
    },
  });

  const { current: debouncedUpdateNote } = useRef(_.debounce(updateNote, 500));

  const [deleteItem] = useOptimisticDeleteItem(note.item);

  watch('value');

  // Listen for form changes.
  useEffect(() => {
    register({ name: 'value' });
  }, [register]);

  useEffect(() => {
    const nextText = serializeToPlainText(value);

    if (nextText !== textRef.current) {
      debouncedUpdateNote(value);
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
      onChange={(slateVal: any[]) => {
        setValue('value', slateVal);
      }}
    />
  );
};
