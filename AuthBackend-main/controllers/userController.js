//Grup9

//app.config
const secureKey = "secure";

const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { count } = require("../models/User");

exports.getUser = async (req, res) => {
  try {
    const user = await User.findOne({ userMail: req.body.userMail });
    res.status(201).json({
      status: "success",
      userFullName: user.userFullName,
      userPhone: user.userPhone,
      userPoint: user.userPoint,
      userName: user.userName,
      userMail: user.userMail,
      userCreated: user.userCreated,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.updateUser = async (req, res) => {
  console.log("Update req:" + req.body);
  try {
    const user = await User.findOneAndUpdate(
      { userMail: req.body.mail },
      {
        userFullName: req.body.userFullName,
        userPhone: req.body.userPhone,
        userName: req.body.userName,
        userMail: req.body.userMail,
      }
    );
    res.status(201).json({
      status: "success",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.checkUpdate = async (req, res) => {
  try {
    let message = "";
    let errorMessage = "";
    let counter = 0;
    let mail;
    let phone;
    let username;
    if (req.body.currentMail != req.body.userMail) {
      mail = await User.findOne({ userMail: req.body.userMail });
      if (mail) {
        message += " (Email) ";
        counter++;
      }
    }
    if (req.body.currentPhone != req.body.userPhone) {
      phone = await User.findOne({ userPhone: req.body.userPhone });
      if (phone) {
        message += " (Phone) ";
        counter++;
      }
    }

    if (req.body.currentUsername != req.body.userName) {
      username = await User.findOne({ userName: req.body.userName });
      if (username) {
        message += " (Username) ";
        counter++;
      }
    }

    if (counter != 0) {
      errorMessage = (counter == 1) ? message + "already exists!" : message + "already exist!";
      res.send({ "status": "fail", "message": errorMessage });
    }
    else {
      res.send({ "status": "success", "message": "Updatable profile!" });
    }
  }
  catch (error) {
    console.log(error);
    res.status(500).send("Internal Server error Occured");
  }
}

/*exports.checkMail = async (req, res) => {
  try {
    const user = await User.findOne({ userMail: req.body.userMail });
    if (user) {
      res.send({ "status": "fail", "message": "Sorry, that email already exists!" });
    }
    else {
      res.send({ "status": "success", "message": "Email is available." });
    }
  }
  catch (error) {
    console.log(error);
    res.status(500).send("Internal Server error Occured");
  }
}

exports.checkUsername = async (req, res) => {
  try {
    const user = await User.findOne({ userName: req.body.userName });
    if (user) {
      res.send({ "status": "fail", "message": "Sorry, that username already exists!" });
    }
    else {
      res.send({ "status": "success", "message": "Username is available." });
    }
  }
  catch (error) {
    console.log(error);
    res.status(500).send("Internal Server error Occured");
  }
}

exports.checkPhone = async (req, res) => {
  try {
    const user = await User.findOne({ userPhone: req.body.userPhone });
    if (user) {
      res.send({ "status": "fail", "message": "Sorry, that phone already exists!" });
    }
    else {
      res.send({ "status": "success", "message": "Phone is available." });
    }
  }
  catch (error) {
    console.log(error);
    res.status(500).send("Internal Server error Occured");
  }
}*/

exports.checkPassword = async (req, res) => {
  try {
    const user = await User.findOne({ userMail: req.body.userMail });
    if (user) {
      const cmp = await bcrypt.compare(req.body.currentPassword, user.userPassword);
      if (cmp) {
        res.send({ "status": "success", "message": "Current password is correct." });
      }
      else {
        res.send({ "status": "fail", "message": "Current password is incorrect." });
      }
    }
    else {
      res.send({ "status": "fail", "message": "User not found." });
    }
  }
  catch (error) {
    console.log(error);
    res.status(500).send("Internal Server error Occured");
  }
}

exports.changePassword = async (req, res) => {
  console.log("change password req:" + req.body);
  try {
    const user = await User.findOne({ userMail: req.body.userMail });
    user.userPassword = req.body.userPassword;
    user.save();
    res.status(201).json({
      status: "success",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};