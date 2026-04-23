import { useEffect, useState } from "react";
import api from "../api";

// This page allows users to create, edit, and delete notes. It fetches notes from the backend and displays them in a styled format. Users can click "Edit" to modify a note or "Delete" to remove it. The form at the top is used for both adding new notes and updating existing ones.
function Notes() {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`
  };

  const fetchNotes = () => {
    api.get("/notes").then(res => setNotes(res.data));
  };
// Format date for display
  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };
// Load notes on component mount
  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSubmit = () => {
    if (!input) return;

    if (editingId) {
      api.put(`/notes/${editingId}`, { content: input }, { headers })
        .then(() => {
          setEditingId(null);
          setInput("");
          fetchNotes();
        });
    } else {
      api.post("/notes", { content: input }, { headers })
        .then(() => {
          setInput("");
          fetchNotes();
        });
    }
  };
// Handle note deletion
  const handleDelete = (id) => {
    api.delete(`/notes/${id}`, { headers })
      .then(() => fetchNotes());
  };
//  Handle note editing
  const handleEdit = (note) => {
    setInput(note.content);
    setEditingId(note.id);
  };
// Render the notes page
  return (
    <div>
      <h1>Notes</h1>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Write a note..."
      />

      <button onClick={handleSubmit}>
        {editingId ? "Update" : "Add"}
      </button>

      <hr />

      {notes.map(note => (
        <div
          key={note.id}
         style={{
  background: "inherit",
  padding: "15px",
  marginBottom: "10px",
  borderRadius: "10px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  borderLeft: "5px solid #4a90e2"
}}
// Add hover effect
        >
          <p style={{ fontSize: "16px", color: "inherit" }}>{note.content}</p>

          <small style={{ opacity: 0.7 }}>
            📅 {formatDate(note.created_at)}
          </small>

          <div style={{ marginTop: "10px" }}>
            <button onClick={() => handleEdit(note)}>Edit</button>
            <button onClick={() => handleDelete(note.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Notes;