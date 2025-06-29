// const mongoose=require('mongoose');

// exports.ConnectToDb=async()=>{
//     try {
//         mongoose.connect(process.env.url)
//         console.log("Database connect successfully")
//     } catch (err) {
//         console.log(err.message)
        
//     }
// }
require('dotenv').config();  

const mongoose = require('mongoose');

exports.ConnectToDb = async () => {
    try {
        const url = process.env.url;
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Database connected successfully");
    } catch (err) {
        console.error("Database connection error: ", err.message);
    }
};
