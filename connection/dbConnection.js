const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
const connectDB = async (dbURL) => {
    console.log("------------------- Inside connectDB method -----------------------------")
    try{
       const connection = await mongoose.connect(dbURL);
       if(connection) console.log(`Successfully connected to database`)
       return connection;
    }
    catch(err){
        console.log('Error in connecting to DB, Error is: '+err)
        return Promise.reject(err);
    }
}

module.exports = { connectDB }