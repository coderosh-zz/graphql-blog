import { hash, compare } from 'bcryptjs'

import { Context } from '../context'
import { generateToken } from '../utils/jwt'

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
    }
  },

  async deleteUser(parent: any, args: any, ctx: Context) {
    return await ctx.prisma.users.delete({
      where: {
        id: +args.id,
      },
    })
  },

  async updateUser(parent: any, args: any, ctx: Context) {
    return await ctx.prisma.users.update({
      where: {
        id: +args.id,
      },
      data: {
        ...args.data,
      },
    })
  },

  async createPost(parent: any, args: any, ctx: Context) {
    return await ctx.prisma.posts.create({
      data: {
        body: args.data.body,
        title: args.data.title,
        user: {
          connect: {
            id: +args.data.author,
          },
        },
      },
    })
  },

  async deletePost(parent: any, args: any, ctx: Context) {
    return await ctx.prisma.posts.delete({
      where: {
        id: args.id,
      },
    })
  },

  async updatePost(parent: any, args: any, ctx: Context) {
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
