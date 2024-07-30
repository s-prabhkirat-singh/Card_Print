const { Product_Quality } = require("../models");

const get_product_quality = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await Product_Quality.findAll();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const delete_product_quality = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Product_Quality.destroy({
      where: {
        id: id,
      },
    });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const add_product_quality = async (req, res) => {
  const { name } = req.body;
  try {
    const response = await Product_Quality.create({
      name: name,
    });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const update_product_quality = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const response = await Product_Quality.update(
      {
        name: name,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  get_product_quality,
  delete_product_quality,
  add_product_quality,
  update_product_quality,
};
