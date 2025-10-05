class UserModel {
  final String nik;
  final String nama;
  final String jabatan;
  final String token;

  UserModel({
    required this.nik,
    required this.nama,
    required this.jabatan,
    required this.token,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      nik: json['nik'] ?? '',
      nama: json['nama'] ?? '',
      jabatan: json['jabatan'] ?? '',
      token: json['token'] ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'nik': nik,
      'nama': nama,
      'jabatan': jabatan,
      'token': token,
    };
  }
}

class AbsensiModel {
  final String tanggal;
  final String jamMasuk;
  final String? jamKeluar;
  final String status;

  AbsensiModel({
    required this.tanggal,
    required this.jamMasuk,
    this.jamKeluar,
    required this.status,
  });

  factory AbsensiModel.fromJson(Map<String, dynamic> json) {
    return AbsensiModel(
      tanggal: json['tanggal'] ?? '',
      jamMasuk: json['jam_masuk'] ?? '',
      jamKeluar: json['jam_keluar'],
      status: json['status'] ?? 'hadir',
    );
  }
}