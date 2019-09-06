import React from 'react';
import { Segment, Header, Icon, Popup } from 'semantic-ui-react';

import { getItems_items_link } from './__generated__/getItems';
import { LazyImage } from './LazyImage';

export const Link = ({ link }: { link: getItems_items_link }) => (
  <div onClick={() => window.open(link.href)} style={{ cursor: 'pointer' }}>
    <LazyImage
      src={link.image || link.favicon || ''}
      style={{
        width: 280,
        height: 280,
        objectFit: 'cover',
        objectPosition: '50% 50%',
      }}
    />
    <Popup
      trigger={
        <Header
          style={
            {
              // whiteSpace: 'nowrap',
              // overflow: 'hidden',
              // textOverflow: 'ellipsis',
            }
          }
        >
          {link.title || 'link.href'}
        </Header>
      }
      content="Visit link"
      basic
      position="bottom center"
    />
  </div>
);
