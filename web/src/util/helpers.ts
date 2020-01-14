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

export const getFilterVariablesFromFormValues = ({
  search,
  labels,
  type,
}:
  | {
      type: string;
      search: string;
      labels: any;
    }
  | any) => {
  const filters = {};

  if (search) _.set(filters, 'search', search);

  if (type) _.set(filters, 'type', type !== 'all' ? type : null);

  if (labels) {
    _.set(
      filters,
      `where.labels.${labels.length ? 'some' : 'none'}.id.in`,
      labels.map(({ id }: { id: string }) => id),
    );
  }

  return cleanDeep(filters);
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

  return cleanDeep({
    type: variables.type,
    search: variables.search,
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
