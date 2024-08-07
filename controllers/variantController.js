const {
  Product_Variants,
  Product_Attribute_Values,
  Product_Attributes,
  Products,
} = require("../models");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { where } = require("sequelize");

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

const add_product_variant = async (req, res) => {
  try {
    const {
      name,
      description,
      extra_price,
      product_id,
      product_attribute_value_id,
    } = req.body;

    let product_image;
    if (req.file) {
      product_image = req.file.filename;
      console.log(`Image name ${product_image}`);
    }
    const product_variant = await Product_Variants.create({
      name,
      description,
      product_image,
      extra_price,
      product_id,
      product_attribute_value_id,
    });
    res.status(201).json(product_variant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const get_product_variant_by_id = async (req, res) => {
  const { id } = req.params;
  try {
    const product_variants = await Product_Variants.findByPk(id, {
      include: [
        {
          model: Product_Attribute_Values,
          attributes: ["product_attribute_id", "name"],
        },
      ],
    });
    res.status(200).json(product_variants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const delete_product_variant = async (req, res) => {
  try {
    const { id } = req.params;
    const product_variant = await Product_Variants.findByPk(id);
    if (!product_variant) {
      return res.status(404).json({ error: "Product variant not found" });
    }
    console.log(product_variant);
    await fs.unlink(`uploads/${product_variant.product_image}`, (err) => {
      if (err) console.log("image file not present");
      else console.log(" image file deleted!");
    });

    await product_variant.destroy();
    res.status(200).json({ message: "Product variant deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update_product_variant = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      extra_price,
      product_id,
      product_attribute_value_id,
    } = req.body;
    const currentData = await Product_Variants.findByPk(id);
    let product_image = currentData.product_image;
    if (req.file) {
      product_image = req.file.filename;

      if (currentData.product_image) {
        await fs.unlink(`uploads/${currentData.product_image}`, (err) => {
          if (err) console.log("Meta image file not present");
          else console.log("Meta image file deleted!");
        });
      }
    }
    const variant = await Product_Variants.update(
      {
        name,
        description,
        product_image,
        extra_price,
        product_id,
        product_attribute_value_id,
      },
      { where: { id } }
    );
    res.status(200).json(variant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const get_product_variant_by_product_id = async (req, res) => {
  try {
    const { id } = req.params;

    const product_variant = await Product_Variants.findAll({
      where: { product_id: id },
    });
    if (!product_variant) {
      return res.status(404).json({ error: "Product variant not found" });
    }
    res.status(200).json(product_variant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  upload,
  add_product_variant,
  get_product_variant_by_id,
  delete_product_variant,
  update_product_variant,
  get_product_variant_by_product_id,
};
