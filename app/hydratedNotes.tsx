import { dehydrate, Hydrate } from "@tanstack/react-query";
import { getNotes } from "./db";
import getQueryClient from "./getQueryClient";

interface HydratedNotesProps {
  children: React.ReactNode;
}

export default async function HydratedNotes({ children }: HydratedNotesProps) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["notes"], getNotes);
  const dehydratedState = dehydrate(queryClient);

  return <Hydrate state={dehydratedState}>{children}</Hydrate>;
}
