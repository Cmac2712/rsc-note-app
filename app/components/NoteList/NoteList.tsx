"use client";

import { NormalisedNote } from "@/app/db";
import { NoteListItem } from "../NoteListItem";
import { useGetNotes } from "@/app/hooks/useGetNotes";

interface NoteListProps {
  notes: NormalisedNote[];
}

const NoteList = () => {
  const { data, isLoading, error } = useGetNotes();

  if (isLoading || error) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {/* <ReactQueryDevtools initialIsOpen={false}> */}
      <ul>
        {data?.map((note) => (
          <NoteListItem key={note.id} note={note} />
        ))}
      </ul>
      {/* </ReactQueryDevtools> */}
    </>
  );
};

export default NoteList;
