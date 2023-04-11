import { getNotes } from "./db";
import NoteList from "./components/NoteList/NoteList";
import CreateNote from "./components/CreateNote/CreateNote";
import DeleteNote from "./components/DeleteNote/DeleteNote";

async function getData() {
  const data = await getNotes();

  return data;
}

export default async function Page() {
  const data = await getData();

  return (
    <main>
      <h1>Note Taking App</h1>
      <NoteList notes={data} />
      <CreateNote />
    </main>
  );
}
