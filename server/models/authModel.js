import User from "./authMongo.js";

export async function createUser(userObj) {
  return await User.create({
    username: userObj.username,
    password: userObj.password,
    email: userObj.email,
  });
}

export async function usernameExists(username) {
  return await User.find({ username: username });
}

export async function emailExists(email) {
  return await User.find({ email: email });
}

export async function searchByUsername(username) {
  return await User.findOne({ username: username }, { __v: 0 });
}
