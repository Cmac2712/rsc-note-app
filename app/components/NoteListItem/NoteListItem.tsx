import { NormalisedNote } from "@/app/db";
import DeleteNote from "../DeleteNote/DeleteNote";
import { FC } from "react";

interface NoteListItemProps {
  note: NormalisedNote;
}

const NoteListItem: FC<NoteListItemProps> = ({ note }) => {
  return (
    <li
      key={note.id}
      className="flex justify-between overflow-hidden rounded-lg shadow transition mb-2 p-2 color-primary bg-white"
    >
      {note.text}
      <DeleteNote id={note.id} />
    </li>
  );
};

export { NoteListItem };
