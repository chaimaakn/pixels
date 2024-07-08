const mongoose = require('mongoose');

async function ConnectDb(url) {
    try {
        await mongoose.connect(url, {
            dbName: "Hollow"
        });
        console.log("Connected to the database");
    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1); // Exit process with failure
    }
}

module.exports = ConnectDb;
