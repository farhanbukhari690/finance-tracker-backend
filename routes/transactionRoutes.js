// backend/routes/transactionRoutes.js
const express = require("express");
const { createTransaction, getTransactions, deleteTransaction } = require("../controllers/transactionControllers");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.use(auth);                 
router.post("/", createTransaction);
router.get("/", getTransactions);
router.delete("/:id", deleteTransaction);

module.exports = router;
