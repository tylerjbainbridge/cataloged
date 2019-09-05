import React from 'react';

import { Segment } from 'semantic-ui-react';

import { getItems_items } from './__generated__/getItems';
import { File } from './File';

export const Item = ({ item }: { item: getItems_items }) => {
  let node = null;

  switch (item.type) {
    case 'file':
      node = item.file ? <File file={item.file} /> : null;
      break;

    default:
      break;
  }

  return (
    <Segment style={{ width: 300, height: 350 }} basic>
      {node}
    </Segment>
  );
};
