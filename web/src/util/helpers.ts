import _ from 'lodash';

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
}: {
  search: string;
  labels: any;
}) => {
  const variables = {};

  _.set(variables, 'search', search);

  _.set(
    variables,
    `where.labels.${labels.length ? 'some' : 'none'}.id.in`,
    labels.map(({ id }: { id: string }) => id),
  );

  return variables;
};

export const getFormValuesFromFilterVariables = (variables: any, user: any) => {
  const labels = _.get(variables, 'where.labels.some.id.in', []);

  return {
    search: variables.search,
    labels: labels.map((id: string) =>
      user.labels.find((label: any) => label.id === id),
    ),
  };
};
