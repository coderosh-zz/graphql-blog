import { Context } from '../context'

const Query = {
  async users(parent: any, args: any, ctx: Context) {
    return await ctx.prisma.users.findMany({
      where: {
        OR: [
          {
            name: {
              contains: args.query,
            },
          },
          {
            email: {
              contains: args.query,
            },
          },
        ],
      },
    })
  },

  async posts(parent: any, args: any, ctx: Context) {
    return await ctx.prisma.posts.findMany({
      where: {
        OR: [
          {
            title: {
              contains: args.query,
            },
          },
          {
            body: {
              contains: args.query,
            },
          },
        ],
      },
    })
  },
}

export default Query
