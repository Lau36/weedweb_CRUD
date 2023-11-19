import { Company } from "../models/Company.js";
import { verifyAccessToken } from "../helpers/generateToken.js";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";

export const createCompany = async (req, res) => {
  try {
    const { password, email, phone_number, username, nit, company_name } =
      req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({
      password: hashedPassword,
      email,
      phone_number,
      username,
    });
    const newCompany = await Company.create({
      userId: newUser.id,
      nit,
      company_name,
    });
    res.status(201).json({
      message: "User and company created!",
      newCompany,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return res.status(403).send("Invalid or missing Authorization header");
    }
    const token = authorizationHeader.split(" ")[1];
    if (!token) {
      return res.status(403).send("Token not provider");
    }
    const tokenSession = await verifyAccessToken(token);
    if (!tokenSession) {
      return res.status(402).send("Invalid token");
    }
    const { userId } = tokenSession;
    if (id != userId) {
      return res.status(500).json({ message: "You don't have permissions" });
    }

    const { email, phone_number, username, company_name } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(400).json({ message: "This user doesn't exist" });
    }

    const company = await Company.findByPk(id);
    if (!company) {
      return res.status(400).json({ message: "This company doesn't exist" });
    }

    // Actualizar los datos
    user.email = email;
    user.phone_number = phone_number;
    user.username = username;
    await user.save();

    company.company_name = company_name;
    await company.save();

    res.status(200).json({ message: "Company updated", company });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// export const updateCompany = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { token } = req.headers;
//     const tokenSession = await verifyAccessToken(token);
//     const { userId } = tokenSession;
//     if (id == userId) {
//       const { email, phone_number, company_name } = req.body;
//       const user = await User.findByPk(id);
//       if (user) {
//         const company = await Company.findByPk(id);
//         if (company) {
//           user.email = email;
//           user.phone_number = phone_number;
//           await user.save();
//           company.company_name = company_name;
//           await company.save();
//           res.status(200).json({ message: "Company updated", company });
//         } else {
//           res.status(400).json({ message: "This company doesn´t exits" });
//         }
//         res.status(400).json({ message: "This user doesn´t exits" });
//       }
//     } else {
//       res.status(500).json({ message: "you don´t have permits" });
//     }
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };
