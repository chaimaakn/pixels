const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');  // Importer cors
const fileRoutes = require('./routes/fileRoutes');
const errorHandler = require('./middlewares/errorHandler');
const ConnectDb = require("./database/main.js");

dotenv.config();

const app = express();
// Utiliser le middleware CORS
app.use(cors());

app.use((req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    next();
});

app.get("/verify", function(req, res) {
    res.json("your token is invalid");
});

// Middleware
app.use(express.json());

// Routes
app.use('/api', fileRoutes);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

async function start() {
    try {
        await ConnectDb(process.env.MONGODB_URI);
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Database connection error:', error);
    }
}

start();

