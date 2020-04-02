import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

import { useGetItem } from 'cataloged-shared/hooks/useGetItem';

import { Box, Text } from '../../components/UI';
import { LinkView } from './components/LinkView';
import { FileView } from './components/FileView';

const ItemView = ({ itemId }: any) => {
  const { item, loading } = useGetItem(itemId);

  let viewNode = null;

  const viewProps = { item };

  switch (item?.type) {
    case 'link':
      viewNode = <LinkView {...viewProps} />;
      break;

    case 'file':
      viewNode = <FileView {...viewProps} />;
      break;

    case 'note':
    case 'googleContact':
      break;
  }

  return (!loading || item) && viewNode;
};

export { ItemView };
