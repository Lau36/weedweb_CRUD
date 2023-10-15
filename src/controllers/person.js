import { Person } from "../models/Persons.js";
import { createUsers } from "./users.js";

export const createPerson = async (req, res) => {
  //   try {
  //     const { national_id, name, last_name, userId } = req.body;
  //     const user = await createUsers(password, email, phone_number);
  //     if (user) {
  //       const newPerson = await Person.create({
  //         userId: user.id,
  //         national_id,
  //         name,
  //         last_name,
  //       });
  //       res.json(newPerson);
  //     }
  //     const newPerson = await Person.create({
  //       userId,
  //       national_id,
  //       name,
  //       last_name,
  //     });
  //     res.json(newPerson);
  //   } catch (error) {
  //     return res.status(500).json({ message: error.message });
  //   }

  try {
    const { national_id, name, last_name, userId } = req.body;
    const newPerson = await Person.create({
      userId,
      national_id,
      name,
      last_name,
    });
    res.json(newPerson);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllPersons = async (req, res) => {
  try {
    const persons = await Person.findAll({
      atributes: ["id", "national_id", "name", "last_name", "userID"],
    });
    res.json(persons);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
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
