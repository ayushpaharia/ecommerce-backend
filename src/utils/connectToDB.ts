import { connect, ConnectOptions } from "mongoose"

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions

const { MONGO_USER, MONGO_PASSWORD, MONGO_DBNAME, MONGO_HOST } = process.env

const dbURI =
  process.env.NODE_ENV === "production"
    ? `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:27017/${MONGO_DBNAME}?retryWrites=true&w=majority`
    : process.env.NODE_ENV === "docker"
    ? `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@127.0.0.1:2717/hybridDB` // if you're running docker mongoDB and Normal App
    : "mongodb://localhost:27017/hybridDB"

const connectToDB = () => {
  connect(dbURI, options)
    .then(() => {
      console.log(`🌲 Connected to MongoDB - ${process.env.NODE_ENV}`)
    })
    .catch((e) => {
      console.log("Connection Error")
      console.log(e)
    })
}

export default connectToDB
