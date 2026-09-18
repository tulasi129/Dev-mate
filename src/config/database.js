const dns = require("dns");

dns.setServers(["8.8.8.8"]);

const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async () => {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
        throw new Error("MONGODB_URI is not configured");
    }

    await mongoose.connect(mongoUri);
};


module.exports = dbConnect;
