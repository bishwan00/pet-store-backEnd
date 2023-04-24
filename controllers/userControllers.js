import User from "../models/usermodels.js";
import passport from "passport";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    res.status(200).json({ status: "success", data: req.body });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.find();

    res.status(201).json({ status: "success", data: user });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

export const login = (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error("no user found");
        next(error);
        return;
      }
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { sub: user._id, email: user.email };
        const token = jwt.sign({ user: body }, process.env.JWT_SECRET, {
          expiresIn: "7 days",
        });
        res.json({ token });
      });
    } catch (err) {}
  })(req, res, next);
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.sub);
    res.status(200).json({ status: "success", data: user });
  } catch (error) {
    res.status(401).json({ status: "error", message: error });
  }
};
