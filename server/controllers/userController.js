import { searchUserbyID } from "../models/userModel.js";

export async function getProfileInfo(req, res) {
  const id = req.userID;

  const user = await searchUserbyID(id);

  if (!user) return res.status(200).redirect("/login");

  res.status(200).json({ user });
}
