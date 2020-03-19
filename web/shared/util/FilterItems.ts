import _, { set, get } from 'lodash';
import { ItemFull } from '../graphql/__generated__/ItemFull';

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
  display?: string;
}

export interface FilterQueryBuilderArgs {
  filters: Filter[];
  user: User;
}

export class FilterQueryBuilder {
  filters: Filter[];
  where: any[];
  typeSpecificWhere: any;

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

  constructor({ filters }: FilterQueryBuilderArgs) {
    this.filters = filters || [];
  }

  getTrueValue = (value: string) => {
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  };

  getFilteredItems = (items: ItemFull[]) => {
    items.filter(item => {
      this.filters.forEach(filter => {
        let shouldKeep = true;

        const values = filter.values ? filter.values : [filter.value];
        const shouldNegate = filter.name.startsWith('-');

        switch (filter.name) {
          case 'relatedToItem':
            const relatedItem = item.items.find(
              ({ id }) => id === filter.value,
            );

            if (!relatedItem) return false;

            break;

          case '-is':
          case 'is': {
            values.forEach(value => {
              switch (value) {
                case 'favorited': {
                  const isEqual = item.isFavorited || shouldNegate;

                  if (!isEqual) {
                    return false;
                  }

                  break;
                }

                case 'done':
                case 'not started':
                case 'in progress': {
                  const isEqual = item.status === value;

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
    });
  };

  getSets = (): any => {
    // Go through each filter and consolodate into -[name]|name unique sets

    return this.sets;
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
