import { Button } from "@/components/ui/button";
import Link from "next/link";


//Point d'entrée de l'application.
const LandingPage = () => {
  return (
    <div>
      <div>
        <Link href="sign-in">
          <Button>Connexion</Button>
        </Link>
        <Link href="sign-up">
          <Button>Inscription</Button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
