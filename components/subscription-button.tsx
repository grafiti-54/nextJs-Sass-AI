"use client";

import axios from "axios";
import { useState } from "react";
import { Zap } from "lucide-react";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";

//Composant boutton utilisé sur la page settings afin de souscrire a un abonnement pro.
export const SubscriptionButton = ({
    isPro = false
}: {
    isPro: boolean;
}) => {
    const [loading, setLoading] = useState(false);

    //Fonction de redirection vers la page de paiement pour l'abonnement avec stripe.
    const onClick = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/stripe");
            window.location.href = response.data.url;
        } catch (error) {
            toast.error("Une erreur est survenue !");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button variant={isPro ? "default" : "premium"} disabled={loading} onClick={onClick} >
            {isPro ? "Gérer l'abonnement" : "S'abonner"}
            {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
        </Button>
    )
};