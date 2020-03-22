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
  'relatedToItem',
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

export const getRealFilters = (filters: any[]) =>
  filters.map(({ name, ...rest }) => ({
    ...rest,
    name: getRealName(name || 'search'),
  }));

export const getQueryStringFromFilters = (filters: any[], search = '') => {
  const sets: { [k: string]: Set<any> } = {
    ...[...FILTER_NAMES].reduce(
      (p, c) => ({
        ...p,
        [getRealName(c)]: new Set(),
      }),
      {},
    ),
  };

  const parsedFilters = search
    ? _.omitBy(queryString.parse(search), isFilterQueryArg)
    : {};

  filters.forEach(filter => {
    if (filter.display) {
      _.set(parsedFilters, `${filter.name}.display`, filter.display);
    }

    (filter.values ? filter.values : [filter.value]).forEach(
      (value: string) => {
        const setName = getRealName(filter.name || 'search');
        // @ts-ignore

        if (sets[setName]) sets[setName].add(value);
      },
    );
  });

  Object.entries(sets).forEach(([name, set]) => {
    if (!set.size) return;

    return _.set(
      parsedFilters,
      `${name}.value`,
      set.size === 1 ? [...set][0] : [...set],
    );
  });

  //@ts-ignore
  const queryStringFilters = Object.entries(parsedFilters).reduce(
    (p, [name, filter]) => {
      ['value', 'display'].forEach(field => {
        // @ts-ignore
        if (filter[field]) p[`${name}.${field}`] = filter[field];
      });

      return p;
    },
    {},
  );

  return queryString.stringify(queryStringFilters, { arrayFormat: 'bracket' });
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

  const filters = Object.entries(
    // @ts-ignore
    Object.entries(parsed).reduce((p: any, [key, value]: any) => {
      const [name, field] = key.split('.');
      return _.set(p, `${name}.${field}`, value);
    }, {}),
  ).map(([name, { value, display, ...rest }]: any) => {
    const filter = { name, display };

    // @ts-ignore
    if (Array.isArray(value)) filter.values = value;
    // @ts-ignore
    else filter.value = value;

    return filter;
  });

  // console.log(filters);

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
      behavior: 'smooth',
      scrollMode: 'if-needed',
      block: 'center',
      inline: 'center',
    });
};

export const scrollToNodeIfOutOfView = (node: any) => {
  if (node)
    scrollIntoView(node, {
      behavior: 'smooth',
      scrollMode: 'if-needed',
      block: 'nearest',
      inline: 'center',
    });
};

export const getKeybindAsArray = (keybind: string) => {
  const mappings = {
    mod: '⌘',
  };

  if (keybind.includes('+')) {
    return (
      keybind
        .split('+')
        .map(str => str.trim())
        // @ts-ignore
        .map(str => mappings[str] || str)
    );
  }

  return (
    keybind
      .split(' ')
      .map(str => str.trim())
      // @ts-ignore
      .map(str => mappings[str] || str)
      .join(' then ')
      .split(' ')
  );
};

export const downloadFile = (url: string, fileName: string, type: string) => {
  // Create an invisible A element
  const a = document.createElement('a');
  a.style.display = 'none';
  document.body.appendChild(a);

  a.href = url;

  a.target = '_blank';
  a.download = fileName;

  a.click();

  window.URL.revokeObjectURL(a.href);
  document.body.removeChild(a);
};
