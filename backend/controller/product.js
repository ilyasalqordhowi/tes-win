const { Products } = require("../models");

class ProductController {
  static async list(req, res) {
    try {
      const products = await Products.findAll();
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const product = await Products.findByPk(id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json(product);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }

  static async create(req, res) {
    try {
      const { name, price, stock, description } = req.body;

      if (!name || !price || !stock) {
        return res
          .status(400)
          .json({ message: "Name, price, and stock are required" });
      }

      const newProduct = await Products.create({
        name,
        price,
        stock,
        description,
      });
      res.status(201).json(newProduct);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const { name, price, stock, description } = req.body;

      const product = await Products.findByPk(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (!name && !price && !stock && !description) {
        return res
          .status(400)
          .json({ message: "At least one field is required to update" });
      }

      await product.update({ name, price, stock, description });
      res.status(200).json(product);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const product = await Products.findByPk(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      await product.destroy();
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }
}

module.exports = ProductController;
