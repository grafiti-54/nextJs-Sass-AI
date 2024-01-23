import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

const settingsUrl = absoluteUrl("/settings");

// Fonction pour gérer la création de la session Stripe.
export async function GET() {
    try {
        // Authentifie l'utilisateur et récupère les détails de l'utilisateur actuel.
        const { userId } = auth();
        const user = await currentUser();

        // Vérifie si l'utilisateur est authentifié. Si non, renvoie une réponse non autorisée.
        if (!userId || !user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Recherche l'abonnement de l'utilisateur dans la base de données.
        const userSubscription = await prismadb.userSubscription.findUnique({
            where: {
                userId
            }
        })

        // Si l'utilisateur a un ID client Stripe, crée une session pour le portail de facturation.
        //if (userSubscription && userSubscription.stripeCustomerId) {
        if (userSubscription?.stripeCustomerId) {
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: userSubscription.stripeCustomerId,
                return_url: settingsUrl,
            })

            // Renvoie l'URL de la session Stripe.
            return new NextResponse(JSON.stringify({ url: stripeSession.url }))
        }

        // Crée une nouvelle session de paiement Stripe pour un nouvel abonnement.
        const stripeSession = await stripe.checkout.sessions.create({
            success_url: settingsUrl,
            cancel_url: settingsUrl,
            payment_method_types: ["card"],
            mode: "subscription",
            billing_address_collection: "auto",
            customer_email: user.emailAddresses[0].emailAddress,
            line_items: [
                {
                    price_data: {
                        currency: "EUR",
                        product_data: {
                            name: "CG SASS",
                            description: "Génération avec l'IA illimité pendant 1 mois"
                        },
                        //Prix en centime avec stripe
                        unit_amount: 2000,
                        recurring: {
                            interval: "month"
                        }
                    },
                    quantity: 1,
                },
            ],
            //Vérifie l'id de l'user avant de procéder à l'ouverture de la session de paiement.
            metadata: {
                userId,
            },
        })

        // Renvoie l'URL de la session Stripe.
        return new NextResponse(JSON.stringify({ url: stripeSession.url }))
    } catch (error) {
        console.log("[STRIPE_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
};