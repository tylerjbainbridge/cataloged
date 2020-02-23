import qs from 'query-string';
import {
  getQueryStringFromFilters,
  getFiltersFromQueryString,
} from '../helpers';

const filters = [
  { name: '-type', values: ['file'] },
  { name: 'search', value: 'random string' },
  { name: 'search', values: ['test string', 'another string'] },
  { name: 'label', value: 'label 1' },
  { name: 'label', values: ['label 2', 'label 3'] },
  { name: '-label', values: ['label 4'] },
  { name: 'is', value: 'favorited' },
  { name: '-is', value: 'not started' },
];

test('getQueryStringFromFilters', () => {
  const queryString = getQueryStringFromFilters(filters, '?itemId=123');

  expect(queryString).toMatchSnapshot();

  expect(qs.parse(queryString, { arrayFormat: 'bracket' })).toMatchSnapshot();
});

test('getFiltersFromQueryString', () => {
  const queryString = getQueryStringFromFilters(filters, '?itemId=123');

  expect(getFiltersFromQueryString(queryString)).toMatchSnapshot();
});
