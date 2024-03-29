import { Zap } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MAX_FREE_COUNTS } from "@/constants";
import { Progress } from "@/components/ui/progress";
import { useProModal } from "@/hooks/use-pro-modal";

// Composant en bas de la sidebar qui vérifie le nombre de crédit gratuit pour un utilisateur 
export const FreeCounter = ({
    isPro = false,
    apiLimitCount = 0,
}: {
    isPro: boolean,
    apiLimitCount: number
}) => {
    const [mounted, setMounted] = useState(false);
      const proModal = useProModal();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }


    if (isPro) {
        return null;
    }

    return (
        <div className="px-3">
            <Card className="bg-white/10 border-0">
                <CardContent className="py-6">
                    <div className="text-center text-sm text-white mb-4 space-y-2">
                        <p>
                            {apiLimitCount} / {MAX_FREE_COUNTS} Generations gratuites
                        </p>
                        <Progress className="h-3" value={(apiLimitCount / MAX_FREE_COUNTS) * 100} />
                    </div>
                    <Button
                        onClick={proModal.onOpen} 
                        variant="premium"
                        className="w-full"
                    >
                        Abonnement
                        <Zap className="w-4 h-4 ml-2 fill-white" />
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}