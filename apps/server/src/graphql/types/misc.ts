import {
  inputObjectType,
  objectType,
  enumType,
  unionType,
  stringArg,
  scalarType,
} from 'nexus';

export const ITEM_TYPES = ['link', 'file', 'note', 'googleContact'];

export enum ITEM_STATUS {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export const ItemType = enumType({
  name: 'ItemType',
  members: ITEM_TYPES,
});

export const ItemStatus = enumType({
  name: 'ItemStatus',
  members: ['NOT_STARTED', 'IN_PROGRESS', 'DONE'],
});

export const PageInfo = objectType({
  name: 'PageInfo',
  definition(t) {
    t.string('startCursor', {
      nullable: true,
    });
    t.string('endCursor', {
      nullable: true,
    });
    t.boolean('hasPreviousPage');
    t.boolean('hasNextPage');
  },
});

export const SignedURLArgs = inputObjectType({
  name: 'SignedURLArgs',
  definition(t) {
    t.string('name', { required: true });
    t.string('type', { required: true });
    t.int('size', { required: true });
  },
});

export const InProgressUpload = objectType({
  name: 'InProgressUpload',
  definition(t) {
    t.list.string('signedUrls');

    t.field('uploadGroup', {
      type: 'UploadGroup',
      nullable: true,
    });
  },
});

export const FilterValue = scalarType({
  name: 'FilterValue',
  description: 'String or Boolean',
  parseValue: value => value,
  serialize: value => value,
  parseLiteral: ast => {
    // @ts-ignore
    return ast.value;
  },
});

export const Filter = objectType({
  name: 'Filter',
  definition(t) {
    t.string('name');

    t.string('display');

    // One of these must be supplied
    t.field('value', { type: 'FilterValue', nullable: true });
    t.list.field('values', { type: 'FilterValue', nullable: true });
  },
});

export const FilterInput = inputObjectType({
  name: 'FilterInput',
  definition(t) {
    t.string('name', { required: true });

    t.string('display');

    // One of these must be supplied
    t.field('value', { type: 'FilterValue' });
    t.list.field('values', { type: 'FilterValue' });
  },
});

export const NullableJsonFilter = inputObjectType({
  name: 'NullableJsonFilter',
  definition(t) {
    t.string('test');
  },
});

export const JsonFilter = inputObjectType({
  name: 'JsonFilter',
  definition(t) {
    t.string('test');
  },
});

export const NewCollectionEntryInput = inputObjectType({
  name: 'NewCollectionEntryInput',
  definition(t) {
    t.string('entryId');

    t.string('blockId');
    t.string('blockType');
    t.string('blockContent');

    t.int('position');

    t.string('itemId');
  },
});

export const CollectionEntryPositionInput = inputObjectType({
  name: 'CollectionEntryPositionInput',
  definition(t) {
    t.string('id');
    t.int('position');
  },
});
