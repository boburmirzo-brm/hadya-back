const {Products,validateProduct} = require("../models/productSchema")
const fs = require("fs");
const cloudinary = require("../cloudinary");

exports.getProducts = async(req, res)=>{
    try{
        const products = await Products.find()
        res.status(200).json({variant: "sucess", msg:"all blogs", innerData: products})
    }
    catch{
        res.status(500).json({variant: "error", msg:"server error", innerData: null})
    }
}

exports.createProduct = async(req, res) => {
    try{
        const uploader = async (path) => await cloudinary.uploads(path, "photos");
        let url = [];
        if (req.files) {
          const files = req.files;
          for (const file of files) {
            const { path } = file;
            const newPath = await uploader(path);
            url.push(newPath);
            fs.unlinkSync(path);
          }
        }
        let {name, category, desc, price} = req.body
       
        let newFile = await Products.create({name, category, desc, price, url})
        res.status(201).json({
            variant:"success" ,
            msg: "file was saved",
            innerData: newFile
        })
    }
    catch{
        res.status(500).json({variant: "error", msg:"server error", innerData: null})
    }
}

