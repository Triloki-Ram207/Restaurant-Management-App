import MenuItem from "../models/MenuItem.js";

export const getGroupedMenuItems = async (req, res) => {
  try {
    const items = await MenuItem.find();

    // Group items by category
    const grouped = items.reduce((acc, item) => {
      const key = item.category;
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {});
    // console.log(grouped);
    res.status(200).json(grouped);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getCategoryItems = async (req, res) => {
  try {
    const { category } = req.params;
    const limit = parseInt(req.query.limit) || 6;
    const offset = parseInt(req.query.offset) || 0;

    const [items, total] = await Promise.all([
      MenuItem.find({ category }).skip(offset).limit(limit),
      MenuItem.countDocuments({ category }),
    ]);

    res.status(200).json({ items, total });
  } catch (error) {
    console.error("Error fetching category items:", error);
    res.status(500).json({ message: "Server error" });
  }
};
