const partnershipModel = require("../models/partnership");

const addPartnership = async (req, res) => {
  const { nama_partner } = req.body;
  const image = req.file;
  
  try {
    const image_path = await uploadGambar(image);
    await partnershipModel.addPartnership(nama_partner, image_path);
    res.status(200).json({
      message: "Data partnership berhasil ditambahkan",
      data: { nama_partner, image_path },
    });
  } catch (error) {
    console.error("Error adding partnership:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const uploadGambar = async (image) => {
  try {
    if (!image) {
      throw new Error("Harap upload gambar!");
    }

    const file = `/uploads/${image.filename}`;
    return file;
  } catch (error) {
    console.error(error.message);
    throw new Error("Gagal mengupload gambar.");
  }
};

const getPartnership = async (req, res) => {
  try {
    const [result] = await partnershipModel.getPartnership();
    if (result.length === 0) {
      return res.status(404).json({
        message: "Tidak ada data partnership",
      });
    }
    res.status(200).json({
      message: "Data partnership berhasil diambil",
      data: result,
    });
  } catch (error) {
    console.error("Error getting partnership:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const deletePartnership = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await partnershipModel.deletePartnership(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Data partnership tidak ditemukan",
      });
    }
    res.status(200).json({
      message: "Data partnership berhasil dihapus",
    });
  } catch (error) {
    console.error("Error deleting partnership:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  addPartnership,
  getPartnership,
  deletePartnership,
};
