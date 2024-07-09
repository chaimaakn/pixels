const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.post('/upload', upload.single('file'), fileController.uploadFile);
router.get('/files/:id', fileController.getFile);
router.get('/files/:name/download', fileController.downloadFile); // Mise à jour ici
router.delete('/files/:name', fileController.deleteFile); // Mise à jour ici
router.get('/files', fileController.getAllFiles);
router.get('/list', fileController.listFiles);

module.exports = router;
