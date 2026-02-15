import express from "express"; // load express library (backend framework) into program
import dotenv from "dotenv";
import mongoose from "mongoose";
const app = express() // create a web server application instance 
const port = process.env.PORT || 3000 // use environment-defined port, otherwise default. the computer can run many services -> ports separate them
dotenv.config(); 

// this portion means: when someone visits /, run this function. 
// app.get() defines a route handler for HTTP GET requests 
// / represents the root URL 
// (req,res) automatically provided by express 
app.get('/', (req,res) => {
    res.send('Hello World') // server sends response back 
})

app.listen(port, () => { // start the server and listen for incoming requests on this port
    console.log(`Server running at http://localhost:${port}`)
})

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));