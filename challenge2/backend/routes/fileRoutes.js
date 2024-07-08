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
router.get('/files/:id/download', fileController.downloadFile);
router.patch('/files/:id', fileController.updateFile);
router.delete('/files/:id', fileController.deleteFile);
router.get('/files', fileController.getAllFiles);
router.get('/list', fileController.listFiles); 


module.exports = router;
