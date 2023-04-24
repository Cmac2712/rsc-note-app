import { getNotes } from "./db";
import NoteList from "./components/NoteList/NoteList";
import CreateNote from "./components/CreateNote/CreateNote";
import HydratedNotes from "./hydratedNotes";
import { Suspense } from "react";

export default async function Page() {
  const data = await getNotes();

  return (
    <main
      style={{
        maxWidth: 300,
        margin: "auto",
      }}
    >
      <h1 className="text-3xl font-bold underline">Note Taking App</h1>
      {/* @ts-ignore */}
      <HydratedNotes>
        <Suspense fallback={<div>Loading...</div>}>
          {/* @ts-ignore */}
          <NoteList notes={data} />
        </Suspense>
      </HydratedNotes>
      <CreateNote />
    </main>
  );
}
