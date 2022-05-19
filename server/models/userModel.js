import User from "../models/authMongo.js";

export async function searchUserbyID(id) {
  return await User.findById(id, { _id: 0, __v: 0, password: 0 });
}
