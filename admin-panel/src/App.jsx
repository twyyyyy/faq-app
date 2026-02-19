import { useEffect, useState } from 'react'
import axios from "axios"
import './App.css'

const API_BASE = "http://localhost:5000";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("");
  const [faqs, setFaqs] = useState([]);
  const [error, setError] = useState("");

  const loadFaqs = async () => {
    try {
      setError("");
      const res = await axios.get(`${API_BASE}/faqs`);
      setFaqs(res.data);
    } catch (e) {
      setError(e?.response?.data?.error || e.message);
    }
  };

  useEffect(() => {
    loadFaqs();
  }, []);

  const handleSave = async () => {
    try {
      setError("");

      await axios.post(`${API_BASE}/faqs`, {
        question,
        answer,
        category
      });

      setQuestion("");
      setAnswer("");
      setCategory("");

      await loadFaqs();
    } catch (e) {
      setError(e?.response?.data?.error || e.message);
    }
  };

  return (
    <>
      <h1>Add FAQ</h1>
      <div>
        <label>Question</label>
        <input value={question} onChange={(e) => setQuestion(e.target.value)}></input>
      </div>

      <div>
        <label>Answer</label>
        <input value={answer} onChange={(e) => setAnswer(e.target.value)}></input>
      </div>

      <div>
        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>General</option>
          <option>Account</option>
          <option>IT</option>
          <option>HR</option>
        </select>
      </div>

      <div>
        <button onClick={handleSave}>SAVE</button>
      </div>

      <h1>Existing FAQs</h1>

      {faqs.length === 0 ? (
        <p>No FAQs yet.</p>
      ) : (
        <ul>
          {faqs.map((f) => (
            <li key={f._id} style={{ marginBottom: 12 }}>
              <div><strong>Q:</strong> {f.question}</div>
              <div><strong>A:</strong> {f.answer}</div>
              <div><strong>Category:</strong> {f.category || "None"}</div>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default App
