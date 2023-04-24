import { NormalisedNote } from "@/app/db";
import DeleteNote from "../DeleteNote/DeleteNote";
import { FC } from "react";

interface NoteListItemProps {
  note: NormalisedNote;
}

const NoteListItem: FC<NoteListItemProps> = ({ note }) => {
  return (
    <li key={note.id}>
      {note.text}
      <DeleteNote id={note.id} />
    </li>
  );
};

export { NoteListItem };
