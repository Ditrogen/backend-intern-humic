const mahasiswaModel = require("../models/mahasiswa");
const lowonganMagangModel = require("../models/lowonganMagang");
const lamaranMagangModel = require("../models/lamaranMagang");
const transporter = require("../config/mail");
const ExcelJS = require('exceljs');
require("dotenv").config();

const addLamaranMagang = async (req, res) => {
  const { id_lowongan_magang } = req.params;
  const {
    nama_depan,
    nama_belakang,
    email,
    kontak,
    jurusan,
    angkatan,
    motivasi,
    relevant_skills,
  } = req.body;

  const CV = req.files.cv?.[0];
  const Portofolio = req.files.portofolio?.[0];
  const status = "diproses";
  const role = "student";

  try {
    const cv_path = await uploadCV(CV);
    const portofolio_path = await uploadPortofolio(Portofolio);

    const [lowonganMagang] = await lowonganMagangModel.getLowonganMagangById(
      id_lowongan_magang
    );

    if (lowonganMagang.length === 0) {
      return res.status(404).json({
        message: "Internship vacancy not found.",
      });
    }
    
    const namaBelakangFinal = nama_belakang?.trim() || null;

    const dataMahasiswa = {
      nama_depan,
      nama_belakang: namaBelakangFinal,
      email,
      kontak,
      jurusan,
      angkatan,
      role,
      cv_path,
      portofolio_path,
      motivasi,
      relevant_skills,
    };

    const result = await mahasiswaModel.addMahasiswa(
      nama_depan,
      namaBelakangFinal,
      email,
      kontak,
      jurusan,
      angkatan,
      role,
      cv_path,
      portofolio_path,
      motivasi,
      relevant_skills
    );

    const id_mahasiswa = result[0].insertId;

    await lamaranMagangModel.addlowonganMagang(
      id_mahasiswa,
      id_lowongan_magang,
      status
    );

    await sendEmail(dataMahasiswa, lowonganMagang[0]);

    res.status(200).json({
      message: "Internship application submitted successfully.",
      data: {
        id_lowongan_magang,
        dataMahasiswa,
        status,
      },
    });
  } catch (error) {
    console.error("Error adding internship application:", error);
    res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    });
  }
};


const uploadCV = async (CV) => {
  try {
    if (!CV) {
      throw new Error("Please upload your CV.");
    }

    const file = `/uploads/${CV.filename}`;
    return file;
  } catch (error) {
    console.error(error.message);
    throw new Error("Failed to upload CV.");
  }
};

const uploadPortofolio = async (portofolio) => {
  try {
    if (!portofolio) {
      throw new Error("Please upload your portfolio.");
    }
    const file = `/uploads/${portofolio.filename}`;
    return file;
  } catch (error) {
    console.error(error.message);
    throw new Error("Failed to upload portfolio.");
  }
};

const getAllLamaranMagang = async (req, res) => {
  try {
    const [result] = await lamaranMagangModel.getAllLamaranMagang();
    if (result.length === 0) {
      return res.status(404).json({
        message: "No internship applications found.",
      });
    }
    res.status(200).json({
      message: "Internship applications retrieved successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Error fetching all internship applications:", error);
    res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    });
  }
};

const getLamaranByID = async (req, res) => {
  const { id_lamaran_magang } = req.params;
  try {
    const [result] = await lamaranMagangModel.getLamaranByID(
      id_lamaran_magang
    );
    if (result.length === 0) {
      return res.status(404).json({
        message: "No internship applications found.",
      });
    }
    res.status(200).json({
      message: "Internship applications retrieved successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Error fetching internship applications by ID:", error);
    res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    });
  }
};

const updateStatusLamaran = async (req, res) => {
  const { id_lamaran_magang } = req.params;
  const { status } = req.body;
  const role = req.role;

  try {
    if (role !== "admin") {
      return res.status(403).json({
        message: "Unauthorized access.",
      });
    }

    const [lamaran] = await lamaranMagangModel.getDetailLamaranById(
      id_lamaran_magang
    );
    console.log(lamaran[0]);
    if (lamaran.length === 0) {
      return res.status(404).json({
        message: "Internship application not found.",
      });
    }

    await lamaranMagangModel.updateStatusLamaran(id_lamaran_magang, status);
    res.status(200).json({
      message: "Internship application status successfully updated.",
    });

    await sendStatusEmail(lamaran[0], status)
  } catch (error) {
    console.error("Error updating internship application status:", error);
    res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    });
  }
};

