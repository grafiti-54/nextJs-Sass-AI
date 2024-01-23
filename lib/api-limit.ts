import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { MAX_FREE_COUNTS } from "@/constants";

// Fonctions de gestion et de suivi de la limite d'utilisation de l'API pour les utilisateurs connectés avec un compte gratuit.


// Augmente le compteur d'utilisation de l'API pour l'utilisateur connecté avec un compte gratuit. 
export const incrementApiLimit = async () => {
    // Obtient l'ID de l'utilisateur connecté.
    const { userId } = auth();
  
    // Si aucun utilisateur n'est connecté, arrête la fonction.
    if (!userId) {
      return;
    }
  
    // Cherche la limite d'API actuelle de l'utilisateur dans la base de données.
    const userApiLimit = await prismadb.userApiLimit.findUnique({
      where: { userId: userId },
    });
  
    // Si un enregistrement est trouvé, incrémente le compteur de 1.
    if (userApiLimit) {
      await prismadb.userApiLimit.update({
        where: { userId: userId },
        data: { count: userApiLimit.count + 1 },
      });
    } 
    // Si aucun enregistrement n'est trouvé, crée un nouveau compteur à 1.
    else {
      await prismadb.userApiLimit.create({
        data: { userId: userId, count: 1 },
      });
    }
  };
  
// Vérifie si l'utilisateur a dépassé sa limite d'API gratuite.
export const checkApiLimit = async () => {
    // Obtient l'ID de l'utilisateur connecté.
    const { userId } = auth();
  
    // Si aucun utilisateur n'est connecté, renvoie false (limite non atteinte).
    if (!userId) {
      return false;
    }
  
    // Cherche la limite d'API actuelle de l'utilisateur dans la base de données.
    const userApiLimit = await prismadb.userApiLimit.findUnique({
      where: { userId: userId },
    });
  
    // Si l'utilisateur n'a pas encore atteint la limite ou si aucun enregistrement n'existe,
    // renvoie true (peut continuer à utiliser l'API).
    if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) {
      return true;
    } 
    // Si la limite est atteinte, renvoie false (limite dépassée).
    else {
      return false;
    }
  };
  
// Récupère le nombre actuel d'appels API utilisés par l'utilisateur connecté avec un compte gratuit.
export const getApiLimitCount = async () => {
    // Obtient l'ID de l'utilisateur connecté.
    const { userId } = auth();
  
    // Si aucun utilisateur n'est connecté, renvoie 0.
    if (!userId) {
      return 0;
    }
  
    // Cherche l'enregistrement de la limite d'API de l'utilisateur dans la base de données.
    const userApiLimit = await prismadb.userApiLimit.findUnique({
      where: {
        userId
      }
    });
  
    // Si aucun enregistrement n'est trouvé, renvoie 0.
    if (!userApiLimit) {
      return 0;
    }
  
    // Renvoie le nombre d'appels API utilisés par l'utilisateur.
    return userApiLimit.count;
  };
  