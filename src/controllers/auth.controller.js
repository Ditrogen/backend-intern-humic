const adminService = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => { 
    const { email, password } = req.body;
    
    try {
        const [foundAdmin] = await adminService.getAdminByEmail(email);
        if (foundAdmin.length === 0) {
        return res.status(400).json({
            message: "Invalid email or password",
        });
        }
    
        const isPasswordValid = await bcrypt.compare(
        password,
        foundAdmin[0].password
        );
        if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password",
        });
        }
    
        const token = jwt.sign(
        { id: foundAdmin[0].id, role: foundAdmin[0].role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
        );
    
        return res.status(200).json({
        message: "Login successful",
        token,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
        message: "Internal server error",
        });
    }

}

const me = async (req, res) => {
    const  id  = req.id;
    try {
        console.log(id);
        const [admin] = await adminService.getAdminById(id);
        if (admin.length === 0) {
            return res.status(404).json({
                message: "Admin not found",
            });
        }
        return res.status(200).json({
            message: "Get admin successfully",
            data: admin[0],
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}

module.exports = {
    login,
    me,
}