"use client";

import { FC } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NormalisedNote } from "@/app/db";

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

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteNote(id),
    onMutate: async (id: number) => {
      const previousNotes = queryClient.getQueryData(["notes"]);

      queryClient.setQueryData(
        ["notes"],
        (oldData: NormalisedNote[] | undefined) => {
          if (!oldData) return;
          return oldData?.filter((note) => note.id !== id);
        }
      );

      return { previousNotes };
    },
    onError: (err, variables, context) => {
      if (!context?.previousNotes) return;
      queryClient.setQueryData(["notes"], context.previousNotes);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["notes"]);
    },
  });
  return (
    <button
      title="Delete note"
      onClick={async () => deleteMutation.mutate(id)}
    />
  );
};

export default DeleteNote;
