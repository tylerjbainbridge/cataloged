import React from 'react';

import { Segment } from 'semantic-ui-react';

import { getItems_items } from './__generated__/getItems';
import { File } from './File';
import { Link } from './Link';

export const Item = ({ item }: { item: getItems_items }) => {
  let node = null;

  switch (item.type) {
    case 'file':
      node = item.file ? <File file={item.file} /> : null;
      break;

    default:
      node = item.link ? <Link link={item.link} /> : null;
      break;
  }

  return (
    <Segment style={{ width: 300, height: 400 }} basic>
      {node}
    </Segment>
  );
};
