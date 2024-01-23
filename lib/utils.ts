import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
// Permet d'écrire des noms de classes de manière dynamique et conditionnelle tout en s'assurant que les classes utilitaires 
// de Tailwind sont fusionnées correctement, évitant ainsi les conflits de style et améliorant la lisibilité du code.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


/**
 * Construit une URL absolue à partir d'un chemin relatif en utilisant la base URL définie dans les variables d'environnement.
 * Utile pour générer des URL complètes dans une application Next.js.
 *
 * @param {string} path - Le chemin relatif à convertir en URL absolue.
 * @returns {string} L'URL absolue complète.
 */
export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}