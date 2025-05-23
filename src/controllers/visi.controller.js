const visiModel = require("../models/visi");

const addVisi = async (req, res) => {
  const { deskripsi } = req.body;
  const image = req.file;
  
  try {
    const image_path = await uploadGambar(image);
    await visiModel.addVisi(deskripsi, image_path);
    res.status(200).json({
      message: "Visi data successfully added",
      data: {deskripsi, image_path },
    });
  } catch (error) {
    console.error("Error adding Visi :", error);
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

const getVisi = async (req, res) => {
  try {
    const [result] = await visiModel.getVisi();
    if (result.length === 0) {
      return res.status(404).json({
        message: "No Visi data",
      });
    }
    res.status(200).json({
      message: "Visi data successfully retrieved",
      data: result,
    });
  } catch (error) {
    console.error("Error getting Visi:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const deleteVisi= async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await visiModel.deleteVisi(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Visi data not found",
      });
    }
    res.status(200).json({
      message: "Visi data successfully deleted",
    });
  } catch (error) {
    console.error("Error deleting Visi:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
    addVisi,
    getVisi,
    deleteVisi, 

};
