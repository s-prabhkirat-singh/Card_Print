const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const categoriesController = require("../controllers/categoriesController");

// Creating CRUD routes for categories
router.get("/categories", categoriesController.getCategories);

router.get("/parentCategories", categoriesController.get_all_parent_categories);

router.get("/childCategories/:id", categoriesController.view_child_categories);

router.post(
  "/addCategory",
  categoriesController.upload.single("category_image"),
  categoriesController.addCategory
);

// router.delete("/deleteParent/:id", categoriesController.delete_parent_category);

// router.post("/addChildCategory", categoriesController.addCategory);

router.delete("/deleteCategory/:id", categoriesController.delete_category);

router.post(
  "/updateCategory/:id",
  categoriesController.upload.single("category_image"),
  categoriesController.update_category
);

module.exports = router;
