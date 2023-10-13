import { User } from "../models/User.js";

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

export const createUsers = async (req, res) => {
  try {
    const { password, email, phone_number } = req.body;
    const newUser = await User.create({
      password,
      email,
      phone_number,
    });
    console.log(newUser);
    res.send("creating Users");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export async function getUser(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findOne({
      where: {
        id,
      },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

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

//   export async function deleteuser(req, res) {
//     const { id } = req.params;
//     try {
//       await Task.destroy({
//         where: {
//           userId: id,
//         },
//       });
//       await User.destroy({
//         where: {
//           id,
//         },
//       });
//       return res.sendStatus(204);
//     } catch (error) {
//       return res.status(500).json({ message: error.message });
//     }
//   }
