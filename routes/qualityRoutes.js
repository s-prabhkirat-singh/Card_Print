const express = require("express");
const router = express.Router();

const qualityController = require("../controllers/qualityController");

router.delete(
  "/deleteProductQuality/:id",
  qualityController.delete_product_quality
);

router.post(
  "/updateProductQuality/:id",
  qualityController.update_product_quality
);

router.post("/addProductQuality", qualityController.add_product_quality);

router.get("/getProductQuality", qualityController.get_product_quality);

module.exports = router;
