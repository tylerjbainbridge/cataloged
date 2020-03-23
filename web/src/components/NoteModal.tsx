import { useMutation } from '@apollo/client';

import { CREATE_NOTE_MUTATION } from 'cataloged-shared/graphql/note';

import { EMPTY_NOTE_VALUE, serializeToPlainText } from './NoteEditor';
import { useHotKey } from 'cataloged-shared/hooks/useHotKey';
import { ItemFull } from 'cataloged-shared/graphql/__generated__/ItemFull';
import { Disclosure } from './GlobalModal';
import { useGoToItem } from 'cataloged-shared/hooks/useGoTo';

export const NoteModal = ({
  children,
}: {
  item?: ItemFull;
  disclosure?: Disclosure;
  shouldRenderButton?: boolean;
  children: (childProps: { createNote: any; isCreating: boolean }) => any;
}) => {
  const [goToItem] = useGoToItem();

  const [createNote, { data, loading: isCreating }] = useMutation(
    CREATE_NOTE_MUTATION,
    {
      variables: {
        raw: JSON.stringify(EMPTY_NOTE_VALUE),
        text: serializeToPlainText(EMPTY_NOTE_VALUE),
      },
      refetchQueries: ['feed'],
      onCompleted: data => {
        goToItem(data?.createNote?.item);
      },
    },
  );

  useHotKey('c n', () => {
    console.log('hello note');

    createNote();
  });

  return children({ createNote, isCreating });
};
