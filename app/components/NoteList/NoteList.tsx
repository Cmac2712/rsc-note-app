"use client";

import { NormalisedNote } from "@/app/db";
import { NoteListItem } from "../NoteListItem";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FormDemo } from "@ui/Form";

interface NoteListProps {
  notes: NormalisedNote[];
}

const NoteList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const res = await fetch("/api/notes").then((res) => res.json());
      const json = (await res.json()) as NormalisedNote[];

      return json;
    },
  });

  if (isLoading || error) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {/* <ReactQueryDevtools initialIsOpen={false}> */}
      <FormDemo />
      <ul
        style={{
          padding: "0",
        }}
      >
        {data?.map((note) => (
          <NoteListItem key={note.id} note={note} />
        ))}
      </ul>
      {/* </ReactQueryDevtools> */}
    </>
  );
};

export default NoteList;
