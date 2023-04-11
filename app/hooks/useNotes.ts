import { NormalisedNote } from "@/app/db";
import { useEffect, useState } from "react";

function useNotes() {
  const [notes, setNotes] = useState<NormalisedNote[]>([]);

  useEffect(() => {
    async function getNotes() {
      const data = await fetch("/api/notes");
      const json = await data.json();

      setNotes(json);
    }

    getNotes();
  }, []);

  return [notes, setNotes] as const;
}

export default useNotes;
