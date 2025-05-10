require("dotenv").config();
const PORT = process.env.PORT;
const express = require("express");
const cors = require("cors");
const app = express();
const adminRoutes = require("./routes/admin.routes");
const authRoutes = require("./routes/auth.routes"); 



app.use(express.json());
app.use(cors());
app.use("/admin-api", adminRoutes);
app.use("/auth-api", authRoutes);


app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});