import { getNotes } from "./db";
import NoteList from "./components/NoteList/NoteList";
import CreateNote from "./components/CreateNote/CreateNote";
import HydratedNotes from "./hydratedNotes";
import { Suspense } from "react";

export default async function Page() {
  const data = await getNotes();

  return (
    <main className="container max-w-xl py-2 mx-auto">
      <h1 className="text-3xl font-bold underline text-center my-3">
        Note Taking App
      </h1>
      <HydratedNotes>
        <Suspense fallback={<div>Loading...</div>}>
          <NoteList />
        </Suspense>
      </HydratedNotes>
      <CreateNote />
    </main>
  );
}
