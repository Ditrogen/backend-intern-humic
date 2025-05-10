const db = require("../config/db_connection");

const addMahasiswa = (
  nama_depan,
  nama_belakang,
  email,
  kontak,
  jurusan,
  angkatan,
  role,
  cv_path,
  portofolio_path,
  motivasi,
  relevant_skills
) => {
  const SQLQuery =
    "INSERT INTO mahasiswa (nama_depan, nama_belakang, email, kontak, jurusan, angkatan, role, cv_path, portofolio_path, motivasi, relevant_skills) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  return db.execute(SQLQuery, [
    nama_depan,
    nama_belakang,
    email,
    kontak,
    jurusan,
    angkatan,
    role,
    cv_path,
    portofolio_path,
    motivasi,
    relevant_skills,
  ]);
};

const getAllMahasiswa = () => {
  const SQLQuery = "SELECT * FROM mahasiswa";
  return db.execute(SQLQuery);
};

const getMahasiswaById = (id) => {
  const SQLQuery = "SELECT * FROM mahasiswa WHERE id = ?";
  return db.execute(SQLQuery, [id]);
};

module.exports = {
  addMahasiswa,
  getAllMahasiswa,
  getMahasiswaById,
};
