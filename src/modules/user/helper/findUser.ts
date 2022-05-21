import User, { UserDocument } from "@user/models/User.model"

export async function findUser(email: string) {
  try {
    return (await User.findOne({ email })) as UserDocument | null
  } catch (err) {
    throw new Error(err)
  }
}

export async function findUserByID(id: string) {
  try {
    return (await User.findById(id)) as UserDocument | null
  } catch (err) {
    throw new Error(err)
  }
}

export async function findUserByName(name: string) {
  try {
    return (await User.findOne({ name })) as UserDocument | null
  } catch (err) {
    throw new Error(err)
  }
}
