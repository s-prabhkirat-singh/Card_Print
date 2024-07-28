const { Product_Categories } = require("../models");
const { Op } = require("sequelize");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads/";
    // Ensure the uploads directory exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append the file extension
  },
});

const upload = multer({ storage: storage });

const getCategories = async (req, res) => {
  try {
    let final_data;
    const categories = await Product_Categories.findAll({
      attributes: ["id", "name"],
      where: { parent_id: null },
      order: [["sequence", "ASC"]],
    });
    for (let i = 0; i < categories.length; i++) {
      const sub_categories = await Product_Categories.findAll({
        attributes: ["id", "name"],
        where: { parent_id: categories[i].id },
        order: [["sequence", "ASC"]],
      });
      categories[i].dataValues.sub_categories = sub_categories;
    }
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addCategory = async (req, res) => {
  const { name, parent_id, description, sequence, status } = req.body;
  let category;
  let category_image;

  if (req.file) {
    category_image = req.file.filename;
  }
  if (parent_id) {
    try {
      category_image
        ? (category = await Product_Categories.create({
            name,
            parent_id,
            description,
            category_image,
            sequence,
            status,
          }))
        : (category = await Product_Categories.create({
            name,
            parent_id,
            description,
            sequence,
            status,
          }));
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    try {
      category_image
        ? (category = await Product_Categories.create({
            name,
            parent_id: null,
            description,
            category_image,
            sequence,
            status,
          }))
        : (category = await Product_Categories.create({
            name,
            parent_id: null,
            description,
            sequence,
            status,
          }));
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

const get_all_parent_categories = async (req, res) => {
  try {
    const categories = await Product_Categories.findAll({
      where: { parent_id: null },
      order: [["sequence", "ASC"]],
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// const add_parent_category = async (req, res) => {
//   const { name, description, category_image, sequence, status } = req.body;
//   try {
//     const category = await Product_Categories.create({
//       name,
//       parent_id: null,
//       description,
//       category_image,
//       sequence,
//       status,
//     });
//     res.status(200).json(category);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const delete_parent_category = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const category = await Product_Categories.destroy({
//       where: {
//         [Op.or]: [{ id: id }, { parent_id: id }],
//       },
//     });
//     if (category == 1) {
//       res.status(200).json("Deleted Successfully");
//     } else {
//       res.status(404).json("Not Found");
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const update_category = async (req, res) => {
  const { id } = req.params;

  const { name, description, sequence, status } = req.body;
  const currentData = await Product_Categories.findOne({
    where: { id: id },
    attributes: ["category_image"],
  });
  let category_image = currentData.category_image;
  if (req.file) {
    category_image = req.file.filename;

    if (currentData) {
      await fs.unlink(`uploads/${currentData.category_image}`, (err) => {
        if (err) console.log("Meta image file not present");
        else console.log("Meta image file deleted!");
      });
    }
  }
  try {
    const category = await Product_Categories.update(
      {
        name,
        description,
        category_image,
        sequence,
        status,
      },
      {
        where: {
          id: id,
        },
      }
    );
    if (category == 1) {
      res.status(200).json("Updated Successfully");
    } else {
      res.status(404).json("Not Found");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const view_child_categories = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Product_Categories.findAll({
      where: { parent_id: id },
      order: [["sequence", "ASC"]],
    });
    const parent = await Product_Categories.findOne({
      where: { id: id },
      attributes: ["name", "id"],
    });

    res.status(200).json([parent, data]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// const add_child_category = async (req, res) => {
//   const { name, parent_id, description, category_image, sequence, status } =
//     req.body;
//   try {
//     const category = await Product_Categories.create({
//       name,
//       parent_id,
//       description,
//       category_image,
//       sequence,
//       status,
//     });
//     res.status(200).json(category);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const delete_child_category = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const category = await Product_Categories.destroy({
//       where: {
//         id: id,
//       },
//     });
//     if (category == 1) {
//       res.status(200).json("Deleted Successfully");
//     } else {
//       res.status(404).json("Not Found");
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const delete_category = async (req, res) => {
  const { id } = req.params;

  try {
    // Function to get all child ids and images recursively
    const getAllChildIdsAndImages = async (parentId) => {
      const children = await Product_Categories.findAll({
        where: { parent_id: parentId },
        attributes: ["id", "category_image", "parent_id"],
      });

      let childInfo = children.map((child) => ({
        id: child.id,
        image: child.category_image,
        parent_id: child.parent_id,
      }));

      for (let child of children) {
        const grandChildInfo = await getAllChildIdsAndImages(child.id);
        childInfo = [...childInfo, ...grandChildInfo];
      }

      return childInfo;
    };

    // Get all child categories
    let categoriesToDelete = await getAllChildIdsAndImages(id);

    // Add the parent category
    const parentCategory = await Product_Categories.findOne({
      where: { id: id },
      attributes: ["id", "category_image"],
    });

    if (parentCategory) {
      categoriesToDelete.push({
        id: parentCategory.id,
        image: parentCategory.category_image,
        parent_id: null,
      });
    }

    // Delete all associated images from filesystem
    for (let item of categoriesToDelete) {
      if (item.image) {
        try {
          await fs.promises.unlink(path.join("uploads", item.image));
          console.log(`Image file deleted: ${item.image}`);
        } catch (err) {
          console.log(`Error deleting image file ${item.image}:`, err.message);
        }
      }
    }

    // Delete all categories (including children) from the database
    const deletedCount = await Product_Categories.destroy({
      where: {
        id: {
          [Op.in]: categoriesToDelete.map((item) => item.id),
        },
      },
    });

    if (deletedCount > 0) {
      res
        .status(200)
        .json(`Deleted Successfully. ${deletedCount} categories were removed.`);
    } else {
      res.status(404).json("Category not found");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getCategories,
  addCategory,
  get_all_parent_categories,
  view_child_categories,
  upload,
  update_category,
  delete_category,
};
