import _ from 'lodash';
import scrollIntoView from 'scroll-into-view-if-needed';

// @ts-ignore
import cleanDeep from 'clean-deep';
import queryString from 'query-string';
import { FILTER_CONFIGS } from '../components/Filter';
import { filterNames } from '../components/FilterSearchInput';
import { ItemFull } from '../graphql/__generated__/ItemFull';

export const FILTER_NAMES = [
  ...filterNames.map(({ value }: any) => value),
  'labels',
  'search',
];

export const randomString = (): string =>
  Math.random()
    .toString(36)
    .substring(2, 15) +
  Math.random()
    .toString(36)
    .substring(2, 15);

const isFilterQueryArg = (...args: any[]) =>
  FILTER_NAMES.find(name => {
    const [value, key] = args;
    return key.includes(name);
  });

export const getRealName = (name: string) => {
  return (
    // @ts-ignore
    {
      labels: 'label',
    }[name] || name
  );
};

export const getQueryStringFromFilters = (filters: any[], search = '') => {
  const sets: { [k: string]: Set<any> } = {
    ...FILTER_NAMES.reduce(
      (p, c) => ({
        ...p,
        [getRealName(c)]: new Set(),
      }),
      {},
    ),
  };

  filters.forEach(filter => {
    (filter.values ? filter.values : [filter.value]).forEach(
      (value: string) => {
        const setName = getRealName(filter.name || 'search');
        // @ts-ignore

        if (sets[setName]) sets[setName].add(value);
      },
    );
  });

  const parsedFilters = Object.entries(sets).reduce(
    (p, [name, set]) => {
      if (!set.size) return p;

      return _.set(p, name, set.size === 1 ? [...set][0] : [...set]);
    },
    search ? _.omitBy(queryString.parse(search), isFilterQueryArg) : {},
  );

  return queryString.stringify(parsedFilters, { arrayFormat: 'bracket' });
};

export const getFilterVariablesFromFormValues = (filters: any[]) => {
  return filters.filter(
    ({ value, values }: any) =>
      !_.isEmpty((value || '').toString()) || !_.isEmpty(values),
  );
};

export const getFiltersFromQueryString = (search: any) => {
  const parsed = _.pickBy(
    queryString.parse(search, { arrayFormat: 'bracket' }),
    isFilterQueryArg,
  );

  const filters = Object.entries(parsed).map(([name, value]) => {
    const filter = { name };

    // @ts-ignore
    if (Array.isArray(value)) filter.values = value;
    // @ts-ignore
    else filter.value = value;

    return filter;
  });

  return filters;
};

export const getNodesFromConnection = <T>(connection: any) => {
  const nodes: T[] = (connection?.edges || []).map(({ node }: any) => node);

  return nodes;
};

export const confirmMutation = ([mutateFunc, ...rest]: any, message: any) => [
  (...args: any) => {
    const res = window.confirm(message || 'Are you sure');

    if (res) {
      return mutateFunc(...args);
    }
  },
  ...(rest as any),
];

export const scrollToItemIfOutOfView = (id: ItemFull['id']) => {
  const node = document.getElementById(`item-${id}`);

  if (node)
    scrollIntoView(node, {
      scrollMode: 'if-needed',
      block: 'center',
      inline: 'center',
    });
};
