const hasilResearchModel = require('../models/hasilResearch');
const path = require('path');
const { deleteFileIfExists } = require('../config/fileHelper');

const addhasilResearch = async (req, res) => {
  const { nama_project } = req.body;
  const { deskripsi } = req.body;
  const image = req.file;
  const {link_project} = req.body;
  
  try {
    const image_path = await uploadGambar(image);
    await hasilResearchModel.addhasilResearch(nama_project,deskripsi, link_project, image_path);
    res.status(200).json({
      message: "Research result data successfully added",
      data: { nama_project,deskripsi, image_path,link_project },
    });
  } catch (error) {
    console.error("Error adding research results:", error);
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

const gethasilResearch = async (req, res) => {
    try {
        const [result] = await hasilResearchModel.gethasilResearch();
        if (result.length === 0) {
            return res.status(404).json({
                message: "There is no research data",
            });
        }
        res.status(200).json({
            message: "Research data was successfully collected",
            data: result,
        });
    } catch (error) {
        console.error("Error getting research results:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
}
const deleteHasilResearch = async (req, res) => {
    try {
        const { id } = req.params;
        const [hasilResearch] = await hasilResearchModel.gethasilResearchById(id);

        if (hasilResearch.length === 0) {
          return res.status(404).json({
            messsage: "Hasil research not found",
          });
        }

        console.log(hasilResearch)
        const image_path = hasilResearch[0].image_path;
        console.log(image_path)

        if (image_path) {
          const fileName = path.basename(image_path);
          await deleteFileIfExists(fileName);
        }

        await hasilResearchModel.deletehasilResearch(id);
        res.status(200).json({
            message: "Research result data successfully deleted",
        });
    } catch (error) {
        console.error("Error deleting research results :", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
}

const gethasilResearchById = async (req, res) => {
    try {
      const { id } = req.params
      const [hasilResearch] = await hasilResearchModel.gethasilResearchById(id);

        if (hasilResearch.length === 0) {
          return res.status(404).json({
            messsage: "Hasil research not found",
          });
        }

        res.status(200).json({
            message: "Research data was successfully collected",
            data: hasilResearch,
        });
    } catch (error) {
        console.error("Error getting research results:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
}

const updateHasilResearch = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_project, deskripsi, link_project } = req.body;
    const image = req.file;

    const [existing] = await hasilResearchModel.gethasilResearchById(id);

    if (existing.length === 0) {
      return res.status(404).json({ message: "Hasil research not found" });
    }

    const currentData = existing[0];
    let image_path = existing[0].image_path;

    if (image) {
      const oldFile = path.basename(image_path);
      await deleteFileIfExists(oldFile);

      image_path = await uploadGambar(image);
    }

    const updatedData = {
      nama_project: nama_project?.trim() ? nama_project : currentData.nama_project,
      deskripsi: deskripsi?.trim() ? deskripsi : currentData.deskripsi,
      link_project: link_project?.trim() ? link_project : currentData.link_project,
      image_path,
    };

    await hasilResearchModel.updateHasilResearch(
      id,
      updatedData.nama_project,
      updatedData.deskripsi,
      updatedData.link_project,
      updatedData.image_path
    );

    return res.status(200).json({
      message: "Hasil research successfully updated",
      data: {
        id,
        nama_project: updatedData.nama_project,
        deskripsi: updatedData.deskripsi,
        link_project: updatedData.link_project,
        image_path: updatedData.image_path,
      },
    });
  } catch (error) {
    console.error("Error updating research:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
    addhasilResearch,
    gethasilResearch,
    gethasilResearchById,
    updateHasilResearch,
    deleteHasilResearch
}