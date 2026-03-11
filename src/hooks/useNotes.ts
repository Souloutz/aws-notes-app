import { useState } from "react";
import { client } from "../App";
import { getUrl, uploadData } from "aws-amplify/storage";
import type { Schema } from "../../amplify/data/resource";

export default function useNotes() {
  const [notes, setNotes] = useState<Schema['Note']['type'][]>([]);
  
  const fetchNotes = async () => {
    const { data: notes } = await client.models.Note.list();
    const notesWithUrls = await Promise.all(
      notes.map(async (note) => {
        if (note.image) {
          const linkToStorageFile = await getUrl({
            path: ({ identityId }) => `media/${identityId}/${note.image}`,
          });
          note.image = linkToStorageFile.url.toString();
        }

        return note;
      })
    );

    setNotes(notesWithUrls);
  };

  const createNote = async (formData: FormData) => {
    const file = formData.get('image') as File | null;

    const { data: newNote } = await client.models.Note.create({
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      image: file?.name ?? undefined,
    });

    if (file && newNote && newNote.image) {
      await uploadData({
        path: ({ identityId }) => `media/${identityId}/${newNote.image}`,
        data: file,
      }).result;
    }

    await fetchNotes();
  };

  const deleteNote = async (id: string) => {
    await client.models.Note.delete({ id });
    await fetchNotes();
  };

  return {
    notes,
    fetchNotes,
    createNote,
    deleteNote,
  };
}