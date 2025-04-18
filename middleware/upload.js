const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `course-${Date.now()}${ext}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });
module.exports = upload;
