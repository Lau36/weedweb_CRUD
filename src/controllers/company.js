import { Company } from "../models/Company.js";
import { verifyAccessToken } from "../helpers/generateToken.js";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";

export const createCompany = async (req, res) => {
  try {
    const { password, email, phone_number, nit, company_name } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({
      password: hashedPassword,
      email,
      phone_number,
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
    const { token } = req.headers;
    const tokenSession = await verifyAccessToken(token);
    const { userId } = tokenSession;
    if (id == userId) {
      const { email, phone_number, company_name } = req.body;
      const user = await User.findByPk(id);
      if (user) {
        const company = await Company.findByPk(id);
        if (company) {
          user.email = email;
          user.phone_number = phone_number;
          await user.save();
          company.company_name = company_name;
          await company.save();
          res.status(200).json({ message: "Person updated", company });
        } else {
          res.status(400).json({ message: "This person doesn´t exits" });
        }
        res.status(400).json({ message: "This user doesn´t exits" });
      }
    } else {
      res.status(500).json({ message: "you don´t have permits" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    await Company.destroy({
      where: {
        id,
      },
    });
    res.status(200).json({ message: "Company deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
