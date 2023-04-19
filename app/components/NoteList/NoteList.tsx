"use client";

import { NormalisedNote } from "@/app/db";
import DeleteNote from "../DeleteNote/DeleteNote";
import { useQuery } from "@tanstack/react-query";

interface NoteListProps {
  notes: NormalisedNote[];
}

const NoteList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["notes"],
    queryFn: () => fetch("/api/notes").then((res) => res.json()),
  });

  if (isLoading || error) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ul>
        {data?.map((note: { id: number; text: string }) => (
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
