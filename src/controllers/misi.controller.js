const misiModel = require("../models/misi");

const addMisi= async (req, res) => {
  const { deskripsi } = req.body;
  const image = req.file;
  
  try {
    const image_path = await uploadGambar(image);
    await misiModel.addMisi(deskripsi, image_path);
    res.status(200).json({
      message: "Misi data successfully added",
      data: {deskripsi, image_path },
    });
  } catch (error) {
    console.error("Error adding Misi:", error);
    res.status(500).json({
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

const getMisi= async (req, res) => {
  try {
    const [result] = await misiModel.getMisi();
    if (result.length === 0) {
      return res.status(404).json({
        message: "No Misi data",
      });
    }
    res.status(200).json({
      message: "Misi data successfully retrieved",
      data: result,
    });
  } catch (error) {
    console.error("Error getting Misi:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const deleteMisi= async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await misiModel.deleteMisi(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Misidata not found",
      });
    }
    res.status(200).json({
      message: "Misi data successfully deleted",
    });
  } catch (error) {
    console.error("Error deleting Misi:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
    addMisi,
    getMisi,
    deleteMisi

};
