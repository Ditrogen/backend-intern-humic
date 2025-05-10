const db = require("../config/db_connection");

const addlowonganMagang = async (id_mahasiswa, id_lowongan_magang, status) => {
  const SQLQuery =
    "INSERT INTO lamaran_magang (id_mahasiswa, id_lowongan_magang, status, created_at, update_at) VALUES (?, ?, ?, NOW(), NOW())";
  return db.execute(SQLQuery, [id_mahasiswa, id_lowongan_magang, status]);
};

const getAllLamaranMagang = () => {
  const SQLQuery = `
  SELECT 
    m.nama_depan,
    m.nama_belakang,
    l.posisi,
    l.kelompok_peminatan,
    lm.status,
    lm.created_at
    FROM 
        lamaran_magang lm
    JOIN 
        mahasiswa m ON lm.id_mahasiswa = m.id
    JOIN 
        lowongan_magang l ON lm.id_lowongan_magang = l.id;
`;
  return db.execute(SQLQuery);
};

module.exports = {
  addlowonganMagang,
  getAllLamaranMagang,
};
