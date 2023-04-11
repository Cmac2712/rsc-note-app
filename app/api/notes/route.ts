import { getNotes, createNote, deleteNote } from "../../db";

export async function GET(request: Request) {
  const data = await getNotes();

  return new Response(JSON.stringify(data));
}

export async function POST(request: Request) {
  const note = await request.json();

  const res = createNote(note);

  return new Response(JSON.stringify(res));
}

export async function DELETE(request: Request) {
  const noteID = await request.json();

  deleteNote(noteID);
}
