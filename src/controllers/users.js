import { verifyAccessToken } from "../helpers/generateToken.js";
import { Company } from "../models/Company.js";
import { Person } from "../models/Persons.js";
import { User } from "../models/User.js";
import bcrypt, { compare } from "bcrypt";

export const createUsers = async (req, res) => {
  try {
    const { password, email, phone_number } = req.body;
    const existingUser = await User.findOne({
      where: { email: email },
    });
    if (existingUser) {
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

export async function getUSER(req, res) {
  const { id } = req.params;
  const { token } = req.headers;
  if (!token) {
    return res.status(403).send("Token not provider");
  }
  const tokenSession = await verifyAccessToken(token);
  if (!tokenSession) {
    return res.status(402).send("Invalid token");
  }
  const { userId } = tokenSession;
  if (id != userId) {
    return res.status(403).send("Acess decline");
  }
  try {
    const user = await User.findByPk(userId);
    if (user) {
      const person = await Person.findByPk(userId);
      if (person) {
        res.status(201).json({
          email: user.email,
          national_id: person.national_id,
          personName: person.name,
          personLastName: person.last_name,
        });
      } else {
        const company = await Company.findByPk(userId);
        if (company) {
          res.status(201).json({
            email: user.email,
            nit: company.nit,
            companyName: company.company_name,
          });
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
  const { token } = req.headers;
  const tokenSession = await verifyAccessToken(token);
  if (id == tokenSession) {
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
  } else {
    res.status(401).json({ message: "You don´t have this permits" });
  }
};
