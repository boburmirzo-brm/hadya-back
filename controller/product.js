const { Products } = require("../models/productSchema");
const fs = require("fs");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");

exports.getProducts = async (req, res) => {
  try {
    const { category, valid } = req.query;
    const products = await Products.find(
      category
        ? { category, valid: Boolean(valid) }
        : valid
        ? { valid: Boolean(valid) }
        : null
    ).sort({
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
    // const uploader = async (path) => await cloudinary.uploads(path, "photos");
    let url = [];
    for (const file of req.files) {
      const { originalname } = file;
      const unique = uuidv4();
      const format = originalname?.split(".").pop();
      const name = `product_${unique}.${format}`;

      sharp(file.buffer)
        .metadata()
        .then(async (metadata) => {
          let booleanValue =
            metadata.orientation && [5, 6, 7, 8].includes(metadata.orientation);
          const processedImage = sharp(file.buffer)
            .rotate(booleanValue ? 90 : 0)
            .resize(1000, 1000)
            .toBuffer();
          await processedImage.then((data) => {
            sharp(data)
              .toFile(`./images/${name}`)
              .then(async () => {
                let pathName = `${req.protocol}://${req.get(
                  "host"
                )}/image/${name}`;
                // let path = `images\\${name}`;
                // const newPath = await uploader(path);
                // fs.unlinkSync(path);
                nextFunc(pathName, req.files.length);
              });
          });
        });
    }
    async function nextFunc(path, length) {
      url.push(path);
      if (url.length === length) {
        let { name, category, desc, price, items } = req.body;
        let newFile = await Products.create({ name, category, desc, price, url, items});
        res.status(201).json({
          variant: "success",
          msg: "file was saved",
          innerData: newFile,
        });
      }
    }
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

exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const propduct = await Products.findById(productId);

    propduct?.url?.forEach((el) => {
      let name = el.split("/").slice(-1);
      let path = `images\\${name}`;
      fs.unlinkSync(path);
    });

    const deleteProduct = await Products.findByIdAndRemove(productId);

    if (!deleteProduct) {
      return res.status(404).json({
        variant: "error",
        msg: "Product not found",
        innerData: null,
      });
    }

    res.status(200).json({
      variant: "success",
      msg: "Product deleted successfully",
      innerData: deleteProduct,
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
