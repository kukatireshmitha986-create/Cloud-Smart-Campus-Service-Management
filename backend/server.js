const express = require("express");
const cors = require("cors");
require("dotenv").config();

require("./database");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const requestRoutes = require("./routes/requestRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message:
            "Cloud-Based Smart Campus Service Management System API is running!"
    });
});

app.get("/api/health", (req, res) => {
    res.json({
        status: "success",
        message: "Backend and SQLite database are working!"
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/requests", requestRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});