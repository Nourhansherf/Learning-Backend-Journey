require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.DBURI;

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(uri);
        console.log(`Database connected : ${conn.connection.host}`);
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;