import { PrismaClient } from '@prisma/client'
import { ContextParameters } from 'graphql-yoga/dist/types'

const prisma = new PrismaClient()

export interface Context {
  prisma: PrismaClient
  req: ContextParameters
}

export default (req: ContextParameters): Context => {
  return {
    prisma,
    req,
  }
}
