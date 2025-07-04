import User from "../models/User.js";

export const addToWishlist = async (req, res) => {
  try {
    let { userId, productId } = req.body;

    userId = "6849c98ab0cc32d29bcfe4bd"; // Hardcoded userId for testing
    
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if productId already in favorites
    if (user.favorites.includes(productId)) {
      return res.status(400).json({ message: "Product already in wishlist" });
    }

    user.favorites.push(productId);
    await user.save();
    return res.status(200).json({ message: "Added to wishlist" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to add to wishlist", error });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const originalLength = user.favorites.length;
    user.favorites = user.favorites.filter((id) => id.toString() !== productId);
    if (user.favorites.length === originalLength) {
      return res.status(404).json({ message: "Product not found in wishlist" });
    }

    await user.save();
    return res.status(200).json({ message: "Removed from wishlist" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to remove from wishlist", error });
  }
};

export const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.query.userId).populate("favorites");
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json(user.favorites);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch wishlist", error });
  }
};
