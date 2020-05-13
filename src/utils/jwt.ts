import { sign } from 'jsonwebtoken'

const tokenSecret = process.env.JWT_SECRET || 'jwtsecret'
const tokenExpiry = process.env.JWT_EXPIRE || '15m'

const generateToken = (id: string) => {
  return sign({ id }, tokenSecret, {
    expiresIn: tokenExpiry.toString(),
  })
}

const verifyToken = (token: string) => {}

export { generateToken }
