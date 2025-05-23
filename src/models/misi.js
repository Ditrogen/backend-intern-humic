const db = require("../config/db_connection"); 

const addMisi= async (deskripsi,image_path) => {
  const SQLQuery =
    "INSERT INTO misi (deskripsi,image_path) VALUES (?, ?)";
  return db.execute(SQLQuery, [deskripsi,image_path]);
};

const getMisi = async () => {
    const SQLQuery = "SELECT * FROM misi";
    return db.execute(SQLQuery);
}

const deleteMisi = async (id) => {
    const SQLQuery = "DELETE FROM misi  WHERE id = ?";
    return db.execute(SQLQuery, [id]);
}


module.exports = {  
    addMisi,
    getMisi,
    deleteMisi
   
}