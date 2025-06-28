const db = require("../config/db_connection");
const { link } = require("../routes/admin.routes");

const addhasilResearch = async (nama_project,deskripsi, link_project, image_path) => {
  const SQLQuery =
    "INSERT INTO hasil_research (nama_project, deskripsi, link_project, image_path) VALUES (?,?,?,?)";
  return db.execute(SQLQuery, [nama_project,deskripsi, link_project, image_path]);
};

const gethasilResearch = async () => {
    const SQLQuery = "SELECT * FROM hasil_research";
    return db.execute(SQLQuery);
}

const gethasilResearchById = async (id) => {
  const SQLQuery = "SELECT * FROM hasil_research WHERE id = ?"
  return db.execute(SQLQuery, [id])
}

const updateHasilResearch = async (id, nama_project, deskripsi, link_project, image_path) => {
  const SQLQuery = `
    UPDATE hasil_research 
    SET nama_project = ?, deskripsi = ?, link_project = ?, image_path = ? 
    WHERE id = ?
  `;
  return db.execute(SQLQuery, [nama_project, deskripsi, link_project, image_path, id]);
};

const deletehasilResearch = async (id) => {
    const SQLQuery = "DELETE FROM hasil_research WHERE id = ?";
    return db.execute(SQLQuery, [id]);
}


module.exports = {
    addhasilResearch,
    gethasilResearch,
    gethasilResearchById,
    updateHasilResearch,
    deletehasilResearch
}