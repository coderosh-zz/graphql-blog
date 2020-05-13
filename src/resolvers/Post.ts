import { Context } from '../context'

const Post = {
  async author(parent: any, args: any, ctx: Context) {
    return await ctx.prisma.users.findOne({
      where: {
        id: parent.author,
      },
    })
  },
}

export default Post
