import React from "react";
import ReactDOM from "react-dom";
import DeleteIcon from "@material-ui/icons/Delete";

const Note = (props) => {
  return (
    <article className="note" key={props.key}>
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={() => props.deleteMe(props.id)}>
        <DeleteIcon />
      </button>
    </article>
  );
};

export default Note;
