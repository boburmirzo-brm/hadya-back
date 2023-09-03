const mongoose = require("mongoose")
const Joi = require("joi")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    // gender: {
    //     type: String,
    //     required: true,
    // }
})

const Users = mongoose.model("user", userSchema)

const validateUser = (body) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
        name: Joi.string().required(),
        // gender: Joi.string().required()
    }) 
    return schema.validate(body)
}

module.exports = { Users, validateUser}