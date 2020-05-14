import { ContextParameters } from 'graphql-yoga/dist/types'
import { verifyToken, verifyRefresh, generateToken } from './jwt'

interface tokenDecoded {
  iat: Number
  exp: Number
  id: string
}

const getUserId = (request: ContextParameters): number => {
  const header = request.request.headers.authorization
  if (!header) {
    throw new Error('You are not authorized')
  }
  const token = header.replace('Bearer ', '')
  const decoded: tokenDecoded = verifyToken(token) as tokenDecoded
  return +decoded.id
}

const onValidRefresh = (token: string) => {
  const decoded: tokenDecoded = verifyRefresh(token) as tokenDecoded

  const newToken: string = generateToken(decoded.id)

  return {
    newToken,
    id: decoded.id,
  }
}

export { getUserId, onValidRefresh }
