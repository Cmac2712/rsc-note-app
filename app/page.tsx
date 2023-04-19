import { getNotes } from "./db";
import NoteList from "./components/NoteList/NoteList";
import CreateNote from "./components/CreateNote/CreateNote";
import HydratedNotes from "./hydratedNotes";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default async function Page() {
  const data = await getNotes();

  return (
    <main>
      <h1>Note Taking App</h1>
      {/* @ts-ignore */}
      <HydratedNotes>
        {/* @ts-ignore */}
        <NoteList notes={data} />
      </HydratedNotes>
      <CreateNote />
    </main>
  );
}
