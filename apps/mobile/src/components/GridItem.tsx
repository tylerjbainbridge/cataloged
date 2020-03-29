// @ts-ignore
import styled from '@emotion/native';
import { ItemFull } from 'cataloged-shared/graphql/__generated__/ItemFull';
import { getGenericItemData } from 'cataloged-shared/util/itemHelpers';
import React from 'react';
import { Box, Text } from './UI';
import { formatRelative, format } from 'date-fns';

export interface GridItemProps {
  item: ItemFull;
}

const Title = styled.Text`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 5px;
`;

const SubTitle = styled.Text`
  font-size: 15px;
  font-weight: 500;
  color: #a0aec0;
`;

const CreatedAt = styled.Text`
  font-size: 15px;
  color: #a0aec0;
`;

const ItemImage = styled.Image`
  height: 100%;
  width: 100%;
  border-top-left-radius: 10;
  border-top-right-radius: 10;
`;

export const GRID_ITEM_HEIGHT = 300;

export const GridItem = ({ item }: GridItemProps) => {
  const {
    title,
    action,
    image,
    createdAt,
    icon,
    subTitle,
  } = getGenericItemData(item);

  return (
    <Box
      height={GRID_ITEM_HEIGHT}
      width="80%"
      // backgroundColor="red"
      borderRadius={10}
      borderColor="rgba(0, 0, 0, 0.08)"
      borderWidth={1}
      borderStyle="solid"
    >
      <Box
        height={GRID_ITEM_HEIGHT * (7 / 12)}
        width="100%"
        borderBottomRadius={10}
        borderBottomColor="rgba(0, 0, 0, 0.08)"
        borderBottomWidth={1}
        borderBottomStyle="solid"
      >
        {image && <ItemImage source={{ uri: image }} />}
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        height={GRID_ITEM_HEIGHT * (5 / 12)}
        width="100%"
        padding={15}
        // backgroundColor="red"
      >
        <Box>
          <Title numberOfLines={1} ellipsizeMode="clip">
            {title}
          </Title>
          <SubTitle numberOfLines={1} ellipsizeMode="clip">
            {subTitle}
          </SubTitle>
        </Box>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Box></Box>
          <CreatedAt>{format(new Date(createdAt), 'MM/dd/yyyy')}</CreatedAt>
        </Box>
      </Box>
    </Box>
  );
};
