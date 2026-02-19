import express from "express"; // load express library (backend framework) into program
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import Faq from "./models/faq.js";

dotenv.config(); 

const app = express() // create a web server application instance 
const port = process.env.PORT || 3000 // use environment-defined port, otherwise default. the computer can run many services -> ports separate them
app.use(express.json());
app.use(cors());

// this portion means: when someone visits /, run this function. 
// app.get() defines a route handler for HTTP GET requests 
// / represents the root URL 
// (req,res) automatically provided by express 
app.get('/', (req,res) => {
    res.send('Hello World') // server sends response back 
})

// GET ALL FAQS 
app.get("/faqs", async (req, res) => { // when the server receives a http get request to /faqs, run this function 
    const faqs = await Faq.find(); // retrieves documents from mongodb collection associated with the faq model 
    res.json(faqs); // sends the result back to the client as json 
});

// CREATE FAQ 
app.post("/faqs", async (req, res) => { // when the server receives a http post request to /faqs, run this function. POST is used to create new data 
    const faq = await Faq.create(req.body); // creates and saves a new FAQ document into mongodb 
    res.status(201).json(faq);
});

// UPDATE FAQ
app.put("/faqs/:id", async (req, res) => {
  try {
    const updatedFaq = await Faq.findByIdAndUpdate(
      req.params.id,      // FAQ ID from URL
      req.body,           // New data from frontend
      {
        new: true,        // Return updated document
        runValidators: true
      }
    );

    if (!updatedFaq) {
      return res.status(404).json({ error: "FAQ not found" });
    }

    res.json(updatedFaq);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE FAQ
app.delete("/faqs/:id", async (req, res) => {
  try {
    const deletedFaq = await Faq.findByIdAndDelete(req.params.id);

    if (!deletedFaq) {
      return res.status(404).json({ error: "FAQ not found" });
    }

    res.status(204).send();   // Success, no content
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));

app.listen(port, () => { // start the server and listen for incoming requests on this port
    console.log(`Server running at http://localhost:${port}`)
})