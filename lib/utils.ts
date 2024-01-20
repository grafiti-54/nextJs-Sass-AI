import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
// Permet d'écrire des noms de classes de manière dynamique et conditionnelle tout en s'assurant que les classes utilitaires 
// de Tailwind sont fusionnées correctement, évitant ainsi les conflits de style et améliorant la lisibilité du code.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
