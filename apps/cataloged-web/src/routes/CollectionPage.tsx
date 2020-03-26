import React, { useCallback, useRef } from 'react';
import _ from 'lodash';

import {
  Box,
  Button,
  useDisclosure,
  Tooltip,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  Divider,
} from '@chakra-ui/core';
import { useDrag, useDrop, DropTargetMonitor, DndProvider } from 'react-dnd';
import { XYCoord } from 'dnd-core';
import { useQuery, gql } from '@apollo/client';
import { useParams, useRouteMatch } from 'react-router-dom';
import Backend from 'react-dnd-html5-backend';
import {
  GenericListItem,
  LIST_ITEM_HEIGHT,
} from '../components/GenericListItem';
import { useOptimisticCollection } from 'cataloged-shared/hooks/useOptimisticCollection';
import { COLLECTION_FULL_FRAGMENT } from 'cataloged-shared/graphql/collection';
import { FaPlusCircle, FaTrash, FaEllipsisH } from 'react-icons/fa';
import { TopNavBar } from '../components/TopNavBar';
import { CommandCenter } from '../components/CommandCenter';
import { useGoToItem } from 'cataloged-shared/hooks/useGoTo';
import { Click } from '../components/Click';

export enum ItemTypes {
  CARD = 'entry',
}

export interface DraggableItemProps {
  id: any;
  text: string;
  index: number;
  moveDraggableItem: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const CollectionBlock = ({ block, collectionService }: any) => {
  switch (block.type) {
    case 'sectionHeader':
      return (
        <Box p="20px" mt="10px" mb="10px" width="100%">
          <Input
            variant="flushed"
            fontSize="2xl"
            fontWeight="semibold"
            value={block.content}
            onChange={(e: any) => {
              collectionService.updateBlockContent(block.id, e.target.value);
            }}
          />
        </Box>
      );

    default:
      return null;
  }
};

const DraggableEntry: React.FC<any> = ({
  id,
  entry,
  index,
  collection,
  collectionService,
  moveDraggableItem,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    // drop: (item, ...args) => {
    //   const dragIndex = item.index;
    //   const hoverIndex = index;

    //   console.log({ item, dragIndex, hoverIndex }, ...args);

    //   // Don't replace entries with themselves
    //   if (dragIndex === hoverIndex) {
    //     return;
    //   }
    // },
    hover: (dragged: DragItem, monitor: DropTargetMonitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = dragged.index;
      const hoverIndex = index;

      // Don't replace entries with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current!.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the entries height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveDraggableItem(dragIndex, hoverIndex);

      // Note: we're mutating the monitor entry here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      dragged.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, id, index },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const hoverState = useDisclosure();

  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));

  const [goToItem] = useGoToItem();

  const menuNode = (
    <Menu>
      <MenuButton
        as={Button}
        size="sm"
        cursor="pointer"
        // @ts-ignore
        variant="ghost"
        bg="white"
        onClick={(e: any) => {
          e.stopPropagation();
        }}
      >
        <FaEllipsisH />
      </MenuButton>
      <MenuList>
        <MenuItem
          color="red"
          onClick={(e: any) => {
            if (e) {
              e.preventDefault();
              e.stopPropagation();
            }

            collectionService.removeEntry(entry.id);
          }}
        >
          <Icon name="delete" mr="5px" size="12px" /> Remove from collection
        </MenuItem>
      </MenuList>
    </Menu>
  );

  return (
    <Box
      d="flex"
      alignItems="center"
      ref={ref}
      opacity={opacity}
      rounded="lg"
      width="100%"
      mb="10px"
    >
      <Box
        d="flex"
        alignItems="center"
        height={LIST_ITEM_HEIGHT}
        position="absolute"
        width="50px"
        marginLeft="-50px"
        onMouseEnter={hoverState.onOpen}
        onMouseLeave={hoverState.onClose}
      >
        {!isDragging && hoverState.isOpen && (
          <Tooltip
            label="Insert block here"
            aria-label="add block"
            placement="left"
          >
            <Button
              size="sm"
              onClick={() => {
                collectionService.insertAtPosition({
                  blockType: 'sectionHeader',
                  blockContent: '',
                  position: entry.position,
                });
              }}
            >
              <FaPlusCircle size="12px" />
            </Button>
          </Tooltip>
        )}
      </Box>
      {entry.item && (
        <Click
          onSingleClick={() => {
            goToItem(entry.item);
          }}
        >
          {(clickProps: any) => (
            <GenericListItem
              item={entry.item}
              withMarginBottom={false}
              menuNode={<> </>}
              containerProps={{
                ...clickProps,
              }}
            />
          )}
        </Click>
      )}
      {entry.block && (
        <CollectionBlock
          block={entry.block}
          collectionService={collectionService}
        />
      )}
      <Box ml="10px" mt="-10px">
        {menuNode}
      </Box>
    </Box>
  );
};

const GET_COLLECTION = gql`
  query getCollection($id: String!) {
    collection(id: $id) {
      ...CollectionFull
    }
  }

  ${COLLECTION_FULL_FRAGMENT}
`;

export const Collection = ({ collection }: any) => {
  // const [entries, setDraggableItems] = useState(collection.entries);

  const { entries } = collection;

  const collectionService = useOptimisticCollection(collection);

  const moveDraggableItem = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const results = entries.slice();
      const firstItem = entries[dragIndex];

      results[dragIndex] = entries[hoverIndex];
      results[hoverIndex] = firstItem;

      collectionService.updatePositions(results);
      // setDraggableItems(results)

      // const from = collection.entries[dragIndex];
      // const to = collection.entries[hoverIndex];

      // console.log({ from, to });

      // moveToPosition({
      //   entryId: from.id,
      //   position: to.position,
      // });
    },
    [entries],
  );

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Box
        d="flex"
        margin={20}
        padding={20}
        size={600}
        width={900}
        // bg="lightgray"
        // borderStyle="solid"
        // borderColor="lightgray"
        // borderWidth={2}
        rounded="lg"
      >
        <Box d="flex" flexWrap="wrap" width="100%">
          <Box width="100%" rounded="lg" p="10px">
            <Box bg="white" width="100%" mb="60px">
              <Input
                height="70px"
                variant="unstyled"
                fontSize="5xl"
                fontWeight="bold"
                placeholder="Untitled collection"
                value={collection.name}
                p="10px"
                onChange={(e: any) => {
                  collectionService.updateCollectionName(e.target.value);
                }}
              />
            </Box>
            {entries.map((entry: any, i: number) => (
              <DraggableEntry
                key={entry.id}
                index={i}
                entry={entry}
                collection={collection}
                moveDraggableItem={moveDraggableItem}
                collectionService={collectionService}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export const CollectionPage = () => {
  const match = useRouteMatch('/collection/:collectionId');

  const { data, loading } = useQuery(GET_COLLECTION, {
    // @ts-ignore
    variables: { id: match.params.collectionId },
    fetchPolicy: 'cache-and-network',
  });

  return (
    <Box d="flex" justifyContent="center" flex="1">
      <TopNavBar />
      <CommandCenter />
      {data && (
        <DndProvider backend={Backend}>
          <Collection collection={data?.collection} />
        </DndProvider>
      )}
    </Box>
  );
};
