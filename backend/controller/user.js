const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class UserController {
  static async register(req, res) {
    console.log(req.body);
    try {
      const { username, gender, email, password } = req.body;

      console.log(username, gender, email, password);
      if (!username || !gender || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      const newUser = await User.create({
        username,
        gender,
        email,
        password: hashedPassword,
      });

      res.status(201).json({
        message: "User registered successfully",
        id: newUser.id,
        email: newUser.email,
        gender: newUser.gender,
        username: newUser.username,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const payload = { id: user.id, email: user.email };
      const access_token = jwt.sign(payload, process.env.JWT_KEY);

      res.status(200).json({
        message: "Login successful",
        access_token,
        result: {
          username: user.username,
          gender: user.gender,
          email: user.email,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = UserController;
