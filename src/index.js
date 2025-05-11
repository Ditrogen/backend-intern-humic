require("dotenv").config();
const PORT = process.env.PORT;
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const adminRoutes = require("./routes/admin.routes");
const authRoutes = require("./routes/auth.routes"); 
const lowonganMagangRoutes = require("./routes/lowonganMagang.routes");
const lamaranMagangRoutes = require("./routes/lamaranMagang.routes");
const mahasiswaRoutes = require("./routes/mahasiswa.routes");
const partnershipRoutes = require("./routes/partnership.routes");
const hasilResearchRoutes = require("./routes/hasilResearch.routes");



app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/admin-api", adminRoutes);
app.use("/auth-api", authRoutes);
app.use("/lowongan-magang-api", lowonganMagangRoutes); 
app.use("/lamaran-magang-api", lamaranMagangRoutes);
app.use("/mahasiswa-api", mahasiswaRoutes);
app.use("/partnership-api", partnershipRoutes); 
app.use("/hasil-research-api", hasilResearchRoutes);

app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});