import JWT from "jsonwebtoken"

const PRIVATE_KEY = process.env.PRIVATE_KEY as string
const privateKey = Buffer.from(PRIVATE_KEY, "base64").toString("ascii")

const PUBLIC_KEY = process.env.PUBLIC_KEY as string
const publicKey = Buffer.from(PUBLIC_KEY, "base64").toString("ascii")

export function sign(payload: any, options?: JWT.SignOptions) {
  return JWT.sign(payload, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  })
}
export function verify(token: string) {
  try {
    const decoded = JWT.verify(token, publicKey)

    return { valid: true, expired: false, decoded }
  } catch (err) {
    return {
      valid: false,
      expired: err.message === "jwt is expired",
      decoded: null,
    }
  }
}

export default {
  sign,
  verify,
}
