import User from "../models/user.model.js";

export const createUser = async (req, res, next) => {
    try {
      const newUser = new User(req.body);
      const user = await newUser.save();
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };
 