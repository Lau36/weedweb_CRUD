import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

export const tokenSignAccess = async (user) => {
  return jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "60s",
  });
};

export const tokenSignRefresh = async (user) => {
  return jwt.sign({ userId: user.id }, process.env.JWT_SECRET_REFRESH, {
    expiresIn: "3600s",
  });
};

export const verifyRefreshToken = async (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET_REFRESH);
  } catch (error) {
    throw error;
  }
};

export const verifyAccessToken = async (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw error;
  }
};
