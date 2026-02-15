import express from "express"; // load express library (backend framework) into program
const app = express() // create a web server application instance 
const port = 3000 // communication channel for backend. the computer can run many services -> ports separate them

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