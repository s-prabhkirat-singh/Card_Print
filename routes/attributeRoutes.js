const express = require("express");
const router = express.Router();

const atrributeController = require("../controllers/attributeController");

router.get("/getAttributes", atrributeController.get_attributes);
router.post("/addAttribute", atrributeController.add_product_attribute);
router.put(
  "/updateAttribute/:id",
  atrributeController.update_product_attribute
);
router.delete(
  "/deleteAttribute/:id",
  atrributeController.delete_product_attribute
);

router.get(
  "/getAttributeValue/:id",
  atrributeController.get_product_attribute_values
);

module.exports = router;
