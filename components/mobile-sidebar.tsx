"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "@/components/sidebar";

//Composant de menu responsive
export const MobileSidebar = ({
    apiLimitCount = 0,
    isPro = false
}: {
    apiLimitCount: number;
    isPro: boolean;
}) => {

    // S'assure que le composant ne tente pas de rendre ou d'effectuer certaines opérations avant d'être 
    // complètement monté dans le DOM  => Error: Hydration failed because the initial UI does not match what was rendered on the server.
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <Sheet>
            <SheetTrigger>
                {/*  Menu hambuger en dessous de md  */}
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>
            {/* Contenu affiché lors du clic sur le menu hamburger grace a Sheet */}
            <SheetContent side="left" className="p-0">
                <Sidebar
                    apiLimitCount={apiLimitCount}
                    isPro={isPro}
                />
            </SheetContent>
        </Sheet>
    );
};