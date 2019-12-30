import _ from 'lodash';

export const connectTo = (data: Object, key: String, id: String) =>
  _.set(data, `${key}.connect.id`, id);
