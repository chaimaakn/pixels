const File = require('../models/fileModel');
const fs = require('fs');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

// Upload file and save metadata
const uploadFile = async (req, res) => {
    const { description } = req.body;
    const { originalname, mimetype, path: filePath, size } = req.file;

    const fileStream = fs.createReadStream(filePath);

    const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: originalname,
        Body: fileStream,
        ContentType: mimetype
    };

    s3.upload(uploadParams, async (err, data) => {
        if (err) {
            return res.status(500).json({ status: 'error', message: err.message });
        }

        const file = new File({
            name: originalname,
            size: size,
            description: description,
            mime_type: mimetype,
            path: data.Location // Store S3 URL instead of local path
        });

        await file.save();
        res.status(201).json({ status: 'success', data: { id: file._id } });
    });
};

// Get file info by id
const getFile = async (req, res) => {
        try {
            const file = await File.findById(req.params.id);
            if (!file) {
                return res.status(404).json({ status: 'error', message: 'File not found' });
            }
            res.json({ status: 'success', data: file });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    };

// Download file by id
const downloadFile = async (req, res) => {
    try {
        const file = await File.findById(req.params.id);
        if (!file) {
            return res.status(404).json({ status: 'error', message: 'File not found' });
        }
        res.redirect(file.path);
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// Update file info
const updateFile = async (req, res) => {
    try {
        const file = await File.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!file) {
            return res.status(404).json({ status: 'error', message: 'File not found' });
        }
        res.json({ status: 'success', data: file });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
};

// Delete file by id
const deleteFile = async (req, res) => {
    try {
        const file = await File.findByIdAndDelete(req.params.id);
        if (!file) {
            return res.status(404).json({ status: 'error', message: 'File not found' });
        }
        fs.unlinkSync(file.path);
        res.json({ status: 'success', message: 'File deleted' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

module.exports = {
    uploadFile,
    getFile,
    downloadFile,
    updateFile,
    deleteFile
};
