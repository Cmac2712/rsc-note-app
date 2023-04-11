"use client";

import { useState } from "react";

async function submitNote(note: string) {
  const res = await fetch("/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  const json = await res.json();

  console.log(json);
}

const CreateNote = () => {
  const [note, setNote] = useState<string>("");

  return (
    <form onSubmit={() => submitNote(note)}>
      <label htmlFor="create-noe">Note</label>
      <textarea
        name="note"
        id="create-note"
        cols={10}
        rows={10}
        onChange={(e) => setNote(e.target.value)}
      />
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateNote;
