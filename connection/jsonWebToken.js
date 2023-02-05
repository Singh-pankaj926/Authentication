const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateToken(payload){
    console.log("-------------------- Inside jsonWebToken generateToken Method -------------------");
    try{
        const generatedToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        return generatedToken;
    }
    catch(err){
        console.error("Error in jsonWebToken generateToken Method is: "+err);
        throw new Error(err);
    }
};

module.exports = { generateToken }