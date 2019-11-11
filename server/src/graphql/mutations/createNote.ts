// import { extendType, stringArg } from 'nexus';
// // @ts-ignore
// import grabity from 'grabity';

// import { Note } from '../types/entities/Note';

// export const createLink = extendType({
//   type: 'Mutation',
//   definition(t) {
//     t.field('createLink', {
//       type: Note,
//       args: {
//         href: stringArg({ required: true }),
//       },
//       resolve: async (root, args, ctx) => {
//         if (!ctx.user) throw new Error('Whoops, not authorized');

//         const { title, description, image, favicon } = await grabity.grabIt(
//           args.href,
//         );

//         const item = await ctx.photon.items.create({
//           data: {
//             type: 'link',
//             user: { connect: { id: ctx.user.id } },
//           },
//         });

//         const link = await ctx.photon.links.create({
//           data: {
//             href: args.href,
//             notes: '',
//             title,
//             description,
//             image,
//             favicon,
//             item: { connect: { id: item.id } },
//             user: { connect: { id: ctx.user.id } },
//           },
//         });

//         console.log(link);

//         return link;
//       },
//     });
//   },
// });
