const partnershipModel = require("../models/partnership");
const path = require('path');
const { deleteFileIfExists } = require('../config/fileHelper');

const addPartnership = async (req, res) => {
  const { nama_partner } = req.body;
  const image = req.file;
  
  try {
    const image_path = await uploadGambar(image);
    await partnershipModel.addPartnership(nama_partner, image_path);
    res.status(200).json({
      message: "Partnership data successfully added",
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
      throw new Error("Please upload an image!");
    }

    const file = `/uploads/${image.filename}`;
    return file;
  } catch (error) {
    console.error(error.message);
    throw new Error("Failed to upload image.");
  }
};

const getPartnership = async (req, res) => {
  try {
    const [result] = await partnershipModel.getPartnership();
    if (result.length === 0) {
      return res.status(404).json({
        message: "No partnership data",
      });
    }
    res.status(200).json({
      message: "Partnership data successfully retrieved",
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
        message: "Partnership data not found",
      });
    }
    res.status(200).json({
      message: "Partnership data successfully deleted",
    });
  } catch (error) {
    console.error("Error deleting partnership:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getPartnershipById = async (req, res) => {
    try {
      const { id } = req.params
      const [partnership] = await partnershipModel.getPartnershipById(id);

        if (partnership.length === 0) {
          return res.status(404).json({
            messsage: "partnership not found",
          });
        }

        res.status(200).json({
            message: "patnership data was successfully collected",
            data: partnership,
        });
    } catch (error) {
        console.error("Error getting partnership results:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
}

const updatePartnership = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_partner } = req.body;
    const image = req.file;

    const [existing] = await partnershipModel.getPartnershipById(id);

    if (existing.length === 0) {
      return res.status(404).json({ message: "Partnership not found" });
    }

    const currentData = existing[0];
    let image_path = existing[0].image_path;

    if (image) {
      const oldFile = path.basename(image_path);
      await deleteFileIfExists(oldFile);

      image_path = await uploadGambar(image);
    }

    const updatedData = {
      nama_partner: nama_partner?.trim() ? nama_partner : currentData.nama_partner,
      image_path,
    };
    //console.log("form:",nama_partner, "db", currentData.nama_partner, "updated",updatedData.nama_partner)


    await partnershipModel.updatePartnership(
      id,
      updatedData.nama_partner,
      updatedData.image_path
    );

    return res.status(200).json({
      message: "Partnership successfully updated",
      data: { id, nama_partner: updatedData.nama_partner, image_path: updatedData.image_path },
    });
  } catch (error) {
    console.error("Error updating partnership:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  addPartnership,
  getPartnership,
  getPartnershipById,
  updatePartnership,
  deletePartnership,
};
