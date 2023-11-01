import jwt from "jsonwebtoken";

export const tokenSignAccess = async (user) => {
  return jwt.sign({ userId: user.id }, "12262331", {
    expiresIn: "60s",
  });
};

export const tokenSignRefresh = async (user) => {
  return jwt.sign({ userId: user.id }, "1226", {
    expiresIn: "3600s",
  });
};

export const verifyRefreshToken = async (token) => {
  try {
    return jwt.verify(token, "1226");
  } catch (error) {
    throw error;
  }
};

export const verifyAccessToken = async (token) => {
  try {
    return jwt.verify(token, "12262331");
  } catch (error) {
    throw error;
  }
};
