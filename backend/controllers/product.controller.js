import { sql } from "../config/db.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await sql`
    SELECT * FROM products
    ORDER BY created_at DESC;
  `;
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
  // res.status(200).json({
  //   message: "Get all products -- Not implemented yet",
  // });
};

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const [product] = await sql`
    SELECT * FROM products
    WHERE id = ${id};
  `;
    if (!product) {
      return res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
  // res.status(200).json({
  //   message: `Get product with id : ${id} -- Not implemented yet`,
  // });
};

export const createProduct = async (req, res) => {
  try {
    const { name, price, image } = req.body;
    if (!name || !price || !image) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
      });
    }
    const [newProduct] = await sql`
    INSERT INTO products (name, price, image)
    VALUES (${name}, ${price}, ${image})
    RETURNING *;
    `;
    res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
  // res.status(201).json({
  //   message: `Create product with name: ${name}, price: ${price}, image: ${image} -- Not implemented yet`,
  // });
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, image } = req.body;
    // optional : add validation
    const [updatedProduct] = await sql`
    UPDATE products
    SET name = ${name}, price = ${price}, image = ${image}
    WHERE id = ${id}
    RETURNING *;
  `;
    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        error: "Product not found to update",
      });
    }
    res.status(200).json({
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
  // res.status(200).json({
  //   message: `Update product with id: ${id}, name: ${name}, price: ${price}, image: ${image} -- Not implemented yet`,
  // });
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const [deletedProduct] = await sql`
    DELETE FROM products
    WHERE id = ${id}
    RETURNING *;`;
    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        error: "Product not found to delete",
      });
    }
    return res.status(200).json({
      success: true,
      data: deletedProduct,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
  // res.status(200).json({
  //   message: `Delete product with id: ${id} -- Not implemented yet`,
  // });
};
