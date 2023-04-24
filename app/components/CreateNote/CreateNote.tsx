"use client";

import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { NormalisedNote } from "@/app/db";

const CreateNote = () => {
  const [noteText, setNoteText] = useState<string>("");
  const queryClient = useQueryClient();
  const { isError, isSuccess, mutate } = useMutation({
    mutationFn: (note: string) => submitNote(note),
    onMutate: (newNote) => optimisticUpdate(newNote),
  });

  async function optimisticUpdate(newNote: string) {
    await queryClient.cancelQueries(["notes"]);
    const previousNotes = queryClient.getQueryData(["notes"]);
    const optimisticNote = {
      id: -1,
      text: newNote,
      created_at: new Date().toISOString(),
    };

    queryClient.setQueryData(
      ["notes"],
      (oldData: NormalisedNote[] | undefined) => {
        if (!oldData) {
          return [optimisticNote];
        }

        return [...oldData, optimisticNote];
      }
    );

    return { previousNotes };
  }

  async function submitNote(note: string) {
    const res = await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    const json = await res.json();

    queryClient.setQueryData(["notes"], (oldData) => json);

    return json;
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await mutate(noteText);

        setNoteText("");
      }}
    >
      {isError ? <div>Something went wrong</div> : null}
      <textarea
        name="note"
        id="create-note"
        cols={10}
        rows={10}
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        placeholder="Write your note here&hellip;"
      />
      <button type="submit" style={{ marginTop: ".5rem" }}>
        Create
      </button>
    </form>
  );
};

export default CreateNote;
