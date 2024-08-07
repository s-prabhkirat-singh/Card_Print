const express = require("express");
const router = express.Router();

const variantController = require("../controllers/variantController");

router.get(
  "/getProductVariantById/:id",
  variantController.get_product_variant_by_id
);

router.post(
  "/addProductVariant",
  variantController.upload.single("product_image"),
  variantController.add_product_variant
);

router.delete(
  "/deleteProductVariant/:id",
  variantController.delete_product_variant
);

router.put(
  "/updateProductVariant/:id",
  variantController.upload.single("product_image"),
  variantController.update_product_variant
);

router.get(
  "/getProductVariantByProductId/:id",
  variantController.get_product_variant_by_product_id
);

module.exports = router;
