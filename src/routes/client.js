const { Router } = require("express");
person_route = Router();
import {
  createPerson,
  updatePerson,
  deleteUser,
  getUser,
} from "../controllers";

person_route.post("singup/person", async (req, res) => {
  console.log("signin endpoint");
  try {
    const { national_id, name, lastName, email, phoneNumber, password } =
      req.body;
    const person = await createPerson(
      national_id,
      name,
      lastName,
      email,
      phoneNumber,
      password
    );
    if (person) {
      res.status(201).json({ message: "Succcessful registred person", person });
    }
  } catch (error) {
    res.status(400).json({ message: "Wrong arguments" });
    console.log("this is the error", error);
  }
});
