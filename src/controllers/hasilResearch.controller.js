const hasilResearchModel = require('../models/hasilResearch'); 

const addhasilResearch = async (req, res) => {
     const { nama_project } = req.body;
     const { deskripsi } = req.body;
     const image = req.file;
     const {link_project} = req.body;
      
      try {
        const image_path = await uploadGambar(image);
        await hasilResearchModel.addhasilResearch(nama_project,deskripsi, image_path,link_project);
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
        await hasilResearchModel.deleteHasilResearch(id);
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

module.exports = {
    addhasilResearch,
    gethasilResearch,
    deleteHasilResearch
}