import { Request, Response } from "express";
import User from "../models/user";

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.findAll();
  res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({
      msg: `User with id ${id} not found`,
    });
  }
};

export const postUser = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const emailExist = await User.findOne({
      where: {
        email: body.email,
      },
    });

    if (emailExist) {
      return res.status(400).json({
        msg: "there is a user with the same email",
      });
    }

    const user = new User(body);
    await user.save();
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: `Contact with the admin`,
    });
  }
};

export const putUser = async (req: Request, res: Response) => {
  const { body } = req;
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        msg: "user not exist",
      });
    }

    await user.update(body);
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: `Contact with the admin`,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        msg: "user not exist",
      });
    }
    //await user.destroy();
    await user.update({ status: false });
    return res.status(404).json({ msg: "the user has been deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: `Contact with the admin`,
    });
  }
};
