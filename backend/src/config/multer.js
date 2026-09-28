const path = require('path');
const multer = require('multer');
const fs = require('fs');

const uploadDir = process.env.UPLOAD_PATH || 'uploads';
const profileDir = path.join(uploadDir, 'profiles');
const leaveDir = path.join(uploadDir, 'leave');

[uploadDir, profileDir, leaveDir].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const storage = (folder) =>
  multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, folder),
    filename: (_req, file, cb) => {
      const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      cb(null, `${unique}${path.extname(file.originalname)}`);
    },
  });

const fileFilter = (_req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif|webp|pdf|doc|docx/;
  const ext = allowed.test(path.extname(file.originalname).toLowerCase());
  const mime = allowed.test(file.mimetype.split('/')[1]) || file.mimetype.includes('pdf') || file.mimetype.includes('document');
  if (ext || mime) cb(null, true);
  else cb(new Error('Invalid file type'), false);
};

const profileUpload = multer({
  storage: storage(profileDir),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
});

const leaveUpload = multer({
  storage: storage(leaveDir),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter,
});

module.exports = { profileUpload, leaveUpload, uploadDir };
