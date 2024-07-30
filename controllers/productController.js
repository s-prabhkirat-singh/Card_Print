const { Products } = require("../models");
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

const add_product = async (req, res) => {
  const {
    name,
    description,
    base_price,
    tax_percentage,
    product_category_id,
    product_quality_id,
  } = req.body;

  let product_image;
  if (req.file) {
    product_image = req.file.filename;
  }
  try {
    const product = await Products.create({
      name,
      description,
      base_price,
      tax_percentage,
      product_category_id,
      product_quality_id,
      product_image,
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const get_products = async (req, res) => {
  try {
    const products = await Products.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const delete_product = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Products.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    await product.destroy();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update_product = async (req, res) => {
  const { id } = req.params;

  const {
    name,
    description,
    base_price,
    tax_percentage,
    product_category_id,
    product_quality_id,
  } = req.body;

  const currentData = await Products.findByPk(id);
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
  try {
    const product = await Products.update(
      {
        name,
        description,
        base_price,
        tax_percentage,
        product_category_id,
        product_quality_id,
        product_image,
      },
      { where: { id } }
    );
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const get_product_by_id = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Products.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  get_products,
  upload,
  add_product,
  delete_product,
  update_product,
  get_product_by_id,
};
