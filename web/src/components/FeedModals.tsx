import React, { useEffect, useContext } from 'react';
import { FileModal } from './FileModal';
import { NoteModal } from './NoteModal';
import { LinkModal } from './LinkModal';
import { FeedContext } from './Feed';

export const FeedModals = () => {
  const { activeItemId, setActiveItemId, items } = useContext(FeedContext);

  const activeItem = items.find(({ id }) => id === activeItemId);

  // useEffect(() => {
  //   if (activeItem) {
  //     switch (activeItem.type) {
  //       case 'file':
  //         //@ts-ignore
  //         break;

  //       case 'note':
  //         //@ts-ignore
  //         node = item.note && item.note.text ? <NoteItem item={item} /> : null;
  //         break;

  //       case 'link':
  //         //@ts-ignore
  //         node = item.link ? <LinkItem item={item} /> : null;
  //         break;

  //       default:
  //         //@ts-ignore
  //         node = null;
  //         break;
  //     }
  //   }
  // }, [activeItem?.id]);

  const disclosure = {
    onClose: () => setActiveItemId(null),
    // Dummy placeholders- onClose is all that matters
    onOpen: () => {},
    isOpen: true,
    onToggle: () => {},
  };

  return (
    <>
      {activeItem?.file && (
        <FileModal
          // @ts-ignore
          item={activeItem}
          disclosure={disclosure}
        />
      )}

      {/* {activeItem?.note && (
        // <NoteModal
        //   shouldRenderButton={false}
        //   // @ts-ignore
        //   item={activeItem}
        //   disclosure={disclosure}
        // />
      )} */}

      {activeItem?.link && (
        <LinkModal
          // @ts-ignore
          item={activeItem}
          disclosure={disclosure}
        />
      )}
    </>
  );
};
