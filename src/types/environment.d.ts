export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_USER: string
      MONGO_PASSWORD: string
      MONGO_HOST: string
      MONGO_DBNAME: string
      PORT?: number
      HOST?: string
      JWT_SECRET: string
      COOKIE_SECRET: string
      PUBLIC_KEY: string
      PRIVATE_KEY: string
      NODE_ENV: "development" | "production" | "docker"
      ACCESS_TOKEN_TTL: string
    }
  }
}
