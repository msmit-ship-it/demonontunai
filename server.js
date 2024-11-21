const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const dashboardRoutes = require("./dashboard/routes");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs"); // Gunakan EJS sebagai template engine
app.set("views", path.join(__dirname, "dashboard/views"));
app.use(express.static(path.join(__dirname, "dashboard/public")));

// API dan Dashboard
app.use("/api", require("./api/server")); // API Routes
app.use("/", dashboardRoutes); // Dashboard Routes

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
