import { FilterQueryBuilder } from './FilterQueryBuilder';
import { User } from '@prisma/client';

test('FilterQueryBuilder works', () => {
  // @ts-ignore
  const user: User = { id: '123' };

  const filters = [
    { name: '-type', values: ['file'] },
    { name: 'type', values: ['contact'] },
    { name: 'search', values: ['test string', 'another string'] },
    { name: 'includesContacts', value: true },
    { name: 'label', value: 'label 1' },
    { name: 'label', values: ['label 2', 'label 3'] },
    { name: '-label', values: ['label 4'] },
    { name: 'is', value: 'favorited' },
    { name: '-is', value: 'done' },
  ];

  const filterBuilder = new FilterQueryBuilder({ filters, user });

  const findMany = filterBuilder.getFindManyArgs();

  expect(filterBuilder.sets).toMatchSnapshot();
  expect(findMany).toMatchSnapshot();
});
