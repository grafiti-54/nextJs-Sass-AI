"use client";

import { useEffect, useState } from "react";

import { ProModal } from "@/components/pro-modal";

//Composant de gestion d'affichage de la modal pour proposition d'abonnement une fois la limite gratuite de prompt est dépassé.
export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <ProModal />
    </div>
  );
};