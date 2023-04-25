import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { NormalisedNote } from "@/app/db";

function useCreateNote() {
  const queryClient = useQueryClient();

  async function optimisticUpdate(newNote: NormalisedNote["text"]) {
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

  async function submitNote(note: NormalisedNote["text"]) {
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

  return useMutation({
    mutationFn: (note: NormalisedNote["text"]) => submitNote(note),
    onMutate: (newNote) => optimisticUpdate(newNote),
  });
}

export { useCreateNote };
