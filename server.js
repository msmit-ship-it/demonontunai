const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// Simpan transaksi di memori sementara (contoh sederhana)
let transactions = [];

// Endpoint untuk menyimpan transaksi
app.post("/api/payment", (req, res) => {
    const { category, type, paymentMethod } = req.body;
    
    if (!category || !type || !paymentMethod) {
        return res.status(400).json({ message: "Invalid data" });
    }

    const transaction = {
        id: transactions.length + 1,
        category,
        type,
        paymentMethod,
        date: new Date(),
    };

    transactions.push(transaction);
    res.status(201).json({
        message: "Payment processed successfully",
        transaction,
    });
});

// Endpoint untuk mendapatkan semua transaksi
app.get("/api/transactions", (req, res) => {
    res.json(transactions);
});

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
