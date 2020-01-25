import _ from 'lodash';
// @ts-ignore
import cleanDeep from 'clean-deep';
import queryString from 'query-string';

export const randomString = (): string =>
  Math.random()
    .toString(36)
    .substring(2, 15) +
  Math.random()
    .toString(36)
    .substring(2, 15);

export const getFilterVariablesFromFormValues = (filters: any[]) => {
  return filters.filter(
    ({ value, values }: any) =>
      !_.isEmpty((value || '').toString()) || !_.isEmpty(values),
  );
};

export const getFilterVariablesFromQueryString = (search: any, user: any) => {
  const parsed = queryString.parse(search, { arrayFormat: 'bracket' });

  return getFilterVariablesFromFormValues({
    ...parsed,
    // @ts-ignore
    labels: (parsed?.labels || []).map((id: string) =>
      user.labels.find((label: any) => label.id === id),
    ),
  });
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
    labels: labels.map((id: string) => {
      const label = user.labels.find((label: any) => label.id === id);

      return forQueryString ? label.id : label;
    }),
  });
};

export const getNodesFromConnection = <T>(connection: any) => {
  const nodes: T[] = (connection?.edges || []).map(({ node }: any) => node);

  return nodes;
};
