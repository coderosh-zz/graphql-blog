import { Context } from '../context'

const Mutation = {
  async createUser(parent: any, args: any, ctx: Context) {
    return await ctx.prisma.users.create({
      data: {
        email: args.data.email,
        name: args.data.name,
        age: args.data.age,
      },
    })
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
