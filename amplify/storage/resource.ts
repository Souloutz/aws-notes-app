import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: "amplifyNotesDrive",
  access: (allow) => ({
    "media/{entity_id}/*": [ // entity_id is a reserved token to replace users' identifier when file is uploaded
      allow.entity("identity").to(["read", "write", "delete"]), // only the user who uploads the image can access
    ],
  }),
});