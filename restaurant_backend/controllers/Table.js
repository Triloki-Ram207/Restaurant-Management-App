import Table from "../models/Table.js";

// Create a new table
export const createTable = async (req, res) => {
  try {
    console.log(req.body);
    const table = new Table(req.body);
    const saved = await table.save();
    res.status(201).json(saved);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to create table", error: error.message });
  }
};

// Delete a table by number
export const deleteTable = async (req, res) => {
  try {
    const { number } = req.params;
    const tableNumber = parseInt(number);

    // Delete the specified table
    const deleted = await Table.findOneAndDelete({ number: tableNumber });
    if (!deleted) return res.status(404).json({ message: "Table not found" });

    // Find and update all tables with number > deleted table
    const tablesToShift = await Table.find({
      number: { $gt: tableNumber },
    }).sort({ number: 1 });

    for (const table of tablesToShift) {
      table.number -= 1;
      await table.save();
    }

    res.status(200).json({
      message: `Table ${tableNumber} deleted. Remaining tables renumbered.`,
      deleted,
    });
  } catch (error) {
    console.error("Failed to delete and reorder tables:", error.message);
    res
      .status(500)
      .json({ message: "Failed to delete table", error: error.message });
  }
};

// GET /api/v1/tables
export const getAllTables = async (req, res) => {
  try {
    const tables = await Table.find();
    res.status(200).json(tables);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch tables", error: error.message });
  }
};

export const assignTable = async (req, res) => {
  try {
    console.log(req.body);
    const { numberOfPersons } = req.body;
    const num = parseInt(numberOfPersons);

    let chairCount;
    if (num <= 2) chairCount = 2;
    else if (num <= 4) chairCount = 4;
    else if (num <= 6) chairCount = 6;
    else chairCount = 8;
    console.log("Looking for table with:", {
      reserved: false,
      chairs: chairCount,
    });

    const table = await Table.findOne({ reserved: false, chairs: chairCount });
    console.log("Matched table:", table);

    if (table) {
      table.reserved = true;
      await table.save();
      return res.status(200).json(table);
    } else {
      return res
        .status(404)
        .json({ message: `No available table with ${chairCount} chairs` });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to assign table", error: error.message });
  }
};
