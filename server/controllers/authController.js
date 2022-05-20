// TODO : REGISTER USER
import {
  createUser,
  emailExists,
  usernameExists,
  searchByUsername,
  findUserByJWT,
} from "../models/authModel.js";

import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import jwt from "jsonwebtoken";

const {
  JWT_SECRET,
  JWT_EXPIRATION,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRATION,
} = process.env;

// ! encrypting password
export function hash(password) {
  const salt = randomBytes(16).toString("hex");
  const hashedPassword = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hashedPassword}`;
}

// TODO : REGISTER USER

export async function registerUser(req, res) {
  const user = req.body;

  // check valid input
  if (!user || !user.username || !user.password || !user.email) {
    return res.status(400).json({ message: "invalid or missing data" });
  }

  // check for existing username
  const username = await usernameExists(user.username);

  if (username.length > 0) {
    return res.status(406).send({ message: "username is taken" });
  }

  // check for existing email
  const email = await emailExists(user.email);

  if (email.length > 0) {
    return res.status(406).send({ message: "email is already used" });
  }

  // hashing password
  user.password = hash(user.password);

  // creating user
  const userData = await createUser(user);

  return res.status(200).json({ userData });
}

// TODO : SIGN IN USER

function verify(password, hash) {
  const [salt, key] = hash.split(":");
  const passwordBuffer = scryptSync(password, salt, 64);
  const keyBuffer = Buffer.from(key, "hex");
  const match = timingSafeEqual(passwordBuffer, keyBuffer);

  return match;
}

export async function loginUser(req, res) {
  const user = req.body;

  if (!user || !user.username || !user.password)
    return res.status(400).json({ error: "missing info" });

  // get user from db
  const dbUser = await searchByUsername(user.username);

  // check password
  if (!verify(user.password, dbUser.password))
    return res.status(403).json({ error: "wrong username or password" });

  // sign jwt

  const id = dbUser._id.toString();

  const token = jwt.sign({ id: id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION,
  });

  // create refresh token
  const refreshToken = jwt.sign({ id: id }, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRATION,
  });

  // save refresh token in db
  dbUser.refreshToken = refreshToken;
  await dbUser.save();

  /*
	degub jwt and refresh token
  console.table({
    jwt: token.split(".")[2],
    refresh: refreshToken.split(".")[2],
  });
	*/
  return res
    .status(200)
    .cookie("access_token", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    })
    .json({ jwt: token });
}

// TODO : LOGOUT USER
export async function logoutUser(req, res) {
  const refreshToken = req.cookies?.access_token;
  if (!refreshToken) return res.status(204);

  // no user with such refresh token
  const foundUser = await findUserByJWT(jwt);
  if (!foundUser) {
    res.clearCookie("access_token");
    return res.status(204);
  }

  // !remove token from db
  foundUser.refreshToken = "";
  await foundUser.save();

  return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out" });
}

// TODO : REFRESH TOKEN
export async function refreshToken(req, res) {
  // check if refresh token in cookies
  const refreshToken = req.cookies?.access_token;

  // check if user exists in db
  const foundUser = await findUserByJWT(refreshToken);
  if (!foundUser)
    return res.status(403).json({ error: "no user with such token" });

  const userId = foundUser._id.toString();

  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded) => {
    // check if client id is not equal to user id in db (prevent identity hijacking)
    if (err || userId !== decoded.id)
      return res.status(403).json("invalid or unauthorized");

    // return new a signed token
    const token = jwt.sign({ id: userId }, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION,
    });

    return res.json({ jwt: token });
  });
}
