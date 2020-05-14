import { Context } from '../context'

const Subscription = {
  post: {
    subscribe(parent: any, args: any, ctx: Context) {
      return ctx.pubsub.asyncIterator('post')
    },
  },
}

export default Subscription
