import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

// Constante pour représenter un jour en millisecondes.
const DAY_IN_MS = 86_400_000;

// Fonction de vérification de l'état de l'abonnement d'un utilisateur.
export const checkSubscription = async () => {
    const { userId } = auth();

    if (!userId) {
        return false;
    }

    // Recherche l'abonnement de l'utilisateur dans la base de données.
    const userSubscription = await prismadb.userSubscription.findUnique({
        where: {
            userId: userId,
        },
        // Sélectionne uniquement les champs nécessaires de l'abonnement.
        select: {
            stripeSubscriptionId: true,
            stripeCurrentPeriodEnd: true,
            stripeCustomerId: true,
            stripePriceId: true,
        },
    })

    // Si aucun abonnement n'est trouvé, renvoie false.
    if (!userSubscription) {
        return false;
    }

    // Vérifie si l'abonnement est toujours valide.
    const isValid =
    userSubscription.stripePriceId &&  // Vérifie si l'abonnement a un prix Stripe associé.
    userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now()  // Vérifie si l'abonnement est toujours actif (plus un jour de marge).

    // Renvoie true si l'abonnement est valide, sinon false.
    return !!isValid;
};