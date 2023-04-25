"use client";

import { useState } from "react";
import * as Form from "@radix-ui/react-form";
import { useCreateNote } from "@/app/hooks/useCreateNote";

export default function CreateNote() {
  const [noteText, setNoteText] = useState<string>("");
  const { mutate } = useCreateNote();

  return (
    <Form.Root
      onSubmit={(e) => {
        e.preventDefault();
        setNoteText("");
        mutate(noteText);
      }}
    >
      <Form.Field name="note-text">
        <div>
          <Form.Label className="sr-only">Note</Form.Label>
          <Form.Message match="valueMissing">Enter your text here</Form.Message>
        </div>
        <Form.Control asChild>
          <textarea
            id="create-note"
            name="note"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            className="textarea textarea-bordered textarea-lg w-full"
            required
          />
        </Form.Control>
      </Form.Field>
      <Form.Submit asChild>
        <button className="btn btn-primary w-full">Create Note</button>
      </Form.Submit>
    </Form.Root>
  );
}
