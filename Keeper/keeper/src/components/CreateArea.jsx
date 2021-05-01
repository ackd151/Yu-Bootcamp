import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

function CreateArea(props) {
  const [isExpanded, setisExpanded] = useState(false);
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setNote((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function handleExpand() {
    setisExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            onChange={handleChange}
            value={note.title}
            name="title"
            placeholder="Title"
          />
        )}
        <textarea
          onChange={handleChange}
          onClick={handleExpand}
          value={note.content}
          name="content"
          placeholder="Take a note..."
          rows={isExpanded ? "3" : "1"}
        />
        <Zoom in={isExpanded}>
          <Fab
            onClick={(e) => {
              e.preventDefault();
              props.add(note);
              setNote({ title: "", content: "" });
            }}
          >
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
