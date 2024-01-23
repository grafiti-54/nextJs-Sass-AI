import * as z from "zod";

export const formSchema = z.object({
  prompt: z.string().min(2, {
    message: "Merci de saisir votre prompt de minimum 2 caractères !"
  }),
});