import User from "../models/user.model.js";

export const createUser = async (req, res, next) => {
  try {
    console.log(req.body);
    const newUser = new User(req.body);
    const user = await newUser.save();
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < (await User.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    results.results = await User.find({}).limit(limit).skip(startIndex).exec();
    res.json(results);
  } catch (error) {
    next(error);
  }
};
