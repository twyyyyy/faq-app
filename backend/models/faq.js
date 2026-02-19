import mongoose from "mongoose"; // load mongoose library. enables mongodb interaction 

const faqSchema = new mongoose.Schema( // defines the blueprint of an faq document. schema = data structure definition
  {
    // defining fields. "every faq will contain these fields"
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true, trim: true },
    category: { type: String, trim: true } // optional
  },
  { timestamps: true } // mongoose automatically adds "createdAt / updatedAt"
);

/*
the mongodb document becomes: 

    {
        "question": "...",
        "answer": "...",
        "createdAt": "...",
        "updatedAt": "..."
    }

*/

export default mongoose.model("Faq", faqSchema); // converts schema into a usable database model 