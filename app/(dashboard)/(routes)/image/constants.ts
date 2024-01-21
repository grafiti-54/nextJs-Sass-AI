import * as z from "zod";

// Définition d'un schéma de validation pour un formulaire de génération d'image
export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Merci de saisir le prompt pour l'image de minimum 2 caractères !"
  }),
  amount: z.string().min(1),
  resolution: z.string().min(1),
});

export const amountOptions = [
  {
    value: "1",
    label: "1 Photo"
  },
  {
    value: "2",
    label: "2 Photos"
  },
  {
    value: "3",
    label: "3 Photos"
  },
  {
    value: "4",
    label: "4 Photos"
  },
  {
    value: "5",
    label: "5 Photos"
  }
];

export const resolutionOptions = [
  {
    value: "256x256",
    label: "256x256",
  },
  {
    value: "512x512",
    label: "512x512",
  },
  {
    value: "1024x1024",
    label: "1024x1024",
  },
];











/**
 * z.object() : Crée un schéma pour un objet. C'est le conteneur de votre formulaire. Chaque clé dans cet objet 
 * représente un champ de formulaire.

prompt: C'est une clé de l'objet représentant un champ du formulaire. Ici, prompt est le nom de ce champ.

z.string() : Spécifie que la valeur du champ prompt doit être une chaîne de caractères. C'est un validateur de type.

.min(1, { message: "Prompt is required." }) : Ajoute une règle de validation qui exige que la chaîne de caractères 
ait au moins 1 caractère (c'est-à-dire qu'elle ne soit pas vide). Si cette règle n'est pas respectée, un message d'erreur 
personnalisé "Prompt is required." est fourni.

Ce schéma peut être utilisé pour valider les données d'un formulaire, 
s'assurant que le champ prompt contient au moins un caractère et affichant un message d'erreur si ce n'est pas le cas. 
C'est particulièrement utile dans des environnements TypeScript pour garantir que les données manipulées correspondent 
aux attentes en termes de type et de format.
 */