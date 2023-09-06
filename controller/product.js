const { Products, validateProduct } = require("../models/productSchema");
const fs = require("fs");
const cloudinary = require("../cloudinary");

exports.getProducts = async (req, res) => {
  try {
    const { category } = req.query;
    const products = await Products.find(category ? { category } : null).sort({
      _id: -1,
    });
    res
      .status(200)
      .json({ variant: "sucess", msg: "all blogs", innerData: products });
  } catch {
    res
      .status(500)
      .json({ variant: "error", msg: "server error", innerData: null });
  }
};

exports.createProduct = async (req, res) => {
  try {
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
    let { name, category, desc, price } = req.body;

    let newFile = await Products.create({ name, category, desc, price, url });
    res.status(201).json({
      variant: "success",
      msg: "file was saved",
      innerData: newFile,
    });
  } catch {
    res
      .status(500)
      .json({ variant: "error", msg: "server error", innerData: null });
  }
};

exports.updateProductValid = async (req, res) => {
  try {
    const { productId } = req.params;
    const { valid } = req.body;

    const updatedProduct = await Products.findByIdAndUpdate(
      productId,
      { valid },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        variant: "error",
        msg: "Product not found",
        innerData: null,
      });
    }

    res.status(200).json({
      variant: "success",
      msg: "Product updated successfully",
      innerData: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      variant: "error",
      msg: "Server error",
      innerData: null,
    });
  }
};
