import express from 'express';
import cors from 'cors';
import "dotenv/config";
import connectDb from './config/dbconnection.js';
import  {clerkWebhooks }from './controllers/webhooks.js';
import bodyParser from 'body-parser';
const Port= process.env.PORT || 8000;

//initializing express app
const app= express();
//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization', 'svix-id', 'svix-timestamp', 'svix-signature'],
    preflightContinue: false,
}));
//routes
app.use("/",(req,res)=>{
    res.send("Welcome to the API");
})
app.post("/clerk",express.json(),clerkWebhooks)
app.listen(Port,async()=>{
    console.log(`Server is running on port ${Port}`);
   await connectDb();
});
    