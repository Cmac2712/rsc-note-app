import { getNotes, createNote, deleteNote } from "../../db";

export async function GET(request: Request) {
  const data = await getNotes();

  return new Response(JSON.stringify(data));
}

export async function POST(request: Request) {
  const note = await request.json();

  const res = await createNote(note);

  console.log(res);

  return new Response(
    JSON.stringify({
      id: Number(res.id),
      text: res.text,
      created_at: res.created_at?.toISOString(),
    })
  );
}

export async function DELETE(request: Request) {
  const noteID = await request.json();

  deleteNote(noteID);
  return new Response(`Deleted: ${noteID}`);
}
