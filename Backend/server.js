const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const absenRoutes = require("./routes/absen");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/absen", absenRoutes);

app.get("/", (req, res) => {
    res.send("Backend Absensi sudah jalan");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});