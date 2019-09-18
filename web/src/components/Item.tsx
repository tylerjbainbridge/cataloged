import React, { useContext } from 'react';

import { Segment } from 'semantic-ui-react';

import { getItems_items } from './__generated__/getItems';
import { File } from './File';
import { Link } from './Link';
import { SelectContext } from './SelectContainer';

export const Item = ({ item }: { item: getItems_items }) => {
  let node = null;

  const { isItemSelected } = useContext(SelectContext);

  switch (item.type) {
    case 'file':
      //@ts-ignore
      node = item.file ? <File item={item} /> : null;
      break;

    default:
      //@ts-ignore
      node = item.link ? <Link item={item} /> : null;
      break;
  }

  return (
    <Segment
      style={{
        padding: 10,
        margin: 0,
        width: 300,
        height: 380,
        display: 'flex',
        justifyContent: 'center',
        ...(isItemSelected(item)
          ? { backgroundColor: '#add8e6', borderRadius: 10 }
          : {}),
      }}
      basic
      rounded
    >
      {node}
    </Segment>
  );
};
