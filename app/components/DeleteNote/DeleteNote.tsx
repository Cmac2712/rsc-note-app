"use client";

import { FC } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useDeleteNote } from "@/app/hooks/useDeleteNote";

interface DeleteNoteProps {
  id: number;
}

const DeleteNote: FC<DeleteNoteProps> = ({ id }) => {
  const { mutate } = useDeleteNote();
  return (
    <button title="Delete note" onClick={async () => mutate(id)}>
      <Cross2Icon />
    </button>
  );
};

export default DeleteNote;
