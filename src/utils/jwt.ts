import { sign, verify } from 'jsonwebtoken'

const tokenSecret = process.env.JWT_SECRET || 'jwtsecret'
const tokenExpiry = process.env.JWT_EXPIRE || '1m'

const refreshSecret = process.env.REFRESH_SECRET || 'refreshsecret'
const refreshExpiry = process.env.REFRESH_EXPIRE || '30d'

const generateToken = (id: string) => {
  return sign({ id }, tokenSecret, {
    expiresIn: tokenExpiry,
  })
}

const verifyToken = (token: string) => {
  return verify(token, tokenSecret)
}

const generateRefreshToken = (id: string) => {
  return sign({ id }, refreshSecret, {
    expiresIn: refreshExpiry,
  })
}

const verifyRefresh = (token: string) => {
  return verify(token, refreshSecret)
}

export { generateToken, verifyToken, generateRefreshToken, verifyRefresh }
