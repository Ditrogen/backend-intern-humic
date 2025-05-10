const adminService = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const addAdmin = async (req, res) => {
  const { nama_depan, nama_belakang, email, password } = req.body;
  const role = "admin";
  const require = req.role; 

  try {
    if (require === "admin") {
     
      const [foundAdmin] = await adminService.getAdminByEmail(email);
    if (foundAdmin.length > 0) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }
    await adminService.addAdmin(
      nama_depan,
      nama_belakang,
      email,
      password,
      role
    );
    return res.status(200).json({
      message: "Admin created successfully",
    });
      
    } else {
        return res.status(400).json({
        message: "Hanya admin yang bisa mengakses ini",
      });
    }
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getAdmin = async (req, res) => {
  try {
    const [admin] = await adminService.getAdmin();
    
    if (admin.length === 0) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }
    
    return res.status(200).json({
      message: "Get all admin successfully",
      data: admin,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


module.exports = {
    addAdmin,
    getAdmin,
}