const sendEmail = async (dataMahasiswa, dataPekerjaan) => {
  try {
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: dataMahasiswa.email,
      subject: "Konfirmasi Penerimaan Lamaran Anda",
      headers: {
        "X-Priority": "1",
        "X-MSMail-Priority": "High",
        Importance: "high",
      },
      html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
      <h2 style="color: #333;">Lamaran Anda Telah Kami Terima</h2>
      <p>Halo ${dataMahasiswa.nama_depan} ${dataMahasiswa.nama_belakang},</p>

      <p>Terima kasih telah mengirimkan lamaran untuk posisi <strong>${dataPekerjaan.posisi}</strong> di <strong>Humic Enginerring</strong>.</p>

      <p>Kami telah menerima dokumen dan informasi yang Anda kirimkan, dan saat ini tim rekrutmen kami sedang meninjaunya dengan seksama.</p>

      <p>Jika profil Anda sesuai dengan kebutuhan kami, tim kami akan menghubungi Anda untuk tahapan seleksi berikutnya. Proses ini dapat memakan waktu hingga beberapa minggu.</p>

      <p>Kami sangat menghargai minat Anda untuk bergabung bersama tim kami.</p>

      <p>Salam hangat,</p>
      <p><strong>Tim Rekrutmen Humic Enginerring</strong></p>

      <hr style="margin: 30px 0;">
      <p style="font-size: 12px; color: #888;">Email ini dikirim secara otomatis. Jika Anda memiliki pertanyaan lebih lanjut, silakan hubungi kami melalui email resmi yang tersedia di website kami.</p>
    </div>
  `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error mengirim email lamaran magang:", error);
  }
};

const sendStatusEmail = async (dataLamaran, statusLamaran) => {
  try {
    const isAccepted = statusLamaran === "diterima";

    const subject = isAccepted
      ? "Selamat! Lamaran Anda Diterima"
      : "Pemberitahuan Status Lamaran Anda";

    const messageContent = isAccepted
      ? `
        <p>Halo ${dataLamaran.nama_depan} ${dataLamaran.nama_belakang},</p>
        <p>Selamat! Lamaran Anda untuk posisi <strong>${dataLamaran.posisi}</strong> di <strong>Humic Enginerring</strong> telah diterima.</p>
        <p>Tim kami sangat terkesan dengan profil dan kualifikasi Anda. Kami akan segera menghubungi Anda terkait tahapan selanjutnya.</p>
        <p>Terima kasih telah melamar dan kami menantikan kerja sama yang luar biasa bersama Anda.</p>
      `
      : `
        <p>Halo ${dataLamaran.nama_depan} ${dataLamaran.nama_belakang},</p>
        <p>Terima kasih atas lamaran Anda untuk posisi <strong>${dataLamaran.posisi}</strong> di <strong>Humic Enginerring</strong>.</p>
        <p>Setelah mempertimbangkan secara seksama, kami memutuskan untuk tidak melanjutkan proses lamaran Anda ke tahap berikutnya.</p>
        <p>Jangan berkecil hati—kami sangat menghargai waktu dan usaha Anda. Kami mendorong Anda untuk terus mencoba dan semoga sukses dalam perjalanan karier Anda.</p>
      `;

    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: dataLamaran.email,
      subject,
      headers: {
        "X-Priority": "1",
        "X-MSMail-Priority": "High",
        Importance: "high",
      },
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          ${messageContent}
          <p>Salam hangat,</p>
          <p><strong>Tim Rekrutmen Humic Enginerring</strong></p>
          <hr style="margin: 30px 0;">
          <p style="font-size: 12px; color: #888;">Email ini dikirim secara otomatis. Untuk informasi lebih lanjut, silakan hubungi kami melalui kontak resmi.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Gagal mengirim email status lamaran:", error);
  }
};

const exportDataToExcel = async (req,res) => {
  try {
    const [rows] = await lamaranMagangModel.getAllExportData();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data');

    // Add header
    const headers = Object.keys(rows[0]);
    worksheet.addRow(headers);

    // Add rows
    rows.forEach(row => {
      worksheet.addRow(Object.values(row));
    });

    // setting header buat file excel
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=data.xlsx');

    await workbook.xlsx.write(res);
    res.end();

  } catch (err) {
    console.error(err);
    res.status(500).send('Error generating Excel file');
  }
}

module.exports = {
  addLamaranMagang,
  getAllLamaranMagang,
  getLamaranByID,
  updateStatusLamaran,
  exportDataToExcel,
};
