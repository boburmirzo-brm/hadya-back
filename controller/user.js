const { Users, validateUser } = require("../models/userSchema")
const bcrypt = require("bcryptjs")
require("dotenv").config()
const jwt = require("jsonwebtoken")
exports.getUsers = async (req, res) => {
    try {
        const users = await Users.find()
        res.status(200).json({ variant: "success", msg: "all users", innerData: users })
    }
    catch {
        res.status(500).json({ variant: "error", msg: "server error", innerData: null })
    }
}

exports.createSignUp = async (req, res) => {
    try {
        const { error } = validateUser(req.body);
        if (error) {
            return res.status(400).json({ variant: "warning", msg: error.details[0].message, innerData: null });
        }
        const exitUser = await Users.findOne({ username: req.body.username });
        if (exitUser) {
            return res.status(400).json({ variant: "warning", msg: "username is invalid", innerData: null });
        }

        const solt = 10
        req.body.password = await bcrypt.hash(req.body.password,solt)

       

        let newUser = await Users.create(req.body);
        res.status(201).json({ variant: "success", msg: "user is created", innerData: newUser });
    }
     catch {
        res.status(500).json({ variant: "error", msg: "server error", innerData: null });
    }
};
exports.createSignIn = async (req, res) => {
    try {
        const { username, password } = req.body
        const exitUser = await Users.findOne({ username })
        if (!exitUser) {
            return res.status(404).json({ variant: "warning", msg: "username is not found", innerData: null });
        }

        bcrypt.compare(password, exitUser.password, function (err, retults) {
            if (retults) {

                const token = jwt.sign({ _id: exitUser._id, username: exitUser.username, isAdmin: false }, process.env.privateKey)
                exitUser.password = null
                res.status(200).json({ variant: "success", msg: "welcome", innerData: { user: exitUser, token } })
            } else {
                res.status(400).json({ variant: "warning", msg: "password is  incorrect", innerData: null });
            }
        })
    }
    catch {
        res.status(500).json({ variant: "error", msg: "Server error", innerData: null });

    }
};

exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await Users.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ variant: "error", msg: "User not found", innerData: null });
        }
        res.status(200).json({ variant: "success", msg: "user is deleted", innerData: deletedUser });
    } catch (error) {
        res.status(500).json({ variant: "error", msg: "Server error", innerData: null });
    }
}

exports.putUser = async (req, res) => {
    try {
        const { error } = validateUser(req.body)
        if (error) {
            return res.status(400).json({ variant: "warning", msg: error.details[0].message, innerData: null })
        }
        let { id } = req.params
        let updatedUser = await Users.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json({ variant: "success", msg: "user is updated", innerData: updatedUser })
    }
    catch {
        res.status(500).json({ variant: "error", msg: "Server error", innerData: null });

    }
}