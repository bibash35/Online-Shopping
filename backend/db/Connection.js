const mongoose=require('mongoose');

exports.ConnectToDb=async()=>{
    try {
        mongoose.connect(process.env.url)
        console.log("Database connect successfully")
    } catch (err) {
        console.log(err.message)
        
    }
}
