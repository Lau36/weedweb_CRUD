const { Router } = require("express");
comapny_route = Router();
import {
  createCompany,
  updateCompany,
  deleteUser,
  getUser,
} from "../controllers";

//SIGNUP
comapny_route.post("/singup/company", async (req, res) => {
  console.log("signin endpoint");
  try {
    const { nit, companyName, email, phoneNumber, password } = req.body;
    const company = await createCompany(
      nit,
      companyName,
      email,
      phoneNumber,
      password
    );
    if (company) {
      res
        .status(201)
        .json({ message: "Succcessful registred company", company });
    }
  } catch (error) {
    res.status(400).json({ message: "Wrong arguments" });
    console.log("this is the error", error);
  }
});
