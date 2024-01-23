"use client";

import Link from "next/link";
import Image from "next/image";
import { Poppins } from 'next/font/google' //https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
import { Code, ImageIcon, LayoutDashboard, MessageSquare, Music, Settings, VideoIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { FreeCounter } from "@/components/free-counter";

const poppins = Poppins ({ weight: '500', subsets: ['latin'] });

const routes = [
  {
    label: 'Tableau de bord',
    icon: LayoutDashboard,
    href: '/dashboard',
    color: "text-sky-500",
    tooltip: "Retour à l'accueil",
  },
  {
    label: 'Conversation',
    icon: MessageSquare,
    href: '/conversation',
    color: "text-violet-500",
    tooltip: "Générer une conversation",
  },
  {
    label: 'Image',
    icon: ImageIcon,
    color: "text-pink-700",
    href: '/image',
    tooltip: "Générer une image",
  },
  {
    label: 'Vidéo',
    icon: VideoIcon,
    color: "text-orange-700",
    href: '/video',
    tooltip: "Générer une vidéo",
  },
  {
    label: 'Musique',
    icon: Music,
    color: "text-emerald-500",
    href: '/music',
    tooltip: "Générer une musique",
  },
  {
    label: 'Code',
    icon: Code,
    color: "text-green-700",
    href: '/code',
    tooltip: "Générer du coe",
  },
  {
    label: 'Options',
    icon: Settings,
    href: '/settings',
    tooltip: "Réglages",
  },
];

interface SidebarProps {
  apiLimitCount : number;
}


//Composant sidebar contient les éléments à l'interieur de la barre de navigation latéral de l'utilisateur connecté.
export const Sidebar = ({
  apiLimitCount = 0,
  isPro = false
}: {
  apiLimitCount: number;
  isPro: boolean;
}) => {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#192e5c] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative h-16 w-28 mr-4">
            <Image fill alt="Logo" src="/logo.png" />
          </div>
          <h1 className={cn("text-2xl font-bold", poppins.className)}>
            CG AI GENERATOR
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href} 
              href={route.href}
              title={route.tooltip}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                //Focus sur le bouton ou la page est ouverte.
                pathname === route.href ? "text-white bg-white/10" : "text-zinc-400",
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <FreeCounter 
        apiLimitCount={apiLimitCount} 
        isPro={isPro}
      />
    </div>
  );
};