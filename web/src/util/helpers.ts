import _ from 'lodash';

export const randomString = (): string =>
  Math.random()
    .toString(36)
    .substring(2, 15) +
  Math.random()
    .toString(36)
    .substring(2, 15);

export const getFilterVariablesFromFormValues = ({
  // search,
  labels,
}: {
  // search: any;
  labels: any;
}) => {
  const variables = {};

  if (labels.length) {
    _.set(
      variables,
      'where.labels.some.id.in',
      labels.map(({ id }: { id: string }) => id),
    );
  }

  return variables;
};

export const getFormValuesFromFilterVariables = (variables: any, user: any) => {
  const labels = _.get(variables, 'where.labels.some.id.in', []);

  return {
    labels: labels.map((id: string) =>
      user.labels.find((label: any) => label.id === id),
    ),
  };
};
