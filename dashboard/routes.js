const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

// Koneksi ke database
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tap_and_go",
});

// Halaman utama dashboard
router.get("/", (req, res) => {
    const query = "SELECT * FROM transactions ORDER BY payment_date DESC";
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error fetching data");
        }
        res.render("index", { transactions: results });
    });
});

// Halaman detail transaksi
router.get("/transaction/:id", (req, res) => {
    const query = "SELECT * FROM transactions WHERE id = ?";
    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error fetching data");
        }
        res.render("transaction", { transaction: results[0] });
    });
});

// Ekspor router
module.exports = router;
