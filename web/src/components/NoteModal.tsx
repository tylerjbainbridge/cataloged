import { useMutation } from '@apollo/react-hooks';

import { CREATE_NOTE_MUTATION } from '../graphql/note';

import { EMPTY_NOTE_VALUE, serializeToPlainText } from './NoteEditor';
import { useHotKey } from '../hooks/useHotKey';
import { ItemFull } from '../graphql/__generated__/ItemFull';
import { Disclosure } from './GlobalModal';
import { useGoToItem } from '../hooks/useGoTo';

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
