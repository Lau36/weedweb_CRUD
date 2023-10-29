import { verifyAccessToken } from "../helpers/generateToken.js";

export const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ").pop(); //bearer token
    const tokenData = await verifyAccessToken(token);
    console.log(tokenData);
    if (tokenData.userId) {
      next(); //Para seguir con el flujo de la peticion
    } else {
      res.status(400).json({ message: "Token must be provided" });
    }
  } catch (error) {
    res.status(400).json({ message: "Token must be provided", error });
  }
};
