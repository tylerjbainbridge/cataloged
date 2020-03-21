import { getTweetMetaFromUrl } from '../link';

test('getTweetMetaFromUrl', () => {
  const urls = [
    'https://twitter.com/TaylorLorenz/status/1241385601926135814?s=20',
    'https://twitter.com/TaylorLorenz',
  ];

  expect(
    urls.map(href =>
      getTweetMetaFromUrl({
        href,
        host: 'https://twitter.com',
      }),
    ),
  ).toMatchSnapshot();
});
