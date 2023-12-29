const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  updateProductValid,
  deleteProduct
} = require("../controller/product");
// const { upload } = require("../middleware/uploader");
const {
  getUsers,
  createSignIn,
  createSignUp,
  deleteUser,
  putUser,
} = require("../controller/user");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });
const {auth} = require("../middleware/auth")

//product point
router.get("/get/products",  getProducts);
router.post("/create/product", [auth, upload.array("rasmlar")], createProduct);
router.patch("/update/product/:productId",[auth],  updateProductValid);
router.delete("/delete/product/:productId",[auth],  deleteProduct);
//user point
router.get("/get/users", [auth], getUsers);
router.post("/create/sign-in", createSignIn);
router.post("/create/sign-up",[auth], createSignUp);
router.delete("/delete/user/:id",[auth],  deleteUser);
router.put("/put/user/:id",[auth], putUser);

module.exports = router;
