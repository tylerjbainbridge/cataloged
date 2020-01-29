import React from 'react';
import {
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  IconButton,
  Button,
  Icon,
  MenuDivider,
} from '@chakra-ui/core';
import { ItemFull } from '../graphql/__generated__/ItemFull';
import { FaEllipsisH } from 'react-icons/fa';
import { useOptimisticUpdateFavoriteManyItems } from '../hooks/useOptimisticUpdateFavoriteManyItems';
import { useOptimisticDeleteManyItems } from '../hooks/useOptimisticDeleteManyItems';
import { useGoToPath } from '../hooks/useGoToPath';
import { ItemStatusInput } from './ItemStatusInput';

export interface ItemActionMenuProps {
  item: ItemFull;
  menuButtom?: JSX.Element | null;
  onDeleteCompleted?: () => void;
  children?:
    | null
    | ((nodes: {
        [k: string]: JSX.Element;
      }) => JSX.Element | JSX.Element[] | null);
}

export const ItemActionMenu = ({
  item,
  menuButtom = null,
  children = null,
  onDeleteCompleted,
}: ItemActionMenuProps) => {
  const [goTo] = useGoToPath();

  const [favoriteItem] = useOptimisticUpdateFavoriteManyItems(
    [item],
    !item.isFavorited,
  );

  const [deleteItem] = useOptimisticDeleteManyItems([item], {
    onCompleted: onDeleteCompleted || (() => goTo('/')),
  });

  const deleteNode = (
    <>
      <MenuDivider />
      <MenuItem
        color="red"
        onClick={(e: any) => {
          if (e) {
            e.preventDefault();
            e.stopPropagation();
          }
          deleteItem();
        }}
      >
        <Icon name="delete" mr="5px" /> Delete
      </MenuItem>
    </>
  );

  const favoriteNode = (
    <MenuItem
      onClick={(e: any) => {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        favoriteItem();
      }}
      // @ts-ignore
      leftIcon="star"
    >
      <Icon name="star" mr="5px" /> {item.isFavorited ? 'Remove' : 'Add'}
    </MenuItem>
  );

  const statusNode = (
    <MenuItem>
      <ItemStatusInput item={item} size="sm" />
    </MenuItem>
  );

  const menuNodes = {
    favoriteNode,
    statusNode,
    deleteNode,
  };

  return (
    <Menu>
      {menuButtom || (
        <MenuButton
          as={Button}
          cursor="pointer"
          // @ts-ignore
          variant="outline"
          onClick={(e: any) => {
            e.stopPropagation();
          }}
        >
          <FaEllipsisH />
        </MenuButton>
      )}
      <MenuList>
        {children ? children(menuNodes) : Object.values(menuNodes)}
      </MenuList>
    </Menu>
  );
};
