const { Product_Categories } = require("../models");
const { Op } = require("sequelize");

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
  const { name, parent_id, description, category_image, sequence, status } =
    req.body;
  try {
    const category = await Product_Categories.create({
      name,
      parent_id,
      description,
      category_image,
      sequence,
      status,
    });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const get_all_parent_categories = async (req, res) => {
  try {
    const categories = await Product_Categories.findAll({
      attributes: ["id", "name"],
      where: { parent_id: null },
      order: [["sequence", "ASC"]],
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const add_parent_category = async (req, res) => {
  const { name, description, category_image, sequence, status } = req.body;
  try {
    const category = await Product_Categories.create({
      name,
      parent_id: null,
      description,
      category_image,
      sequence,
      status,
    });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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
  const { name, description, category_image, sequence, status } = req.body;
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

const add_child_category = async (req, res) => {
  const { name, parent_id, description, category_image, sequence, status } =
    req.body;
  try {
    const category = await Product_Categories.create({
      name,
      parent_id,
      description,
      category_image,
      sequence,
      status,
    });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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
    // Function to get all child ids recursively
    const getAllChildIds = async (parentId) => {
      const children = await Product_Categories.findAll({
        where: { parent_id: parentId },
        attributes: ["id"],
      });

      let childIds = children.map((child) => child.id);

      for (let childId of childIds) {
        const grandChildIds = await getAllChildIds(childId);
        childIds = [...childIds, ...grandChildIds];
      }

      return childIds;
    };

    // Get all child ids
    const childIds = await getAllChildIds(id);

    // Delete the category and all its children
    const deletedCount = await Product_Categories.destroy({
      where: {
        id: {
          [Op.in]: [id, ...childIds],
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
  add_parent_category,

  update_category,
  add_child_category,
  delete_category,
};
