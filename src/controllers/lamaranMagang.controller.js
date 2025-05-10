const mahasiswaModel = require("../models/mahasiswa");
const lowonganMagangModel = require("../models/lowonganMagang");
const lamaranMagangModel = require("../models/lamaranMagang");

const addLamaranMagang = async (req, res) => {
  const { id_lowongan_magang } = req.params;
  const {
    nama_depan,
    nama_belakang,
    email,
    kontak,
    jurusan,
    angkatan,
    motivasi,
    relevant_skills,
  } = req.body;
  const CV = req.files.cv?.[0];
  const Portofolio = req.files.portofolio?.[0];
  const status = "diproses";
  const role = "mahasiswa";

  try {
    const cv_path = await uploadCV(CV);
    const portofolio_path = await uploadportofolio(Portofolio);

    const data = {
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
    };

    const result = await mahasiswaModel.addMahasiswa(
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
    );

    const id_mahasiswa = result[0].insertId;
    await lamaranMagangModel.addlowonganMagang(
      id_mahasiswa,
      id_lowongan_magang,
      status
    );

    res.status(200).json({
      message: "Lamaran magang berhasil ditambahkan",
      data: {
        id_lowongan_magang,
        data,
        status,
      },
    });
  } catch (error) {
    console.error("Error adding lamaran magang:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const uploadCV = async (CV) => {
  try {
    if (!CV) {
      throw new Error("Harap upload CV!");
    }

    const file = `/uploads/${CV.filename}`;
    return file;
  } catch (error) {
    console.error(error.message);
    throw new Error("Gagal mengupload CV.");
  }
};

const uploadportofolio = async (portofolio) => {
  try {
    if (!portofolio) {
      throw new Error("Harap upload portofolio!");
    }
    const file = `/uploads/${portofolio.filename}`;
    return file;
  } catch (error) {
    console.error(error.message);
    throw new Error("Gagal mengupload portofolio.");
  }
};

const getAllLamaranMagang = async (req, res) => {
  try {
    const [result] = await lamaranMagangModel.getAllLamaranMagang();
    if (result.length === 0) {
      return res.status(404).json({
        message: "Tidak ada data lamaran magang",
      });
    }
    res.status(200).json({
      message: "Data lamaran magang berhasil diambil",
      data: result,
    });
  } catch (error) {
    console.error("Error fetching all lamaran magang:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getLamaranByIDLowonganMagang = async (req, res) => {
  const { id_lowongan_magang } = req.params;
  try {
    const [result] = await lamaranMagangModel.getLamaranByIDLowonganMagang(
      id_lowongan_magang
    );
    if (result.length === 0) {
      return res.status(404).json({
        message: "Tidak ada data lamaran magang",
      });
    }
    res.status(200).json({
      message: "Data lamaran magang berhasil diambil",
      data: result,
    });
  } catch (error) {
    console.error("Error fetching lamaran by ID lowongan magang:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const updateStatusLamaran = async (req, res) => {
  const { id_lamaran_magang } = req.params;
  const { status } = req.body;
  const role = req.role;

  try {
    if (role !== "admin") {
      return res.status(404).json({
        message: "Unauthorized access",
      });
    }

    await lamaranMagangModel.updateStatusLamaran(id_lamaran_magang, status);
    res.status(200).json({
      message: "Status lamaran magang berhasil diperbarui",
    });
  } catch (error) {
    console.error("Error updating status lamaran magang:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  addLamaranMagang,
  getAllLamaranMagang,
  getLamaranByIDLowonganMagang,
  updateStatusLamaran,
};
