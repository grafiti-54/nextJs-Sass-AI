import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";


//Point d'entrée de l'application.
const DashboardPage = () => {
  return (
    <div>
      <Button variant="ghost" size="lg">DashboardPage</Button>
      <UserButton afterSignOutUrl="/"/>
    </div>
  );
}

export default DashboardPage;
