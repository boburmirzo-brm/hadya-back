const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  updateProductValid,
} = require("../controller/product");
const { upload } = require("../middleware/uploader");
const {
  getUsers,
  createSignIn,
  createSignUp,
  deleteUser,
  putUser,
} = require("../controller/user");

//product point
router.get("/get/products", getProducts);
router.post("/create/product", upload.array("rasmlar"), createProduct);
router.put("/update/product/:productId", updateProductValid);
//user point
router.get("/get/users", getUsers);
router.post("/create/sign-in", createSignIn);
router.post("/create/sign-up", createSignUp);
router.delete("/delete/user", deleteUser);
router.put("/put/user/:id", putUser);

module.exports = router;
