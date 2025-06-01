import User from "../models/User.js";
import Product from "../models/Product.js";

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Validate required fields
    if (!userId || !productId || !quantity) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: userId, productId, and quantity are required",
      });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if product exists and has sufficient stock
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient stock available",
      });
    }

    // Check if product already in cart
    const existingItemIndex = user.cart.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingItemIndex >= 0) {
      // Update quantity if product exists in cart
      const newQuantity = user.cart[existingItemIndex].quantity + quantity;
      if (newQuantity > product.stock) {
        return res.status(400).json({
          success: false,
          message: "Total quantity exceeds available stock",
        });
      }
      user.cart[existingItemIndex].quantity = newQuantity;
    } else {
      // Add new item to cart
      user.cart.push({ product: productId, quantity });
    }

    await user.save();

    // Get updated cart with populated product details
    const updatedUser = await User.findById(userId).populate("cart.product");

    return res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      data: updatedUser.cart,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update cart",
      error: error.message,
    });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: userId and productId are required",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const initialLength = user.cart.length;
    user.cart = user.cart.filter(
      (item) => item.product.toString() !== productId
    );

    if (user.cart.length === initialLength) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    await user.save();

    // Get updated cart with populated product details
    const updatedUser = await User.findById(userId).populate("cart.product");

    return res.status(200).json({
      success: true,
      message: "Item removed from cart",
      data: updatedUser.cart,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to remove item from cart",
      error: error.message,
    });
  }
};

// Update cart item quantity
export const updateCartItemQuantity = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || !quantity) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: userId, productId, and quantity are required",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if product exists and has sufficient stock
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient stock available",
      });
    }

    const cartItemIndex = user.cart.findIndex(
      (item) => item.product.toString() === productId
    );

    if (cartItemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    user.cart[cartItemIndex].quantity = quantity;
    await user.save();

    // Get updated cart with populated product details
    const updatedUser = await User.findById(userId).populate("cart.product");

    return res.status(200).json({
      success: true,
      message: "Cart quantity updated successfully",
      data: updatedUser.cart,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update cart quantity",
      error: error.message,
    });
  }
};

// Get user's cart
export const getCart = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Missing userId in request body",
      });
    }

    const user = await User.findById(userId).populate("cart.product");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user.cart,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch cart",
      error: error.message,
    });
  }
};

// Clear user's cart
export const clearCart = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Missing userId",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.cart = [];
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to clear cart",
      error: error.message,
    });
  }
};
