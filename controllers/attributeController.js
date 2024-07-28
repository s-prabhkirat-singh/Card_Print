const { Product_Attributes, Product_Attributes_Values } = require("../models");
const product_attribute_values = require("../models/product_attribute_values");

const get_attributes = async (req, res) => {
  try {
    const response = await Product_Attributes.findAll({
      attributes: ["id", "name"],
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
      return res.status(200).json("Product Attribute Entry Deleted");
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const get_product_attribute_values = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Product_Attributes_Values.findAll({
      where: {
        product_attribute_id: id,
      },
    });
    return res.status(200).json(response);
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
  product_attribute_values,
};
