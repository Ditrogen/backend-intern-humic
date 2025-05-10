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
  try {
    if (require === "admin") {
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
        paid
      );
      return res.status(200).json({
        message: "Lowongan magang created successfully",
      });
    }
    return res.status(400).json({
      message: "Hanya admin yang bisa mengakses ini",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getAllLowonganMagang = async (req, res) => {
  try {
    const [lowonganMagang] = await lowonganMagangService.getAllLowonganMagang();
    if (lowonganMagang.length === 0) {
      return res.status(404).json({
        message: "Lowongan magang not found",
      });
    }
    return res.status(200).json({
      message: "Get all lowongan magang successfully",
      data: lowonganMagang,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getLowonganMagangById = async (req, res) => {
  const {id }= req.params;

  try {
    const [lowonganMagang] = await lowonganMagangService.getLowonganMagangById(
      id
    );

    if (lowonganMagang.length === 0) {
      return res.status(404).json({
        message: "Lowongan magang not found",
      });
    }
    return res.status(200).json({
      message: "Get lowongan magang by id successfully",
      data: lowonganMagang[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const deleteLowonganMagangById = async (req, res) => {
  const {id} = req.params;
  const require = req.role;

  try {
    if (require === "admin") {
      const [lowonganMagang] =
        await lowonganMagangService.getLowonganMagangById(id);
      if (lowonganMagang.length === 0) {
        return res.status(404).json({
          message: "Lowongan magang not found",
        });
      }
      await lowonganMagangService.deleteLowonganMagangById(id);
      return res.status(200).json({
        message: "Lowongan magang deleted successfully",
      });
    }
    return res.status(400).json({
      message: "Hanya admin yang bisa mengakses ini",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


module.exports = {
  addLowonganMagang,
  getAllLowonganMagang,
  getLowonganMagangById,
  deleteLowonganMagangById,
};
