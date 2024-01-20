import Navbar from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
// import { checkSubscription } from "@/lib/subscription";
// import { getApiLimitCount } from "@/lib/api-limit";

//Menu latéral du tableau de bord de l'utilisateur connecté.
const DashboardLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  //   const apiLimitCount = await getApiLimitCount();
  //   const isPro = await checkSubscription();

  return (
    <div className="h-full relative">
      {/* Menu latéral */}
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-80 bg-sky-950">
        <Sidebar
        //isPro={isPro} 
        //apiLimitCount={apiLimitCount} 
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