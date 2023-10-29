import { Person } from "../models/Persons.js";
import { createUsers } from "./users.js";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";

export const createUserAndPerson = async (req, res) => {
  try {
    const { password, email, phone_number, national_id, name, last_name } =
      req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({
      password: hashedPassword,
      email,
      phone_number,
    });

    const newPerson = await Person.create({
      userId: newUser.id,
      national_id,
      name,
      last_name,
    });
    res.status(201).json({ message: "User and person created!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updatePerson = async (req, res) => {
  try {
    const { id } = req.params;
    const { national_id, name, last_name } = req.body;
    const person = await Person.findByPk(id);
    person.national_id = national_id;
    person.name = name;
    person.last_name = last_name;
    await person.save();
    res.status(200).json({ message: "Person updated", person });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deletePerson = async (req, res) => {
  const { id } = req.params;
  try {
    await Person.destroy({
      where: { id },
    });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
