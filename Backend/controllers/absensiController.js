const pool = require("../db");

// Helper: Hitung jarak antara 2 koordinat (meter)
function calculateDistance(lat1, lon1, lat2, lon2) {
  const dx = (lat1 - lat2) * 111320;
  const dy = (lon1 - lon2) * 111320 * Math.cos(lat2 * Math.PI / 180);
  return Math.sqrt(dx * dx + dy * dy);
}

// CHECK-IN
exports.checkIn = async (req, res) => {
  const { latitude, longitude } = req.body;
  const userId = req.user.id;

  // Validasi input
  if (!latitude || !longitude) {
    return res.status(400).json({ message: "Latitude dan longitude wajib diisi" });
  }

  try {
    // Ambil data user
    const userRes = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);
    if (userRes.rows.length === 0) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    const user = userRes.rows[0];

    // Cek apakah lokasi sudah diset
    if (!user.lokasi_lat || !user.lokasi_lon) {
      return res.status(400).json({ message: "Lokasi kantor belum diset untuk user ini" });
    }

    // Hitung jarak
    const distance = calculateDistance(latitude, longitude, user.lokasi_lat, user.lokasi_lon);

    if (distance > user.radius) {
      return res.status(400).json({ 
        message: "Anda di luar lokasi absen", 
        jarak: Math.round(distance) + " meter"
      });
    }

    // Cek apakah sudah check-in hari ini
    const checkToday = await pool.query(
      "SELECT * FROM absensi WHERE user_id = $1 AND tanggal = CURRENT_DATE",
      [userId]
    );

    if (checkToday.rows.length > 0) {
      return res.status(400).json({ message: "Anda sudah check-in hari ini" });
    }

    // Insert absensi
    await pool.query(
      "INSERT INTO absensi (user_id, jam_masuk, tanggal) VALUES ($1, NOW(), CURRENT_DATE)",
      [userId]
    );

    res.json({ message: "Check-in berhasil", jarak: Math.round(distance) + " meter" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// CHECK-OUT
exports.checkOut = async (req, res) => {
  const userId = req.user.id;

  try {
    // Cek apakah sudah check-in hari ini
    const checkToday = await pool.query(
      "SELECT * FROM absensi WHERE user_id = $1 AND tanggal = CURRENT_DATE",
      [userId]
    );

    if (checkToday.rows.length === 0) {
      return res.status(400).json({ message: "Anda belum check-in hari ini" });
    }

    if (checkToday.rows[0].jam_keluar) {
      return res.status(400).json({ message: "Anda sudah check-out hari ini" });
    }

    // Update jam keluar
    await pool.query(
      "UPDATE absensi SET jam_keluar = NOW() WHERE user_id = $1 AND tanggal = CURRENT_DATE",
      [userId]
    );

    res.json({ message: "Check-out berhasil" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// HISTORY ABSENSI
exports.getHistory = async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      "SELECT tanggal, jam_masuk, jam_keluar, status FROM absensi WHERE user_id = $1 ORDER BY tanggal DESC LIMIT 30",
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};