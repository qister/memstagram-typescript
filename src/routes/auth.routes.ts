import { Router, Request, Response } from "express";
const User = require("../models/User");
import { check, validationResult } from "express-validator"
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = Router();

// /api/auth

router.post(
  "/register",
  [
    check("email", "Некорректный email").isEmail(),
    check("password", "Минимальная длина пароля 6 символов").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    try {
      console.log(req.body);
      const errors = validationResult(req);

      if (!errors.isEmpty) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некорректные данные при регистрации",
        });
      }
      const { email, password } = req.body;
      const candidate = await User.findOne({ email });

      if (candidate) {
        return res
          .status(400)
          .json({ message: "Такой плfeffeьзователь уже есть " });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPassword });

      await user.save();

      res.status(201).json({ message: "Пользователь создан" });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ message: "что-то пошло не так, попробуйте снова" });
    }
  }
);

router.post(
  "/login",
  [
    check("email", "Введите корректный email").normalizeEmail().isEmail(),
    check("password", "Введите пароль").exists(),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некорректные данные при входе в систему",
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });
      console.log(user);

      if (!user) {
        return res.status(400).json("Пользователь не найден");
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Неверный пароль, попробуйте снова" });
      }

      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expiresIn: "1h",
      });

      res.json({ token, userId: user.id, email: user.email });
    } catch (e) {
      res
        .status(500)
        .json({ message: "что-то пошло не так, попробуйте снова" });
    }
  }
);

module.exports = router;
