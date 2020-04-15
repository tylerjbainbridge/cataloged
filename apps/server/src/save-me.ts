require('dotenv').config();

import { knex } from './data/knex';

const relations = [
  'inviteCode',
  'file',
  'note',
  'link',
  'item',
  'user',
  'savedSearch',
  'googleAccount',
  'collection',
  'block',
  'uploadGroup',
];

(async () => {
  const { rows } = await knex.raw(
    `SELECT tablename FROM pg_tables WHERE schemaname='public'`,
  );

  await Promise.all(
    rows.map(async ({ tablename }) => {
      const columns = await knex(tablename).columnInfo();

      console.log(
        Object.keys(columns).filter(columnName =>
          relations.includes(columnName),
        ),
      );

      await Promise.all(
        Object.keys(columns)
          .filter(columnName => relations.includes(columnName))
          .map(async originalColumnName => {
            const newColumnName = `${originalColumnName}Id`;

            try {
              await knex.schema.table(tablename, table => {
                console.log('dropping foreign constraint', originalColumnName);
                table.dropForeign(
                  [originalColumnName],
                  `${tablename}_${originalColumnName}_fkey`,
                );
              });
            } catch (e) {
              console.log({
                tablename,
                column,
                meta: columns[originalColumnName],
              });
              console.log(e);
            }

            try {
              await knex.schema.alterTable(tablename, table => {
                console.log(
                  'renaming column and updating type',
                  originalColumnName,
                  newColumnName,
                );

                table.renameColumn(originalColumnName, newColumnName);
              });

              await knex.schema.alterTable(tablename, table => {
                console.log('changing column type', newColumnName);

                const mod = table.string(newColumnName);

                console.log(originalColumnName, columns[originalColumnName]);

                if (columns[originalColumnName].nullable) {
                  mod.nullable();
                }

                mod.alter();
              });
            } catch (e) {
              console.log(e);
            }
          }),
      );
    }),
  );

  try {
    await knex.schema.table('Item', table => {
      table
        .string('fileId')
        .nullable()
        .unique();

      table
        .string('googleContactId')
        .nullable()
        .unique();
    });
  } catch (e) {
    console.log(e);
  }

  await Promise.all(
    (await knex('File').select(['id', 'itemId'])).map(
      async ({ id, itemId }) => {
        try {
          await knex('Item')
            .where({ id: itemId })
            .update({ fileId: id });
        } catch (e) {
          console.log(e);
        }
      },
    ),
  );

  await Promise.all(
    (await knex('GoogleContact').select(['id', 'itemId'])).map(
      async ({ id, itemId }) => {
        try {
          await knex('Item')
            .where({ id: itemId })
            .update({ googleContactId: id });
        } catch (e) {
          console.log(e);
        }
      },
    ),
  );

  try {
    await knex.schema.alterTable('File', table => {
      table.dropColumn('itemId');
    });

    await knex.schema.alterTable('GoogleContact', table => {
      table.dropColumn('itemId');
    });
  } catch (e) {
    console.log(e);
  }

  console.log('done');
})();
