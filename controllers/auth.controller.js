const db = require("../models");
const { authConfig } = require('../config')
const { timeUtil } = require('../utils')
const User = db.User;
const Role = db.Role;

const Op = db.Sequelize.Op;

let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

// let salt = await bcrypt.genSaltSync(8)
// let password = await bcrypt.hashSync(req.body.password,  salt)
signup =  (req, res) => {
  // Save User to Database
  // let salt = await bcrypt.genSaltSync(8)
  User.create({
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      dob: timeUtil.localTime(req.body.dob),
      password:  bcrypt.hashSync(req.body.password, 8)
    })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({message: "User was registered successfully!"});
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({message: "User was registered successfully!"});
        });
      }
    })
    .catch(err => {
      res.status(500).send({message: err.message});
    });
};

signin = (req, res) => {
  User.findOne({
      where: {
        username: req.body.username
      }
    })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      
      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      
      let token = jwt.sign({id: user.id}, authConfig.secret, {
        expiresIn: 86400 // 24 hours
      });
      
      let authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

const authController = {
  signup: signup,
  signin: signin
};

module.exports = authController;