import { NormalisedNote } from "@/app/db";
import { useQueryClient, useQuery } from "@tanstack/react-query";

async function getNotes() {
  const data = await fetch("/api/notes");
  const json = await data.json();

  return json;
}

function useNotes() {
  return useQuery({ queryKey: ["notes"], queryFn: getNotes });
}

export default useNotes;
