// @flow
/*::
import * as generated from '../__generated__/api.graphql'
*/

// Note info argument enables subqueries.
// https://www.prisma.io/blog/graphql-server-basics-demystifying-the-info-argument-in-graphql-resolvers-6f26249f613a/

const Query /*: generated.Query */ = {
  me: async (args, info, { userId, db }) => {
    if (userId == null) return null;
    return db.query.user({ where: { id: userId } }, info);
  },

  // It returns Relay connection, which should be general, imho.
  webs: async (args, info, { userId, db }) => {
    if (userId == null) return null;
    return db.query.websConnection(
      {
        where: { creator: { id: userId } },
        orderBy: 'updatedAt_ASC',
        first: args.first,
      },
      info,
    );
  },

  page: async (args, info, { db }) => {
    return db.query.page({ where: { id: args.id } }, info);
  },

  web: async (args, info, { db }) => {
    return db.query.web({ where: { id: args.id } }, info);
  },
};

export default Query;
