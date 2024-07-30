const express = require("express");
const router = express.Router();

const atrributeController = require("../controllers/attributeController");

//Attribute Routes

router.get("/getAttributes", atrributeController.get_attributes);
router.get("/getAttributeById/:id", atrributeController.get_attribute_by_id);
router.post("/addAttribute", atrributeController.add_product_attribute);
router.post(
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

// Attribute Value Routes
router.get(
  "/getAttributeValues/:id",
  atrributeController.get_product_attribute_values
);

router.post(
  "/addAttributeValue/:product_attribute_id",
  atrributeController.add_product_attribute_value
);

router.put(
  "/updateAttributeValue/:id",
  atrributeController.update_product_attribute_value
);

router.delete(
  "/deleteAttributeValue/:id",
  atrributeController.delete_product_attribute_value
);
module.exports = router;
