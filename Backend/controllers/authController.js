// controllers/authController.js
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = async (req, res) => {
  const { nik, nama, jabatan, password } = req.body;

  try {
    // cek nik sudah ada atau belum
    const checkUser = await pool.query("SELECT * FROM users WHERE nik = $1", [nik]);
    if (checkUser.rows.length > 0) {
      return res.status(400).json({ message: "NIK sudah terdaftar" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // simpan user baru
    const newUser = await pool.query(
      "INSERT INTO users (nik, nama, jabatan, password) VALUES ($1, $2, $3, $4) RETURNING id, nik, nama, jabatan",
      [nik, nama, jabatan, hashedPassword]
    );

    res.status(201).json({ message: "Registrasi berhasil", user: newUser.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN
exports.login = async (req, res) => {
  const { nik, password } = req.body;

  try {
    // cek user
    const result = await pool.query("SELECT * FROM users WHERE nik = $1", [nik]);
    if (result.rows.length === 0) return res.status(400).json({ message: "NIK tidak ditemukan" });

    const user = result.rows[0];

    // cek password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: "Password salah" });

    // generate token
    const token = jwt.sign(
      { id: user.id, nik: user.nik },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, nama: user.nama, jabatan: user.jabatan });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};