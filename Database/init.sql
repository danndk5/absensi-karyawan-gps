CREATE DATABASE absensi_db;

\c absensi_db;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    nik VARCHAR(20) UNIQUE NOT NULL,
    password VARCHAR(200) NOT NULL, -- disimpan hash
    nama VARCHAR(100) NOT NULL,
    jabatan VARCHAR(50),
    no_hp VARCHAR(20),
    tgl_lahir DATE,
    lokasi_lat DOUBLE PRECISION,
    lokasi_lon DOUBLE PRECISION,
    radius INTEGER DEFAULT 50
);

CREATE TABLE absensi (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    tanggal DATE NOT NULL DEFAULT CURRENT_DATE,
    jam_masuk TIMESTAMP,
    jam_keluar TIMESTAMP,
    status VARCHAR(20) DEFAULT 'hadir'
);