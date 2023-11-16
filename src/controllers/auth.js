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
      return res.status(201).json({
        message: "SignIn successful",
        tokenSessionAccess,
        tokenSessionRefresh,
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
  const { token } = req.headers;
  const tokenBuscado = await TokenDB.findOne({
    where: { tokenRefresh: token },
  });
  if (!tokenBuscado) {
    if (!token) {
      res.status(400).json({ message: "Something goes worng" });
      console.log("toy aca");
    }
    let user;
    try {
      const tokenVerified = await verifyRefreshToken(token);
      const { userId } = tokenVerified;
      user = await User.findByPk(userId);
    } catch (error) {
      res.status(400).json({ message: "Something goes worng", error });
    }
    const newAccessToken = await tokenSignAccess(user);
    const newRefreshToken = await tokenSignRefresh(user);
    res.status(201).json({ message: "OK", newAccessToken, newRefreshToken });
  } else {
    res.status(400).json({ message: "bad token" });
  }
};

export async function logout(req, res) {
  const { token } = req.headers;
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
