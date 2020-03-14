import { User, Subset, FindManyItemArgs } from '@prisma/client';
import _, { set, get } from 'lodash';

export const STRING_FILTERS = {
  note: ['text'],
  file: ['name', 'extension'],
  link: ['href', 'title', 'description'],
  googleContact: [
    'name',
    'email',
    'companyName',
    'companyTitle',
    'phoneNumber',
  ],
};

export interface Filter {
  name: string;
  value?: any;
  values?: any[];
}

export interface FilterQueryBuilderArgs {
  filters: Filter[];
  user: User;
}

export class FilterQueryBuilder {
  filters: Filter[];
  user: User;
  query: Subset<FindManyItemArgs, FindManyItemArgs>;
  where: any[];
  typeSpecificWhere: any;

  findManyArgs: Subset<FindManyItemArgs, FindManyItemArgs>;

  static itemSpecificFilters = {
    note: {
      type: 'note',
    },

    link: {
      type: 'link',
    },

    googleContact: {
      type: 'googleContact',
    },

    file: {
      type: 'file',
      file: {
        isUploaded: true,
        hasStartedUploading: true,
      },
    },
  };

  sets = {
    // Object.keys(FilterQueryBuilder.itemSpecificFilters)
    type: new Set<string>(),
    '-type': new Set<string>([]),

    label: new Set<string>(),
    '-label': new Set<string>(),

    status: new Set<string>(),
    '-status': new Set<string>(),

    search: new Set<string>(),
  };

  constructor({ filters, user }: FilterQueryBuilderArgs) {
    this.filters = filters || [];
    this.user = user;

    this.query = {};

    this.where = [];

    this.typeSpecificWhere = _.cloneDeep(
      FilterQueryBuilder.itemSpecificFilters,
    );

    this.findManyArgs = {};
  }

  generateStringFilter = (name: string, search: string) => {
    return [
      { [name]: { contains: search } },
      { [name]: { contains: _.toLower(search) } },
      { [name]: { contains: _.toUpper(search) } },
      { [name]: { contains: _.upperFirst(search) } },
      {
        [name]: {
          contains: search
            .split(' ')
            .map(_.upperFirst)
            .join(' '),
        },
      },
      {
        [name]: {
          contains: search
            .split(' ')
            .map(_.toLower)
            .join(' '),
        },
      },
      {
        [name]: {
          contains: search
            .split(' ')
            .map(_.toUpper)
            .join(' '),
        },
      },
    ];
  };

  getTrueValue = (value: string) => {
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  };

  getFindManyArgs = (): Subset<FindManyItemArgs, FindManyItemArgs> => {
    // Go through each filter and consolodate into -[name]|name unique sets
    this.filters.forEach(filter => {
      const values = filter.values ? filter.values : [filter.value];
      const shouldNegate = filter.name.startsWith('-');

      switch (filter.name) {
        case 'includesContacts':
          this.sets.type.add('googleContact');
          this.sets['-type'].delete('googleContact');

          break;

        case '-is':
        case 'is': {
          // { name: 'is', value: 'favorited' },
          // { name: '-is', value: 'done' },

          values.forEach(value => {
            switch (value) {
              case 'favorited':
                _.set(
                  this.query,
                  `isFavorited.${shouldNegate ? 'not' : 'equals'}`,
                  true,
                );
                break;

              case 'done':
              case 'not started':
              case 'in progress':
                // @ts-ignore
                this.sets[shouldNegate ? '-status' : 'status'].add(
                  // @ts-ignore
                  {
                    'not started': 'NOT_STARTED',
                    'in progress': 'IN_PROGRESS',
                    done: 'DONE',
                  }[value],
                );
                break;
            }
          });

          break;
        }

        default:
          values.forEach(value => {
            // @ts-ignore
            this.sets[filter.name].add(
              // @ts-ignore
              {
                contact: 'googleContact',
              }[value] || value,
            );

            if (filter.name === 'type' && value === 'contact') {
              this.sets['-type'].delete('googleContact');
            }
          });
      }
    });

    const filtersByField = {};

    // Organize each set into groups- so the in/not in will be in the same AND group.
    Object.entries(this.sets).forEach(([name, set]) => {
      const shouldNegate = name.startsWith('-');
      const field = name.replace('-', '');

      if (!set.size) return;

      switch (field) {
        case 'search':
          this.addSearchFilter([...set]);
          break;

        // Special case for array fields
        case 'label': {
          const operator = shouldNegate ? 'every.name.notIn' : 'some.name.in';
          // @ts-ignore
          filtersByField[field] = [
            // @ts-ignore
            ...(filtersByField[field] || []),
            _.set({}, `labels.${operator}`, [
              // @ts-ignore
              ..._.get(filtersByField[field], `labels.${operator}`, []),
              ...set,
            ]),
          ];
          break;
        }

        default: {
          const operator = shouldNegate ? 'not.in' : 'in';
          // @ts-ignore
          filtersByField[field] = [
            // @ts-ignore
            ...(filtersByField[field] || []),
            _.set({}, `${field}.${operator}`, [...set]),
          ];
        }
      }
    });

    Object.values(filtersByField).forEach(filter => {
      this.where.push({ AND: filter });
    });

    return {
      where: {
        ...this.query,
        deletedAt: null,
        user: { id: this.user.id },
        AND: [{ OR: Object.values(this.typeSpecificWhere) }, ...this.where],
      },
    };
  };

  addToItemSpecificOr = (type: string, newFilters: any[]) => {
    const existing = get(
      // @ts-ignore
      this.typeSpecificWhere[type],
      `${type}.OR`,
      [],
    );

    set(
      // @ts-ignore
      this.typeSpecificWhere[type],
      `${type}.OR`,
      [...existing, ...newFilters],
    );
  };

  addSearchFilter = (searchStrings: string[]) => {
    searchStrings.forEach(search => {
      // const words = search.split(' ').map((word: string) => word.trim());

      Object.keys(FilterQueryBuilder.itemSpecificFilters).forEach(type => {
        this.addToItemSpecificOr(
          type,
          // @ts-ignore
          STRING_FILTERS[type].reduce(
            (p: any[], fieldName: string) => [
              // { [name]: { contains: word } },
              ...p,
              ...this.generateStringFilter(fieldName, search),
            ],
            [],
          ),
        );
      });
    });
  };
}
