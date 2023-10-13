import { Company } from "../models/Company.js";

export const getCompany = (req, res) => {
  res.send("getting company");
};

export const createCompany = async (req, res) => {
  try {
    const { nit, company_name } = req.body;
    const newCompany = await Company.create({
      nit,
      company_name,
    });
    console.log(newCompany);
    res.send("creating Company");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  //   console.log(req.body);
  //   res.send("creating company");
};

export const deleteCompany = (req, res) => {
  res.send("deleting company");
};

export const updateCompany = (req, res) => {
  res.send("updating company");
};
