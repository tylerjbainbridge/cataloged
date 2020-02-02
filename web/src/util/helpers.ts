import _ from 'lodash';
// @ts-ignore
import cleanDeep from 'clean-deep';
import queryString from 'query-string';
import { FILTER_CONFIGS } from '../components/NewFilter';

export const randomString = (): string =>
  Math.random()
    .toString(36)
    .substring(2, 15) +
  Math.random()
    .toString(36)
    .substring(2, 15);

const FILTER_NAMES = Object.keys(FILTER_CONFIGS);

const isFilterQueryArg = (...args: any[]) =>
  FILTER_NAMES.find(name => {
    const [value, key] = args;
    return key.includes(name);
  });

export const getQueryStringFromFilters = (filters: any[], location: any) => {
  return queryString.stringify(
    {
      ...filters.reduce((p, c) => {
        const key = `${c.name}.${c.operator}`;

        return {
          [key]: c.value || c.values,
          ...p,
        };
      }, {}),
      ..._.omitBy(queryString.parse(location?.search), isFilterQueryArg),
    },
    { arrayFormat: 'bracket' },
  );
};

export const getFilterVariablesFromFormValues = (filters: any[]) => {
  return filters.filter(
    ({ value, values }: any) =>
      !_.isEmpty((value || '').toString()) || !_.isEmpty(values),
  );
};

export const getFeedVariablesFromQueryString = (search: any) => {
  const parsed = _.pickBy(
    queryString.parse(search, { arrayFormat: 'bracket' }),
    isFilterQueryArg,
  );

  const filters = Object.entries(parsed).map(([key, value]) => {
    const [name, operator] = key.split('.');
    const filter = { name, operator };

    // @ts-ignore
    if (Array.isArray(value)) filter.values = value;
    // @ts-ignore
    else filter.value = value;

    return filter;
  });

  console.log({
    parsed,
    filters,
    qs: queryString.parse(search, { arrayFormat: 'bracket' }),
  });

  return { filters };
};

export const getFormValuesFromFilterVariables = (
  variables: any,
  user: any,
  forQueryString = false,
) => {
  const labels = _.get(variables, 'where.labels.some.id.in', []);
  const onlyFavorites =
    _.get(variables, 'where.isFavorited.equals', false) || undefined;

  const status = _.get(variables, 'where.status.equals', '');

  return cleanDeep({
    type: variables.type,
    search: variables.search,
    onlyFavorites,
    status,
    labels: labels.map((name: string) => {
      const label = user.labels.find((label: any) => label.name === name);

      return forQueryString ? label.id : label;
    }),
  });
};

export const getNodesFromConnection = <T>(connection: any) => {
  const nodes: T[] = (connection?.edges || []).map(({ node }: any) => node);

  return nodes;
};
