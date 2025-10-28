import User from "../models/User.js";

export const createReservation = async (req, res) => {
  try {
    const { contactNumber, name, numberOfPersons, address } = req.body;
    console.log(req.body);

    // Check if a user with the contact number already exists
    const existingUser = await User.findOne({ contactNumber });

    if (existingUser) {
      // Update other fields if they differ
      existingUser.name = name;
      existingUser.numberOfPersons = numberOfPersons;
      existingUser.address = address;

      await existingUser.save();
      return res
        .status(200)
        .json({ message: "User updated", user: existingUser });
    } else {
      // Create new user
      const newUser = new User({
        contactNumber,
        name,
        numberOfPersons,
        address,
      });
      await newUser.save();
      return res
        .status(201)
        .json({ message: "New user created", user: newUser });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
