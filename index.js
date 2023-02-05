const express = require('express');
const app = express();
require('dotenv').config()
const port = process.env.PORT ? process.env.PORT : 3000;
const host = `127.0.0.1`            // URL localhost
const authRouter = require('./routes/authRoutes');
const { connectDB } = require('./connection/dbConnection');
const { routeNotFound } = require('./middlewares/middleware');

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes
app.use(`/api/user`, authRouter);

// not found middleware(route)
app.use(routeNotFound);

async function startServer(){
    try{
        await connectDB(process.env.DB_URL);
        app.listen(port, host, (err) => {
            if(err){
                console.log(`Error occurred, server can't start: ${err}`)
            }else{
                console.log(`Server is listening over http://${host}:${port}`)
            }
        })
    }catch(err){
        console.error("Error in starting server, Error is: "+err);
    }
}

startServer();



