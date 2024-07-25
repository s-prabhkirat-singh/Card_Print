const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const categoriesController = require("../controllers/categoriesController");

// Creating CRUD routes for categories
router.get("/categories", categoriesController.getCategories);
router.get("/parentCategories", categoriesController.get_all_parent_categories);
router.get("/childCategories/:id", categoriesController.view_child_categories);
router.post("/addParentCategory", categoriesController.add_parent_category);
// router.delete("/deleteParent/:id", categoriesController.delete_parent_category);
router.post("/addChildCategory", categoriesController.add_child_category);
router.delete("/deleteCategory/:id", categoriesController.delete_category);
router.post("/updateCategory/:id", categoriesController.update_category);

module.exports = router;
