const db = require('../config/db_connection'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');    

const addAdmin = async (
  nama_depan,
  nama_belakang,
  email,
  plainpassword,
  role

) => {
  const saltRounds = 10;
  const hashedPass = await bcrypt.hash(plainpassword, saltRounds);
  const SQLQuery =
    "INSERT INTO admin (nama_depan, nama_belakang, email, password, role) VALUES (? ,?, ?, ?, ?)";
  return db.execute(SQLQuery, [
    nama_depan,
    nama_belakang,
    email,
    hashedPass,
    role,
  ]);
};

const getAdmin = async () => {
    const SQLQuery = "SELECT * FROM admin";
    return db.execute(SQLQuery);
}

const getAdminByEmail = async (email) => {
    const SQLQuery = "SELECT * FROM admin WHERE email = ?";
    return db.execute(SQLQuery, [email]);
}

const getAdminById = async (id) => {
    const SQLQuery = "SELECT * FROM admin WHERE id = ?";
    return db.execute(SQLQuery, [id]);
}

module.exports= {
  addAdmin,
  getAdmin,
  getAdminByEmail,
  getAdminById
};


