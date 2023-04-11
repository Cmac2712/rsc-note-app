"use client";

import { FC } from "react";

async function deleteNote(id: number) {
  const res = await fetch("/api/notes", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  });
  const json = await res.json();

  console.log(json);
}

interface DeleteNoteProps {
  id: number;
}

const DeleteNote: FC<DeleteNoteProps> = ({ id }) => {
  return <button onClick={() => deleteNote(id)}>Delete</button>;
};

export default DeleteNote;
