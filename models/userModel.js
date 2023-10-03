const { DataTypes, Op } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  number: { 
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isPhilippinePhoneNumber(value) {
        const phoneNumberRegex = /^\+63\d{10}$/;
        if (!phoneNumberRegex.test(value)) {
          throw new Error(
            "Invalid Philippine phone number. The format should be +639XXXXXXXXX"
          );
        }
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isPasswordValid(value) {
        if (value.length < 6) {
          throw new Error("Password must be at least 6 characters long.");
        }
      },
    },
  },
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = { User, Op };
