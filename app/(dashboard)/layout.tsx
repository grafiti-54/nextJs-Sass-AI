import Navbar from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";

import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

//Menu latéral du tableau de bord de l'utilisateur connecté.
const DashboardLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  //Récupération de nombre de prompt pour utilisateur compte gratuit.
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();

  return (
    <div className="h-full relative">
      {/* Menu latéral */}
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-80 bg-sky-950">
        <Sidebar
          apiLimitCount={apiLimitCount}
          isPro={isPro}
        />
      </div>
      {/* Conteneur dashboard */}
      <main className="md:pl-72 pb-10">
        <Navbar />
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;