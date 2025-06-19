const db = require("../config/db_connection");

const addlowonganMagang = async (
  id,
  posisi,
  kelompok_peminatan,
  jobdesk,
  lokasi,
  kualifikasi,
  benefit,
  durasi_awal,
  durasi_akhir,
  status_lowongan,
  paid,
  image_path
) => {
  const SQLQuery = `INSERT INTO lowongan_magang (id,posisi, kelompok_peminatan, jobdesk, lokasi, kualifikasi, benefit, durasi_awal, durasi_akhir, status_lowongan, paid,created_at,image_path) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(),?)`;
  return db.execute(SQLQuery, [
    id,
    posisi,
    kelompok_peminatan,
    jobdesk,
    lokasi,
    kualifikasi,
    benefit,
    durasi_awal,
    durasi_akhir,
    status_lowongan,
    paid,
    image_path,
    ]);
};

const getAllLowonganMagang = async () => {
    const SQLQuery = "SELECT * FROM lowongan_magang";
    return db.execute(SQLQuery);
}

const getLowonganMagangById = async (id) => {
    const SQLQuery = "SELECT * FROM lowongan_magang WHERE id = ?";
    return db.execute(SQLQuery, [id]);
} 
 
const deleteLowonganMagangById = async (id) => {
    const SQLQuery = "DELETE FROM lowongan_magang WHERE id = ?";
    return db.execute(SQLQuery, [id]);
}

module.exports = {  
    addlowonganMagang,
    getAllLowonganMagang,
    getLowonganMagangById,
    deleteLowonganMagangById
}
