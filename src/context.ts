import { PrismaClient } from '@prisma/client'
import { PubSub } from 'graphql-yoga'
import { ContextParameters } from 'graphql-yoga/dist/types'

const prisma = new PrismaClient()
const pubsub = new PubSub()

export interface Context {
  prisma: PrismaClient
  req: ContextParameters
  pubsub: PubSub
}

export default (req: ContextParameters): Context => {
  return {
    prisma,
    req,
    pubsub,
  }
}
