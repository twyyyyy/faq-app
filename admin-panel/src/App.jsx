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
  const [editingId, setEditingId] = useState(null);
  const [editQuestion, setEditQuestion] = useState("");
  const [editAnswer, setEditAnswer] = useState("");
  const [editCategory, setEditCategory] = useState("");

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

  const handleSaveNew = async () => {
    try {
      setError("");
      await axios.post(`${API_BASE}/faqs`, { question, answer, category });

      setQuestion("");
      setAnswer("");
      setCategory("General");
      await loadFaqs();
    } catch (e) {
      setError(e?.response?.data?.error || e.message);
    }
  };

  const startEdit = (f) => {
    setEditingId(f._id);
    setEditQuestion(f.question || "");
    setEditAnswer(f.answer || "");
    setEditCategory(f.category || "General");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditQuestion("");
    setEditAnswer("");
    setEditCategory("");
  };

  const saveEdit = async () => {
    try {
      setError("");
      await axios.put(`${API_BASE}/faqs/${editingId}`, {
        question: editQuestion,
        answer: editAnswer,
        category: editCategory,
      });

      cancelEdit();
      await loadFaqs();
    } catch (e) {
      setError(e?.response?.data?.error || e.message);
    }
  };

  const deleteFaq = async (id) => {
    const ok = window.confirm("Delete this FAQ?");
    if (!ok) return;

    try {
      setError("");
      await axios.delete(`${API_BASE}/faqs/${id}`);
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
        <button onClick={handleSaveNew} disabled={!question || !answer}>
          SAVE
        </button>
      </div>

      <h1>Existing FAQs</h1>

      {faqs.length === 0 ? (
        <p>No FAQs yet.</p>
      ) : (
        <ul>
          {faqs.map((f) => (
            <li key={f._id} style={{ marginBottom: 16 }}>
              {editingId !== f._id ? (
                <>
                  <div>
                    <strong>Q:</strong> {f.question}
                  </div>
                  <div>
                    <strong>A:</strong> {f.answer}
                  </div>
                  <div>
                    <strong>Category:</strong> {f.category || "General"}
                  </div>

                  <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                    <button onClick={() => startEdit(f)}>Edit</button>
                    <button onClick={() => deleteFaq(f._id)}>Delete</button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label>Edit Question</label>
                    <input
                      value={editQuestion}
                      onChange={(e) => setEditQuestion(e.target.value)}
                    />
                  </div>

                  <div>
                    <label>Edit Answer</label>
                    <input
                      value={editAnswer}
                      onChange={(e) => setEditAnswer(e.target.value)}
                    />
                  </div>

                  <div>
                    <label>Edit Category</label>
                    <select
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                    >
                      <option value="General">General</option>
                      <option value="Account">Account</option>
                      <option value="IT">IT</option>
                      <option value="HR">HR</option>
                    </select>
                  </div>

                  <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                    <button onClick={saveEdit} disabled={!editQuestion || !editAnswer}>
                      Save changes
                    </button>
                    <button onClick={cancelEdit}>Cancel</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default App
