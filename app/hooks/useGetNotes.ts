import { NormalisedNote } from "@/app/db";
import { useQuery } from "@tanstack/react-query";

async function getNotes() {
  try {
    const res = await fetch("/api/notes");
    const json = (await res.json()) as NormalisedNote[];

    return json;
  } catch (error) {
    console.error(error);
  }

  return [];
}

function useGetNotes() {
  return useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
  });
}

export { useGetNotes };
