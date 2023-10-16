import { Company } from "../models/Company.js";
import { Person } from "../models/Persons.js";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";

export const createUsers = async (req, res) => {
  try {
    const { password, email, phone_number } = req.body;
    const existingUser = await User.findOne({
      where: { email: email },
    });
    if (existingUser) {
      // Si ya existe un usuario con el mismo email, devuelve un error
      return res.status(400).json({ message: "El email ya está en uso." });
    } else {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newUser = await User.create({
        password: hashedPassword,
        email,
        phone_number,
      });
      res.status(201).json({ message: "User created!", newUser });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      atributes: ["id", "password", "email", "phone_number"],
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export async function signIn(req, res) {
  const { password, email } = req.body;
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (user) {
      const isMatch = bcrypt.compareSync(password, user?.password);
      if (isMatch) {
        res.status(201).json({ message: "SignIn succesfull", user });
      } else {
        res.status(403).json({ message: "Credentials incorrect" });
      }
    } else {
      res.status(404).json({ message: "No such user found" });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function getUSER(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findOne({
      where: {
        id,
      },
    });
    if (user) {
      const person = await Person.findByPk(id);
      if (person) {
        res
          .status(201)
          .json({ message: "This is the user person", user, person });
      } else {
        const company = await Company.findByPk(id);
        if (company) {
          res
            .status(201)
            .json({ message: "This is the user company", user, company });
        } else {
          res.status(404).json({ message: "This user do not exist" });
        }
      }
    } else {
      res.status(404).json({ message: "No such user found" });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({
      where: {
        id,
      },
    });
    if (user) {
      const person = await Person.findByPk(id);
      if (person) {
        await Person.destroy({
          where: {
            userId: id,
          },
        });
      } else {
        const company = await Company.findByPk(id);
        if (company) {
          await Company.destroy({
            where: {
              userId: id,
            },
          });
        } else {
          res.status(404).json({ message: "User not found" });
        }
      }
      await User.destroy({
        where: {
          id,
        },
      });
    } else {
      res.status(404).json({ message: "No such user found" });
    }
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { password, email, phone_number } = req.body;

    const user = await User.findByPk(id);
    user.password = password;
    user.email = email;
    user.phone_number = phone_number;
    await user.save();
    res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export async function deleteUserCompany(req, res) {
  const { id } = req.params;
  try {
    await Company.destroy({
      where: {
        userId: id,
      },
    });
    await User.destroy({
      where: {
        id,
      },
    });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
