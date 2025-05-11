const db = require("../config/db_connection");

const addPartnership = async (nama_partner,image_path) => {
  const SQLQuery =
    "INSERT INTO partnership (nama_partner,image_path) VALUES (?, ?)";
  return db.execute(SQLQuery, [nama_partner,image_path]);
};

const getPartnership = async () => {
    const SQLQuery = "SELECT * FROM partnership";
    return db.execute(SQLQuery);
}

const deletePartnership = async (id) => {
    const SQLQuery = "DELETE FROM partnership WHERE id = ?";
    return db.execute(SQLQuery, [id]);
}


module.exports = {  
    addPartnership,
    getPartnership,
    deletePartnership
}