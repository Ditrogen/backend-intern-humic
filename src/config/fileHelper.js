const path = require('path');
const fs = require('fs').promises;

async function deleteFileIfExists(fileName) {
  try {
    // Pastikan path absolut menuju folder uploads
    const fullPath = path.join(__dirname, '..', 'uploads', fileName);

    await fs.access(fullPath);
    await fs.unlink(fullPath);
    console.log(` File dihapus: ${fullPath}`);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.warn(` File tidak ditemukan: ${fileName}`);
    } else {
      console.error(` Gagal menghapus file (${fileName}):`, err.message);
    }
  }
}

module.exports = {
  deleteFileIfExists,
};
