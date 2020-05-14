import { Context } from '../context'
import { getUserId } from '../utils/decode'

const Query = {
  async users(parent: any, args: any, ctx: Context, info: any) {
    let queryArgs = {}

    if (args.query) {
      queryArgs = {
        ...queryArgs,
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
      }
    }

    if (args.first) {
      queryArgs = { ...queryArgs, first: args.first }
    }

    if (args.skip) {
      queryArgs = { ...queryArgs, skip: args.skip }
    }

    return await ctx.prisma.users.findMany({
      ...queryArgs,
    })
  },

  async posts(parent: any, args: any, ctx: Context) {
    let queryArgs = {}

    if (args.query) {
      queryArgs = {
        ...queryArgs,
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
      }
    }

    if (args.first) {
      queryArgs = { ...queryArgs, first: args.first }
    }

    if (args.skip) {
      queryArgs = { ...queryArgs, skip: args.skip }
    }

    return await ctx.prisma.posts.findMany({
      ...queryArgs,
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
