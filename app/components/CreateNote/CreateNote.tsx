"use client";

import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { NormalisedNote } from "@/app/db";

const CreateNote = () => {
  const [note, setNote] = useState<string>("");
  const queryClient = useQueryClient();
  const { isError, isSuccess, mutate } = useMutation({
    mutationFn: (note: string) => submitNote(note),
  });

  async function submitNote(note: string) {
    const res = await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    const json = await res.json();

    queryClient.invalidateQueries({ queryKey: ["notes"] });

    return json;
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await mutate(note);

        setNote("");
      }}
    >
      {isError ? <div>Something went wrong</div> : null}
      {isSuccess ? <div>Note added!</div> : null}
      <label htmlFor="create-noe">Note</label>
      <textarea
        name="note"
        id="create-note"
        cols={10}
        rows={10}
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateNote;
