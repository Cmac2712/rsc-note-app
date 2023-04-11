import { PrismaClient } from "@prisma/client";
import { Note } from "@prisma/client";

type Normalise<T> = {
  [K in keyof T]: T[K] extends BigInt
    ? number
    : T[K] extends BigInt | null
    ? number
    : T[K] extends Date
    ? string
    : T[K] extends Date | null
    ? string
    : T[K];
};

export type NormalisedNote = Normalise<Note>;

const prisma = new PrismaClient();

export async function getNotes() {
  const data = await prisma.note.findMany();
  const normalised: NormalisedNote[] = data.map((note) => {
    return {
      id: Number(note.id),
      text: note.text,
      created_at: note.created_at?.toJSON() ? note.created_at.toJSON() : "",
    };
  });

  return normalised;
}

export async function createNote(text: string) {
  const note = await prisma.note.create({
    data: {
      text,
    },
  });

  return note;
}

export async function deleteNote(id: number) {
  const note = await prisma.note.delete({
    where: {
      id: BigInt(id),
    },
  });

  return note;
}
