"use client";

import { CrispChat } from "@/components/crisp-chat";

//Provider chatbot https://app.crisp.chat/ utilisé dans le fichier app\layout.tsx
export const CrispProvider = () => {
    return <CrispChat />
};