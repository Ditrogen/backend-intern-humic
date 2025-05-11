const hasilResearchModel = require('../models/hasilResearch'); 

const addHasilResearch = async (req, res) => {
     const { nama_project } = req.body;
     const { deskripsi } = req.body;
     const image = req.file;
      
      try {
        const image_path = await uploadGambar(image);
        await hasilResearchModel.addhasilResearch(nama_project,deskripsi, image_path);
        res.status(200).json({
          message: "Data hasil research berhasil ditambahkan",
          data: { nama_project,deskripsi, image_path },
        });
      } catch (error) {
        console.error("Error menambahkan hasik research:", error);
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

const gethasilResearch = async (req, res) => {
    try {
        const [result] = await hasilResearchModel.gethasilResearch();
        if (result.length === 0) {
            return res.status(404).json({
                message: "Tidak ada data hasil research",
            });
        }
        res.status(200).json({
            message: "Data hasil research berhasil diambil",
            data: result,
        });
    } catch (error) {
        console.error("Error getting hasil research:", error);
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
            message: "Data hasil research berhasil dihapus",
        });
    } catch (error) {
        console.error("Error deleting hasil research:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
}

module.exports = {
    addHasilResearch,
    gethasilResearch,
    deleteHasilResearch
}