// backend/controllers/transactionController.js
const Transaction = require("../models/Transaction");

// POST /api/transactions
const createTransaction = async (req, res) => {
  try {
    const { amount, type, category, title, note, date } = req.body;
    if (!amount || !type) {
      return res.status(400).json({ message: "amount and type are required" });
    }

    const tx = await Transaction.create({
      userId: req.userId,            
      amount,
      type,                              // "income" | "expense"
      category,                          // optional
      title,                             // optional
      note,                              // optional
      date: date ? new Date(date) : new Date(),
    });

    res.status(201).json(tx);
  }  catch (e) {
    console.error("CREATE TRANSACTION ERROR:", e);
    res.status(500).json({ message: e.message });
  }

};

// GET /api/transactions
const getTransactions = async (req, res) => {
  try {
    const txs = await Transaction
      .find({ userId: req.userId })
      .sort({ date: -1, createdAt: -1 });
    res.json(txs);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// DELETE /api/transactions/:id
const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const tx = await Transaction.findOneAndDelete({ _id: id, userId: req.userId });
    if (!tx) return res.status(404).json({ message: "Transaction not found" });
    res.json({ message: "Deleted", id: tx._id });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = { createTransaction, getTransactions, deleteTransaction };
