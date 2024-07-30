const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

router.get("/getProducts", productController.get_products);

router.post(
  "/addProduct",
  productController.upload.single("product_image"),
  productController.add_product
);

router.delete("/deleteProduct/:id", productController.delete_product);

router.put(
  "/updateProduct/:id",
  productController.upload.single("product_image"),
  productController.update_product
);

router.get("/getProductById/:id", productController.get_product_by_id);
module.exports = router;
