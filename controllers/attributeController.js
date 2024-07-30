const { where } = require("sequelize");
const { Product_Attributes, Product_Attribute_Values } = require("../models");
const { get } = require("../routes/attributeRoutes");

const get_attributes = async (req, res) => {
  try {
    const response = await Product_Attributes.findAll({
      attributes: ["id", "name", "display_type"],
    });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const add_product_attribute = async (req, res) => {
  const { name, display_type, status } = req.body;
  try {
    await Product_Attributes.create({
      name,
      display_type,
      status,
    }).then((data) => {
      return res.status(200).json("Product Attribute Entry Created");
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const update_product_attribute = async (req, res) => {
  const { id } = req.params;
  const { name, display_type, status } = req.body;
  try {
    const response = await Product_Attributes.update(
      {
        name,
        display_type,
        status,
      },
      {
        where: {
          id: id,
        },
      }
    ).then((data) => {
      if (data > 0) {
        return res.status(200).json("Product Attribute Entry Updated");
      } else {
        return res.status(404).json("Product Attribute Entry Not Found");
      }
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const delete_product_attribute = async (req, res) => {
  const { id } = req.params;
  try {
    await Product_Attributes.destroy({
      where: {
        id: id,
      },
    }).then((data) => {
      if (data == 0) {
        return res.status(200).json("Product Attribute Doesn't Exist");
      }
      return res.status(200).json("Product Attribute Entry Deleted");
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const get_product_attribute_values = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Product_Attribute_Values.findAll({
      where: {
        product_attribute_id: id,
      },
    });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const get_attribute_by_id = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Product_Attributes.findByPk(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const add_product_attribute_value = async (req, res) => {
  const { name } = req.body;
  const { product_attribute_id } = req.params;

  try {
    // First, check if the product_attribute_id exists
    const attributeExists = await Product_Attributes.findByPk(
      product_attribute_id
    );
    if (!attributeExists) {
      return res
        .status(400)
        .json({ error: "Product Attribute does not exist" });
    }

    // If it exists, create the new value
    const newValue = await Product_Attribute_Values.create({
      product_attribute_id,
      name,
    });

    return res.status(200).json({
      message: "Product Attribute Value Entry Created",
      data: newValue,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

const update_product_attribute_value = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  try {
    const newValue = await Product_Attribute_Values.update(
      {
        name,
      },
      {
        where: {
          id: id,
        },
      }
    );
    if (newValue[0] === 0) {
      return res
        .status(404)
        .json({ error: "Product Attribute Value not found" });
    }

    return res.status(200).json({
      message: "Product Attribute Value Entry Updated",
      data: newValue,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

const delete_product_attribute_value = async (req, res) => {
  const { id } = req.params;
  try {
    await Product_Attribute_Values.destroy({
      where: {
        id: id,
      },
    }).then((data) => {
      if (data == 0) {
        return res.status(200).json("Product Attribute Value Doesn't Exist");
      }
      return res.status(200).json("Product Attribute Value Entry Deleted");
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
module.exports = {
  get_attributes,
  get_product_attribute_values,
  add_product_attribute,
  update_product_attribute,
  delete_product_attribute,
  add_product_attribute_value,
  update_product_attribute_value,
  delete_product_attribute_value,
  get_attribute_by_id,
};
