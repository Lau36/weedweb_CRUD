import { Person } from "../models/Persons.js";
import { verifyAccessToken } from "../helpers/generateToken.js";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";

export const createPerson = async (req, res) => {
  try {
    const {
      password,
      email,
      phone_number,
      username,
      national_id,
      name,
      last_name,
    } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({
      password: hashedPassword,
      email,
      phone_number,
      username,
    });

    const newPerson = await Person.create({
      userId: newUser.id,
      national_id,
      name,
      last_name,
    });
    res.status(201).json({ message: "User and person created!", newPerson });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updatePerson = async (req, res) => {
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

    const { email, phone_number, username, name, last_name } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(400).json({ message: "This user doesn't exist" });
    }

    const person = await Person.findByPk(id);
    if (!person) {
      return res.status(400).json({ message: "This person doesn't exist" });
    }

    // Actualizar los datos
    user.email = email;
    user.phone_number = phone_number;
    user.username = username;
    await user.save();

    person.name = name;
    person.last_name = last_name;
    await person.save();

    res.status(200).json({ message: "Person updated", person });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
