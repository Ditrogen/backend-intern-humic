const db = require("../config/db_connection");

const addhasilResearch = async (image_path,nama_project,deskripsi) => {
  const SQLQuery =
    "INSERT INTO hasil_research (image_path,nama_project,deskripsi) VALUES (?, ?,?)";
  return db.execute(SQLQuery, [image_path,nama_project,deskripsi]);
};

const gethasilResearch = async () => {
    const SQLQuery = "SELECT * FROM hasil_research";
    return db.execute(SQLQuery);
}

const deletehasilResearch = async (id) => {
    const SQLQuery = "DELETE FROM hasil_research WHERE id = ?";
    return db.execute(SQLQuery, [id]);
}


module.exports = {
    addhasilResearch,
    gethasilResearch,
    deletehasilResearch
}