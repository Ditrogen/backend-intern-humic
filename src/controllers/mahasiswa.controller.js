const mahasiswaModel = require("../models/mahasiswa");

const getAllMahasiswa = async (req, res) => {
  try {
    const [result] = await mahasiswaModel.getAllMahasiswa();
    res.status(200).json({
      message: "Student data retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error fetching all students:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  getAllMahasiswa,
};
