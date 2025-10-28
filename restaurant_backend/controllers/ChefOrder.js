import ChefOrder from "../models/ChefOrder.js";

let excludedChefs = new Set(); // in-memory exclusion list

export const assignChef = async (req, res) => {
  try {
    const chefs = await ChefOrder.find().sort({ orders: 1 });

    if (chefs.length === 0)
      return res.status(404).json({ message: "No chefs available" });

    const minOrderCount = chefs[0].orders;

    // Filter eligible chefs: lowest order count and not excluded
    const eligibleChefs = chefs.filter(
      (chef) => chef.orders === minOrderCount && !excludedChefs.has(chef.name)
    );

    // If no eligible chefs, reset exclusion list and retry
    if (eligibleChefs.length === 0) {
      excludedChefs.clear();
      return assignChef(req, res); // retry after reset
    }

    // Randomly pick one eligible chef
    const selectedChef =
      eligibleChefs[Math.floor(Math.random() * eligibleChefs.length)];

    // Update order count
    selectedChef.orders += 1;
    await selectedChef.save();

    // Add to exclusion list
    excludedChefs.add(selectedChef.name);

    res.status(200).json({ assignedChef: selectedChef.name });
  } catch (error) {
    console.error("Chef assignment failed:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllChefs = async (req, res) => {
  try {
    const chefs = await ChefOrder.find();
    res.status(200).json(chefs);
  } catch (error) {
    console.error("Error fetching chefs:", error.message);
    res.status(500).json({ message: "Failed to fetch chefs" });
  }
};
