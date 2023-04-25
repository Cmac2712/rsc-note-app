import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { NormalisedNote } from "@/app/db";

async function deleteNote(id: number) {
  const res = await fetch("/api/notes", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  });
}

function useDeleteNote() {
  const queryClient = useQueryClient();

  return useMutation({
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
}

export { useDeleteNote };
