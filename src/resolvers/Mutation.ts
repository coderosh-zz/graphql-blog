import { hash, compare } from 'bcryptjs'

import { Context } from '../context'
import { generateToken, generateRefreshToken } from '../utils/jwt'
import { getUserId, onValidRefresh } from '../utils/decode'

const Mutation = {
  async createUser(parent: any, args: any, ctx: Context) {
    const password = await hash(args.data.password, 10)
    const user = await ctx.prisma.users.create({
      data: {
        ...args.data,
        password,
      },
    })

    return {
      user,
      token: generateToken(`${user.id}`),
      refresh: generateRefreshToken(`${user.id}`),
    }
  },

  async login(parent: any, args: any, ctx: Context) {
    const user = await ctx.prisma.users.findOne({
      where: {
        email: args.data.email,
      },
    })

    if (!user) {
      throw new Error('Invalid Credentials')
    }

    const isMatch = await compare(args.data.password, user.password)

    if (!isMatch) {
      throw new Error('Invalid Credentials')
    }

    return {
      user,
      token: generateToken(`${user.id}`),
      refresh: generateRefreshToken(`${user.id}`),
    }
  },

  async deleteUser(parent: any, args: any, ctx: Context) {
    const userId = getUserId(ctx.req)

    return await ctx.prisma.users.delete({
      where: {
        id: userId,
      },
    })
  },

  async updateUser(parent: any, args: any, ctx: Context) {
    const userId = getUserId(ctx.req)

    return await ctx.prisma.users.update({
      where: {
        id: userId,
      },
      data: {
        ...args.data,
      },
    })
  },

  async refreshToken(parent: any, args: any, ctx: Context) {
    const decoded = onValidRefresh(args.token)

    const user = await ctx.prisma.users.findOne({
      where: {
        id: +decoded.id,
      },
    })

    return {
      token: decoded.newToken,
      user,
    }
  },

  async createPost(parent: any, args: any, ctx: Context) {
    const userId = getUserId(ctx.req)
    console.log(userId)

    return await ctx.prisma.posts.create({
      data: {
        body: args.data.body,
        title: args.data.title,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    })
  },

  async deletePost(parent: any, args: any, ctx: Context) {
    const userId = getUserId(ctx.req)

    const post = await ctx.prisma.posts.findOne({
      where: {
        id: args.id,
      },
    })

    if (!post || post.author !== userId) {
      throw new Error('Post not found')
    }

    return await ctx.prisma.posts.delete({
      where: {
        id: args.id,
      },
    })
  },

  async updatePost(parent: any, args: any, ctx: Context) {
    const userId = getUserId(ctx.req)

    const post = await ctx.prisma.posts.findOne({
      where: {
        id: args.id,
      },
    })

    if (!post || post.author !== userId) {
      throw new Error('Post not found')
    }

    return await ctx.prisma.posts.update({
      where: {
        id: +args.id,
      },
      data: {
        ...args.data,
      },
    })
  },
}

export default Mutation
