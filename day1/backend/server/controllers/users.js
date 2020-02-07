import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import model from "../models";
import dotenv from "dotenv";

dotenv.config();

const { Users } = model;

class UserController {
  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns user data response
   */
  static async signup(req, res) {
    try {
      const { fullname, email, password } = req.body;

      const user = {
        fullname,
        email,
        password
      };

      const createUser = await Users.create(user);
      if (createUser) {
        return res.status(201).json({
          user: {
            id: createUser.dataValues.id,
            email: createUser.dataValues.email
          }
        });
      }
    } catch (error) {
      return res.status(500).json({
        error
      });
    }
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} logged in user data
   */
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const findUser = await Users.findOne({ where: { email } });

      if (findUser) {
        if (bcrypt.compareSync(password, findUser.dataValues.password)) {
          const payload = {
            id: findUser.dataValues.id,
            email: findUser.dataValues.email
          };
          const token = jwt.sign(payload, process.env.SECRET);
          return res.status(200).json({
            token: token,
            message: "Logged in successfully"
          });
        }
        return res.status(400).json({
          error: "Password does not match"
        });
      }
      res.status(404).json({
        error: "User not found"
      });
    } catch (error) {
      return res.status(500).json({
        error
      });
    }
  }
}

export default UserController;
