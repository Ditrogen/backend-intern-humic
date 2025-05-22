const lowonganMagangService = require("../models/lowonganMagang");

const addLowonganMagang = async (req, res) => {
  const {
    posisi,
    kelompok_peminatan,
    jobdesk,
    lokasi,
    kualifikasi,
    benefit,
    durasi_awal,
    durasi_akhir,
    paid,
  } = req.body;
  const require = req.role;
  const status_lowongan = "dibuka";
  const image_path = req.file 
  try {
    if (require === "admin") {

      const file = await uploadGambar(image_path); 
      await lowonganMagangService.addlowonganMagang(
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
        file
      );
      return res.status(200).json({
        message: "Internship vacancy created successfully",
      });
    }
    return res.status(403).json({
      message: "Access denied: Only admins can access this route",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const uploadGambar = async (image) => {
  try {
    if (!image) {
      throw new Error("Please upload an image!");
    }

    const file = `/uploads/${image.filename}`;
    return file;
  } catch (error) {
    console.error(error.message);
    throw new Error("Failed to upload image.");
  }
};

const getAllLowonganMagang = async (req, res) => {
  try {
    const [lowonganMagang] = await lowonganMagangService.getAllLowonganMagang();
    if (lowonganMagang.length === 0) {
      return res.status(404).json({
        message: "No internship vacancies found",
      });
    }
    return res.status(200).json({
      message: "Successfully retrieved all internship vacancies",
      data: lowonganMagang,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getLowonganMagangById = async (req, res) => {
  const { id } = req.params;

  try {
    const [lowonganMagang] = await lowonganMagangService.getLowonganMagangById(id);

    if (lowonganMagang.length === 0) {
      return res.status(404).json({
        message: "Internship vacancy not found",
      });
    }
    return res.status(200).json({
      message: "Successfully retrieved internship vacancy by ID",
      data: lowonganMagang[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const deleteLowonganMagangById = async (req, res) => {
  const { id } = req.params;
  const require = req.role;

  try {
    if (require === "admin") {
      const [lowonganMagang] = await lowonganMagangService.getLowonganMagangById(id);
      if (lowonganMagang.length === 0) {
        return res.status(404).json({
          message: "Internship vacancy not found",
        });
      }
      await lowonganMagangService.deleteLowonganMagangById(id);
      return res.status(200).json({
        message: "Internship vacancy deleted successfully",
      });
    }
    return res.status(403).json({
      message: "Access denied: Only admins can access this route",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  addLowonganMagang,
  getAllLowonganMagang,
  getLowonganMagangById,
  deleteLowonganMagangById,
};
