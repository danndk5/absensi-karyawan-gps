# Sistem Absensi Karyawan Berbasis GPS

Aplikasi mobile untuk sistem absensi karyawan dengan validasi lokasi GPS real-time. Dibangun menggunakan Flutter untuk mobile app dan Node.js untuk backend REST API.

## Status Project

🚧 *MVP (Minimum Viable Product)* - Project ini masih dalam tahap pengembangan aktif

## Fitur

- ✅ Autentikasi user (Login/Logout)
- ✅ Check-in dengan validasi GPS
- ✅ Check-out
- ✅ Riwayat absensi karyawan
- ✅ Token-based authentication (JWT)
- ✅ Validasi radius lokasi kantor

## Tech Stack

### Frontend
- Flutter (Dart)
- Packages: http, geolocator, shared_preferences, intl

### Backend
- Node.js
- Express.js
- PostgreSQL
- JWT untuk authentication
- Bcrypt untuk password hashing

### Database
- PostgreSQL

## Arsitektur Sistem
Aplikasi ini menggunakan arsitektur 3-tier:

*Frontend (Flutter Mobile App)*
- Tampilan aplikasi yang digunakan karyawan
- Mengirim request ke backend via REST API
- Menampilkan data yang diterima dari backend

*Backend (Node.js + Express)*
- Menerima request dari frontend
- Memproses logika bisnis (validasi GPS, autentikasi, dll)
- Berkomunikasi dengan database
- Mengirim response kembali ke frontend

*Database (PostgreSQL)*
- Menyimpan data user, absensi, dan konfigurasi
- Diakses oleh backend untuk read/write data


## Prerequisites

- Node.js (v16 atau lebih baru)
- PostgreSQL (v12 atau lebih baru)
- Flutter SDK (v3.0 atau lebih baru)
- Android Studio (untuk emulator) atau HP Android fisik

## Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/username/absensi-karyawan-gps.git
cd absensi-karyawan-gps

2. Setup Database
# Masuk ke PostgreSQL
psql -U postgres

# Jalankan script database
\i database/init.sql. 

3. Setup Backend
cd backend
npm install

# Buat file .env
# Isi dengan konfigurasi database Anda
Contoh

DB_PASS=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=absensi_db
JWT_SECRET=your_secret_key

# Jalankan backend
npm start

4. Setup Frontend

cd frontend
flutter pub get

# Edit lib/services/api_service.dart
# Ganti baseUrl dengan IP laptop Anda
# Jalankan aplikasi
flutter run

#Cara Penggunaan
1.Register user baru atau gunakan user default:
     NIK: 12345
     Password: password123
2.Login ke aplikasiSet lokasi kantor untuk user di database:UPDATE users 
3.SET lokasi_lat = -6.200000, 
     lokasi_lon = 106.816666, 
     radius = 50 
WHERE nik = '12345';
4.Test Check-in dan Check-out

API Endpoints
Authentication
POST /auth/register - Register user baru
POST /auth/login - Login user

AbsensiPOST /absen/checkin - Check-in (requires auth)
POST /absen/checkout - Check-out (requires auth)
GET /absen/history - Riwayat absensi (requires auth)

Screenshot
Coming soon

Roadmap / Future Improvements
[ ] Admin dashboard untuk kelola karyawan
[ ] Deploy backend ke cloud (Railway/Heroku)
[ ] Push notification reminder absen
[ ] Export laporan absensi ke Excel/PDF
[ ] Dark mode[ ] Multi-language support
[ ] Foto saat check-in
[ ] Laporan absensi bulanan
[ ] Izin/cuti karyawan

KontribusiProject ini dibuat untuk tujuan pembelajaran dan portfolio. Feedback dan saran sangat diterima.

LisensiMIT License - Lihat file LICENSE untuk detail

Kontak
GitHub: @danndk5
Email: dandimho5@gmail.com

Note: Project ini adalah MVP untuk demonstrasi kemampuan full-stack developmentUntuk penggunaan production, perlu penambahan fitur keamanan, testing, dan deployment yang lebih komprehensif.