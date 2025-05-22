const multer = require("multer");
const path = require("path");
const fs = require("fs");

// MENGGUNAKAN FIREBASE
// const storage = multer.memoryStorage({
//   filename: (req, file, cb) => {
//       const timestamp = new Date().getTime();

//       cb(null, `${timestamp}-${file.originalname}`);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (
//       file.mimetype === 'image/jpeg' ||
//       file.mimetype === 'image/jpg' ||
//       file.mimetype === 'image/png'
//   ) {
//       cb(null, true);
//   } else {
//       const errMsg = 'Hanya boleh upload gambar (jpeg, jpg, png)';
//       req.fileValidationError = errMsg;
//       return cb(new Error(errMsg), false);
//   }
// };
// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter

// });

// module.exports = upload;

// STATIC FILE
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file dengan timestamp
  },
  fileFilter: (req, file, cb) => {
    if (
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'application/pdf' 
    ) {
        cb(null, true);
    } else {
        const errMsg = 'Can only upload images (jpeg, jpg, png)';
        req.fileValidationError = errMsg;
        return cb(new Error(errMsg), false);
    }
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
