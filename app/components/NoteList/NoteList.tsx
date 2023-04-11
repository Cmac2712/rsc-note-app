"use client";

import { FC, useState } from "react";
import { NormalisedNote } from "@/app/db";
import DeleteNote from "../DeleteNote/DeleteNote";
import useNotes from "@/app/hooks/useNotes";

interface NoteProps {
  notes: NormalisedNote[];
}

const NoteList: FC<NoteProps> = () => {
  const [notes] = useNotes();

  return (
    <>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            {note.text}
            <DeleteNote id={note.id} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default NoteList;
