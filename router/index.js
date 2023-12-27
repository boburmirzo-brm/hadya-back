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

//product point
router.get("/get/products", getProducts);
router.post("/create/product", upload.array("rasmlar"), createProduct);
router.patch("/update/product/:productId", updateProductValid);
router.patch("/delete/product/:productId", deleteProduct);
//user point
router.get("/get/users", getUsers);
router.post("/create/sign-in", createSignIn);
router.post("/create/sign-up", createSignUp);
router.delete("/delete/user", deleteUser);
router.put("/put/user/:id", putUser);

module.exports = router;
