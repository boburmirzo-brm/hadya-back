const { Schema, model } = require("mongoose")
const Joi = require("joi")

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    url:{
        type: Array,
        required: true
    },
    valid:{
        type: Boolean,
        default: true,
        required: false
    }
})

const Products = model("product", productSchema)

const validateProduct = (body)=>{
    const schema = Joi.object({
        name: Joi.string().required(),
        category: Joi.string().required(),
        desc: Joi.string().required(),
        price: Joi.number().required(),
        url: Joi.array().required(),
        valid: Joi.boolean(),
    })
    return schema.validate(body)
}

module.exports = { Products, validateProduct }