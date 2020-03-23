import gql from 'graphql-tag';
import { ITEM_CONNECTION_FULL_FRAGMENT } from '../graphql/item';

export const FEED_QUERY = gql`
  query feed($first: Int, $after: String, $filters: [FilterInput!]) {
    itemsConnection(
      first: $first
      after: $after

      filters: $filters

      orderBy: { date: desc }
    ) @connection(key: "feed_connection", filter: ["filters"]) {
      ...ItemConnectionFull
    }
  }

  ${ITEM_CONNECTION_FULL_FRAGMENT}
`;
