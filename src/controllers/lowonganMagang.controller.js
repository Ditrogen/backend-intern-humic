const lowonganMagangService = require("../models/lowonganMagang");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs").promises;
const path = require('path');
const { deleteFileIfExists } = require('../config/fileHelper'); // ganti sesuai lokasi fileHelper.js

// Ini komentar buat penerus pengembangan proyek ini
// di db, field status_lowongan cuman di define pas add lowongan doang
// jadi pas dia get data lowongan, field status_lowongan bakal di override
// kenapa gk diapus aja fieldnya? Pertanyaan yang bagus
// itu aja fyi-nya
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

  const now = new Date();
  const tgl_awal = new Date(durasi_awal);
  const tgl_akhir = new Date(durasi_akhir);

  let status_lowongan = "ditutup";
  if (now >= tgl_awal && now <= tgl_akhir){
    status_lowongan = "dibuka";
  }

  const image_path = req.file;
  try {
    if (require === "admin") {
      const id = await uuidv4();
      const file = await uploadGambar(image_path);
      await lowonganMagangService.addlowonganMagang(
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

    const now = new Date();

    const updatedLowongan = lowonganMagang.map(item => {
      const durasiAwal = new Date(item.durasi_awal);
      const durasiAkhir = new Date(item.durasi_akhir);

      const status = now >= durasiAwal && now <= durasiAkhir ? "dibuka" : "ditutup";

      return {
        ...item,
        status_lowongan: status,
      };
    });

    return res.status(200).json({
      message: "Successfully retrieved all internship vacancies",
      data: updatedLowongan,
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
    const [lowonganMagang] = await lowonganMagangService.getLowonganMagangById(
      id
    );

    if (lowonganMagang.length === 0) {
      return res.status(404).json({
        message: "Internship vacancy not found",
      });
    }

    const now = new Date();
    const tgl_awal = new Date(lowonganMagang[0].durasi_awal);
    const tgl_akhir = new Date(lowonganMagang[0].durasi_akhir);

    let status_lowongan = "ditutup";
    if (now >= tgl_awal && now <= tgl_akhir){
      status_lowongan = "dibuka";
    }
    lowonganMagang[0].status_lowongan = status_lowongan

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

const getLowonganByKelompokPeminatan = async (req, res) => {
  const { kelompok_peminatan } = req.params;

  try {
    const [lowonganMagang] = await lowonganMagangService.getLowonganByKelompokPeminatan(kelompok_peminatan);

    if (lowonganMagang.length === 0) {
      return res.status(404).json({
        message: "No internship vacancies found for this specialization group",
      });
    }

    const now = new Date();

    const updatedLowongan = lowonganMagang.map(item => {
      const durasiAwal = new Date(item.durasi_awal);
      const durasiAkhir = new Date(item.durasi_akhir);

      const status = now >= durasiAwal && now <= durasiAkhir ? "dibuka" : "ditutup";

      return {
        ...item,
        status_lowongan: status,
      };
    });

    return res.status(200).json({
      message: "Successfully retrieved internship vacancies by specialization group",
      data: updatedLowongan,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}

const getAllKelompokPeminatan = async (req, res) => {
  try {
    const [kelompokPeminatan] = await lowonganMagangService.getAllKelompokPeminatan();
    if (kelompokPeminatan.length === 0) {
      return res.status(404).json({
        message: "No internship specialization group found",
      });
    }
    return res.status(200).json({
      message: "Successfully retrieved all specialization group",
      data: kelompokPeminatan.map(row => row.kelompok_peminatan),
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const deleteLowonganMagangById = async (req, res) => {
  const { id } = req.params;
  const role = req.role;

  try {
    if (role === "admin") {
      const [lowonganMagang] = await lowonganMagangService.getLowonganMagangById(id);

      if (!lowonganMagang || lowonganMagang.length === 0) {
        return res.status(404).json({
          message: "Internship vacancy not found",
        });
      }

      const imagePath = lowonganMagang[0].image_path;

      if (imagePath) {
        const fileName = path.basename(imagePath); // Ambil nama file dari path
        await deleteFileIfExists(fileName);
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
  getLowonganByKelompokPeminatan,
  getAllKelompokPeminatan,
  deleteLowonganMagangById,
};
