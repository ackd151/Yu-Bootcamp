import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  function handleAdd(note) {
    setNotes([...notes, note]);
  }

  function handleDelete(id) {
    setNotes(notes.filter((note, index) => index !== id));
  }

  return (
    <div>
      <Header />
      <CreateArea add={handleAdd} />
      {notes.map((note, index) => (
        <Note
          key={index}
          id={index}
          title={note.title}
          content={note.content}
          deleteMe={handleDelete}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
