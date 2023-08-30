const express = require("express")
const router = express.Router()
const { createProduct,getProducts } = require("../controller/product")
const {upload} = require("../middleware/uploader")

router.get("/get/products", getProducts)
router.post("/create/product", upload.array("rasmlar"), createProduct)

module.exports = router