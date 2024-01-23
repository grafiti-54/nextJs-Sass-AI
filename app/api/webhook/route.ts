import Stripe from "stripe"
import { headers } from "next/headers"
import { NextResponse } from "next/server"

import prismadb from "@/lib/prismadb"
import { stripe } from "@/lib/stripe"

// Fonction pour gérer les requêtes POST, typiquement pour les webhooks Stripe.
export async function POST(req: Request) {
    const body = await req.text()
    const signature = headers().get("Stripe-Signature") as string

    let event: Stripe.Event

    // Essaye de construire l'événement Stripe à partir du corps de la requête et de la signature.
    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (error: any) {
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
    }

    // Récupère la session Stripe à partir de l'événement.
    const session = event.data.object as Stripe.Checkout.Session

    // Evénement est déclenché lorsqu une session de paiement Stripe est complètement finalisée
    if (event.type === "checkout.session.completed") {
        // Récupère les informations d'abonnement à partir de la session Stripe.
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
        )

        // Vérifie si l'ID de l'utilisateur est présent dans les métadonnées de la session.
        if (!session?.metadata?.userId) {
            return new NextResponse("User id is required", { status: 400 });
        }

        // Crée un nouvel enregistrement d'abonnement utilisateur dans la base de données.
        await prismadb.userSubscription.create({
            data: {
                userId: session?.metadata?.userId,
                stripeSubscriptionId: subscription.id,
                stripeCustomerId: subscription.customer as string,
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date(
                    subscription.current_period_end * 1000
                ),
            },
        })
    }

    //  Evénement envoyé lorsque le paiement d'une facture est réussi
    if (event.type === "invoice.payment_succeeded") {
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
        )
        // Met à jour l'enregistrement d'abonnement utilisateur dans la base de données.
        await prismadb.userSubscription.update({
            where: {
                stripeSubscriptionId: subscription.id,
            },
            data: {
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date(
                    subscription.current_period_end * 1000
                ),
            },
        })
    }

    return new NextResponse(null, { status: 200 })
};



/**
 * Un webhook dans Stripe est un point de terminaison HTTP qui reçoit des événements de Stripe sous forme de requêtes contenant 
 * des informations sur diverses actions liées aux paiements. Les webhooks sont essentiels pour être informé des événements de paiement 
 * qui se produisent en dehors du flux de paiement en ligne, tels que les paiements réussis, les paiements contestés, ou les paiements 
 * récurrents pour les abonnements.
 * 
 * Événements de type "checkout.session.completed" : Cet événement est déclenché lorsque une session de paiement Stripe est complètement finalisée.
 *  Cela signifie que le processus de paiement a été mené à bien et que la transaction est terminée avec succès. Cet événement est souvent 
 * utilisé pour confirmer que le paiement a été effectué et pour déclencher des actions post-paiement, telles que l'activation d'un service 
 * ou l'envoi d'une confirmation de commande.

 * Événements de type "invoice.payment_succeeded" : Cet événement est envoyé lorsque le paiement d'une facture est réussi. 
 * Cela est particulièrement pertinent dans le contexte des abonnements, où il indique qu'une facture d'abonnement a été payée avec succès. 
 * Ce type d'événement est utile pour suivre les paiements récurrents et s'assurer que les services sont fournis tant que les paiements sont effectués.
 * 
 * Dans les deux cas, la gestion de ces événements via les webhooks est cruciale pour assurer une bonne synchronisation entre les états de paiement
 * dans Stripe et les actions correspondantes dans l'application, comme la mise à jour des statuts d'abonnement ou l'accès aux services payants.
 * 
 * 
 * Documentation Stripe sur les webhooks et la documentation Stripe sur l'utilisation des webhooks avec les abonnements.
 * https://stripe.com/docs/billing/subscriptions/webhooks
 */