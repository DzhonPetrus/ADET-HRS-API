require("dotenv").config();
const db = require("../models");
const User = db.users;
const Loyalty_point = db.loyalty_points;
const User_Information = db.user_informations;
const bcrypt = require("bcrypt");
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);
const jwt = require("jsonwebtoken");

const { responseError, responseSuccess } = require("../utils/responseFormat");

const generateToken = (data) => {
  return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: "7200s" });
};

module.exports = {
  register: async (req, res) => {
    // User
    let { email, password, user_type, created_by, updated_by } = req.body;

    // User Info
    let {
      first_name,
      user_id,
      middle_name,
      last_name,
      contact_no,
      street1,
      city1,
      zip1,
      state1,
      country1,
      street2,
      city2,
      zip2,
      state2,
      country2,
      birth_date,
      nationality,
      loyalty_point_id,
    } = req.body;

    photo_url = req.file != undefined ? req.file.filename : "";

    password = await bcrypt.hash(password, SALT_ROUNDS);

    try {
      let userExist = await User.findOne({
        where: {
          email,
        },
      });

      if (userExist)
        return res
          .status(400)
          .send(responseError(`User with the email ${email} already exist!`));

      let newUser = await User.create({
        email,
        password
      });

      try {
        let newloyalty_point = await Loyalty_point.create({
          points: 0,
          created_by: newUser.id,
        });

        try {
          let newUserInfo = await User_Information.create({
            email,
            user_id,
            first_name,
            middle_name,
            last_name,
            contact_no,
            street1,
            city1,
            zip1,
            state1,
            country1,
            street2,
            city2,
            zip2,
            state2,
            country2,
            birth_date,
            nationality,
            photo_url,
            loyalty_point_id: newloyalty_point.loyalty_point_id,
            created_by: newUser.id,
          });

            const token = generateToken({id:newUser.id, email, user_type:newUser.user_type});
            res.status(200).send({error:false, data: {user:newUser, user_info:newUserInfo}, token, message:"Account created!"});
        } catch (err) {
          console.log(err);
          res.status(500).send(responseError(err.errors.map((e) => e.message)));
        }
      } catch (err) {
        res.status(500).send(responseError(err.errors.map((e) => e.message)));
      }
    } catch (err) {
      res.status(500).send(responseError(err.errors.map((e) => e.message)));
    }

    console.log(req.body);
  },
};
