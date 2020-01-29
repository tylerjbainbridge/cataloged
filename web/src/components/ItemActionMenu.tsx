import React from 'react';
import {
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  IconButton,
  Button,
  Icon,
} from '@chakra-ui/core';
import { ItemFull } from '../graphql/__generated__/ItemFull';
import { FaEllipsisH } from 'react-icons/fa';
import { useOptimisticUpdateFavoriteManyItems } from '../hooks/useOptimisticUpdateFavoriteManyItems';
import { useOptimisticDeleteManyItems } from '../hooks/useOptimisticDeleteManyItems';

export interface ItemActionMenuProps {
  item: ItemFull;
  menuButtom?: JSX.Element | null;
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
}: ItemActionMenuProps) => {
  const [favoriteItem] = useOptimisticUpdateFavoriteManyItems(
    [item],
    !item.isFavorited,
  );

  const [deleteItem] = useOptimisticDeleteManyItems([item]);

  const deleteNode = (
    <MenuItem
      color="red"
      onClick={(e: any) => {
        e.preventDefault();
        e.stopPropagation();
        deleteItem();
      }}
    >
      <Icon name="delete" mr="5px" /> Delete
    </MenuItem>
  );

  const favoriteNode = (
    <MenuItem
      onClick={(e: any) => {
        e.preventDefault();
        e.stopPropagation();
        favoriteItem();
      }}
      // @ts-ignore
      leftIcon="star"
    >
      <Icon name="star" mr="5px" /> {item.isFavorited ? 'Remove' : 'Add'}
    </MenuItem>
  );

  const menuNodes = {
    favoriteNode,
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
