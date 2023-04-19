"use client";

import { FC } from "react";
import { useQueryClient } from "@tanstack/react-query";

async function deleteNote(id: number) {
  const res = await fetch("/api/notes", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  });
}

interface DeleteNoteProps {
  id: number;
}

const DeleteNote: FC<DeleteNoteProps> = ({ id }) => {
  const queryClient = useQueryClient();
  return (
    <button
      onClick={async () => {
        await deleteNote(id);
        queryClient.invalidateQueries({ queryKey: ["notes"] });
      }}
    >
      Delete
    </button>
  );
};

export default DeleteNote;
