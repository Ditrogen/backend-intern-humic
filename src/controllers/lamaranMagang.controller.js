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
  const status = "in process";
  const role = "student";

  try {
    const cv_path = await uploadCV(CV);
    const portofolio_path = await uploadPortofolio(Portofolio);

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
      message: "Internship application submitted successfully.",
      data: {
        id_lowongan_magang,
        data,
        status,
      },
    });
  } catch (error) {
    console.error("Error adding internship application:", error);
    res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    });
  }
};

const uploadCV = async (CV) => {
  try {
    if (!CV) {
      throw new Error("Please upload your CV.");
    }

    const file = `/uploads/${CV.filename}`;
    return file;
  } catch (error) {
    console.error(error.message);
    throw new Error("Failed to upload CV.");
  }
};

const uploadPortofolio = async (portofolio) => {
  try {
    if (!portofolio) {
      throw new Error("Please upload your portfolio.");
    }
    const file = `/uploads/${portofolio.filename}`;
    return file;
  } catch (error) {
    console.error(error.message);
    throw new Error("Failed to upload portfolio.");
  }
};

const getAllLamaranMagang = async (req, res) => {
  try {
    const [result] = await lamaranMagangModel.getAllLamaranMagang();
    if (result.length === 0) {
      return res.status(404).json({
        message: "No internship applications found.",
      });
    }
    res.status(200).json({
      message: "Internship applications retrieved successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Error fetching all internship applications:", error);
    res.status(500).json({
      message: "Internal server error.",
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
        message: "No internship applications found for this job post.",
      });
    }
    res.status(200).json({
      message: "Internship applications retrieved successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Error fetching internship applications by job ID:", error);
    res.status(500).json({
      message: "Internal server error.",
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
      return res.status(403).json({
        message: "Unauthorized access.",
      });
    }

    await lamaranMagangModel.updateStatusLamaran(id_lamaran_magang, status);
    res.status(200).json({
      message: "Internship application status successfully updated.",
    });
  } catch (error) {
    console.error("Error updating internship application status:", error);
    res.status(500).json({
      message: "Internal server error.",
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
