import { GraphQLServer } from 'graphql-yoga'
import createContext from './context'

import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import User from './resolvers/User'
import Post from './resolvers/Post'

const resolvers = {
  Query,
  Mutation,
  User,
  Post,
}

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context: createContext(),
})

server.start(() => {
  console.log(`Server is started`)
})
