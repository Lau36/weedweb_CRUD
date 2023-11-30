import {
  tokenSignAccess,
  tokenSignRefresh,
  verifyRefreshToken,
} from "../helpers/generateToken.js";
import { User } from "../models/User.js";
import { TokenDB } from "../models/Tokens.js";
import bcrypt, { compare } from "bcrypt";

export async function signIn(req, res) {
  console.log("entrando");
  const { password, email } = req.body;
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "No such user found" });
    }

    const isMatch = bcrypt.compareSync(password, user.password);

    if (isMatch) {
      const tokenSessionAccess = await tokenSignAccess(user);
      const tokenSessionRefresh = await tokenSignRefresh(user);
      const emailUser = await user.email;
      return res.status(201).json({
        message: "SignIn successful",
        tokenSessionAccess,
        tokenSessionRefresh,
        emailUser,
      });
    } else {
      return res.status(403).json({ message: "Credentials incorrect" });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export const tokenRefresh = async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ message: "Token must be provided" });
  }

  const tokenBuscado = await TokenDB.findOne({
    where: { tokenRefresh: token },
  });

  if (tokenBuscado) {
    return res.status(400).json({ message: "Bad token" });
  }

  try {
    let user;
    const tokenVerified = await verifyRefreshToken(token);
    const { userId } = tokenVerified;
    user = await User.findByPk(userId);
    const tokenSessionAccess = await tokenSignAccess(user);
    const tokenSessionRefresh = await tokenSignRefresh(user);
    res
      .status(201)
      .json({ message: "OK", tokenSessionAccess, tokenSessionRefresh });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export async function logout(req, res) {
  const { token } = req.body;
  if (!token) {
    return res.status(403).send("Token not provider");
  }
  try {
    const alreadyExist = await TokenDB.findByPk(token);
    if (alreadyExist) {
      res.status(400).json({ message: "Token in blacklist" });
    } else {
      const savedToken = await TokenDB.create({ tokenRefresh: token });
      if (savedToken) {
        res.status(200).json({ message: "Token saved", token });
      }
    }
  } catch (error) {
    res.status(400).json({ message: "Something goes worng", error });
  }
}
