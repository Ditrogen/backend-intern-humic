const db = require("../config/db_connection"); 

const addVisi= async (deskripsi,image_path) => {
  const SQLQuery =
    "INSERT INTO visi (deskripsi,image_path) VALUES (?, ?)";
  return db.execute(SQLQuery, [deskripsi,image_path]);
};

const getVisi = async () => {
    const SQLQuery = "SELECT * FROM visi";
    return db.execute(SQLQuery);
}

const deleteVisi = async (id) => {
    const SQLQuery = "DELETE FROM visi  WHERE id = ?";
    return db.execute(SQLQuery, [id]);
}


module.exports = {  
    addVisi,
    getVisi,
    deleteVisi
   
}