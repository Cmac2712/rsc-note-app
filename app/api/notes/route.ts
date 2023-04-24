import { getNotes, createNote, deleteNote } from "../../db";

export async function GET(request: Request) {
  const data = await getNotes();

  return new Response(JSON.stringify(data));
}

export async function POST(request: Request) {
  const note = await request.json();

  await createNote(note);

  const notes = await getNotes();

  return new Response(JSON.stringify(notes));
}

export async function DELETE(request: Request) {
  const noteID = await request.json();

  deleteNote(noteID);

  const notes = await getNotes();

  return new Response(JSON.stringify(notes));
}
