import { Context } from '../context'
import getUserId from '../utils/getUserId'

const Query = {
  async users(parent: any, args: any, ctx: Context, info: any) {
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

  async post(parent: any, args: any, ctx: Context) {
    const post = await ctx.prisma.posts.findOne({
      where: {
        id: +args.id,
      },
    })

    if (!post) {
      throw new Error('Post not found')
    }

    return post
  },

  async user(parent: any, args: any, ctx: Context) {
    const user = await ctx.prisma.users.findOne({
      where: {
        id: +args.id,
      },
    })

    if (!user) {
      throw new Error('User not found')
    }

    return user
  },

  async me(parent: any, args: any, ctx: Context) {
    const userId = getUserId(ctx.req)

    return ctx.prisma.users.findOne({
      where: {
        id: userId,
      },
    })
  },
}

export default Query
