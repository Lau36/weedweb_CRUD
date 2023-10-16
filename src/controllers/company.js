import { Company } from "../models/Company.js";
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
    res
      .status(201)
      .json({ message: "User and company created!", newUser, newCompany });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCompany = (req, res) => {
  res.send("getting company");
};

export const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll({
      atributes: ["id", "nit", "company_name", "userID"],
    });
    res.json(companies);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const { nit, company_name } = req.body;
    const company = await Company.findByPk(id);
    person.nit = nit;
    person.company_name = company_name;
    await company.save();
    res.status(200).json({ message: "Person updated", company });
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
