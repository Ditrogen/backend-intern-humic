const db = require("../config/db_connection");

const addlowonganMagang = async (
  posisi,
  kelompok_peminatan,
  jobdesk,
  lokasi,
  kualifikasi,
  benefit,
  durasi_awal,
  durasi_akhir,
  status_lowongan,
  paid
) => {
  const SQLQuery = `INSERT INTO lowongan_magang (posisi, kelompok_peminatan, jobdesk, lokasi, kualifikasi, benefit, durasi_awal, durasi_akhir, status_lowongan, paid,created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`;
 
  return db.execute(SQLQuery, [
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
