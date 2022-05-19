// TODO : REGISTER USER
import {
  createUser,
  emailExists,
  usernameExists,
  searchByUsername,
} from "../models/authModel.js";

import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const { JWT_SECRET } = process.env;

// ! encrypting password
export function hash(password) {
  const salt = randomBytes(16).toString("hex");
  const hashedPassword = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hashedPassword}`;
}

export async function registerUser(req, res) {
  const user = req.body;

  // check valid input
  if (!user || !user.username || !user.password || !user.email) {
    return res.status(404).json({ message: "invalid or missing data" });
  }

  // check for existing username
  const username = await usernameExists(user.username);

  if (username.length > 0) {
    return res.status(404).send({ message: "username is taken" });
  }

  // check for existing email
  const email = await emailExists(user.email);

  if (email.length > 0) {
    return res.status(404).send({ message: "email is already used" });
  }

  // hashing password
  user.password = hash(user.password);
  // creating user
  const userData = await createUser(user);

  // creating token
  const id = userData._id.toString();

  const token = jwt.sign({ id }, JWT_SECRET, { expiresIn: "1h" });

  return res.cookie("access_token", token).status(200).json({ token: token });
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
    return res.json({ message: "missing info" });

  // get user from db
  const dbUser = await searchByUsername(user.username);

  // check password
  if (!verify(user.password, dbUser.password))
    return res.json({ message: "wrong username or password" });

  // sign jwt

  const id = dbUser._id.toString();

  const token = jwt.sign({ id: id }, JWT_SECRET, { expiresIn: "1h" });

  return res
    .status(200)
    .cookie("access_token", token)
    .json({ message: "login success" });
}

// TODO : LOGOUT USER
export function logoutUser(req, res) {
  return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out" });
}
93903416;
