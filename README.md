

# INSTALLATION

- Création du projet depuis la console
  ```bash
  npx create-next-app@latest ./ --typescript --tailwind --eslint
  ```
  √ Would you like to use `src/` directory? ... No  
  √ Would you like to use App Router? (recommended) Yes  
  √ Would you like to customize the default import alias (@/*)? ... No

- Installation de shadcn [https://ui.shadcn.com/docs/installation/next](https://ui.shadcn.com/docs/installation/next)
  ```bash
  npx shadcn-ui@latest init
  ```
  √ Which style would you like to use? » Default  
  √ Which color would you like to use as base color? » Slate  
  √ Would you like to use CSS variables for colors? yes

- Installation des composants shadcn avec la CLI de shadcn qui seront installés directement dans le dossier components  
  Exemple pour le bouton depuis la console :
  ```bash
  npx shadcn-ui@latest add button
  ```

# AUTHENTIFICATION

- Configuration de l'authentification avec clerk [https://clerk.com/](https://clerk.com/)
- Créer une nouvelle application et choisir le type d'authentification.
- Après la redirection, choisir le framework utilisé pour le projet et copier les variables d'environnement.

  ```
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
  CLERK_SECRET_KEY=
  ```

- Cliquer sur le bouton continue in doc afin d'être redirigé vers la page suivante : [https://clerk.com/docs/quickstarts/nextjs](https://clerk.com/docs/quickstarts/nextjs)
- Installer la dépendance depuis la console
  ```bash
  npm install @clerk/nextjs
  ```
- Ajouter le provider de clerk dans le projet dans le fichier app\layout.tsx
  ```jsx
  return (
    <ClerkProvider>
      <html lang="fr">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
  ```
- Créer un fichier middleware.ts à la racine du projet et renseigner le code fourni par la documentation.  
  [https://clerk.com/docs/references/nextjs/custom-signup-signin-pages#build-your-sign-up-page](https://clerk.com/docs/references/nextjs/custom-signup-signin-pages#build-your-sign-up-page)
- Créer le fichier app\(auth)\(routes)\sign-up\[[...sign-up]]\page.tsx et le fichier app\(auth)\(routes)\sign-in\[[...sign-in]]\page.tsx
  ```jsx
  
  //app\(auth)\(routes)\sign-in\[[...sign-in]]\page.tsx
  import { SignIn } from "@clerk/nextjs";
   
  // Page clerk pour la connexion.
  export default function Page() {
    return <SignIn />;
  }


  //app\(auth)\(routes)\sign-up\[[...sign-up]]\page.tsx
  import { SignUp } from "@clerk/nextjs";
   
  // Page clerk pour l'inscription.
  export default function Page() {
    return <SignUp />;
  }
  ```
- Ajouter les variables d'environnement suivantes dans le fichier .env
  ```
  NEXT_PUBLIC_CLERK_SIGN_IN_URL=
  NEXT_PUBLIC_CLERK_SIGN_UP_URL=
  NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=
  NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=
  ```
- Modifier le fichier middleware.ts pour indiquer les routes publiques qui n'ont pas besoin d'être authentifiées pour être visitées.
  ```jsx
  export default authMiddleware({
    publicRoutes: ["/", "/api/webhook"],
  });
  ```
- Modifier l'affichage du formulaire de connexion qui n'est pas centré par défaut en créant un fichier layout app\(auth)\(routes)\layout.tsx
  ```jsx
  const AuthLayout = ({
      children
    }: {
      children: React.ReactNode;
    }) => {
      return ( 
        <main className="h-full bg-[#111827] flex items-center justify-center">
          {children}
        </main>
      );
    }
     
    export default AuthLayout;
  ```
  Possibilité de modifier le formulaire sur le site [https://dashboard.clerk.com/](https://dashboard.clerk.com/) dans la partie du menu de personnalisation.

*******************

- Création du layout pour le dashboard.
- Création de la navbar et de la sidebar responsive.
- Création du dashboard utilisateur connecté.
- Création de la partie conversation.

# API OPEN AI 

Il est nécessaire d'avoir un compte payant pour l'utilisation des clés API.
- Se connecter à son compte OpenAI et se diriger vers le lien suivant : [OpenAI API keys](https://platform.openai.com/api-keys).
- Créer une clé API.
- Renseigner la clé API d'OpenAI dans une variable `OPENAI_API_KEY` à l'intérieur du fichier `.env`.
- Installer dans le projet depuis la console la dépendance d'OpenAI :
  ```bash
  npm i openai # version openai 3.3.0

- Dans le fichier `api\conversation\route.ts`, importer les dépendances nécessaires (voir code).
- Voir code du fichier `app\(dashboard)\(routes)\conversation\page.tsx`.

# GENERATEUR D'IMAGE 

- Pour autoriser les sources d'images extérieures, modifier le fichier `next.config.mjs` :

  ```javascript
  /** @type {import('next').NextConfig} */
  const nextConfig = {
      images: {
          domains: [
              "googleusercontent.com",
              "oaidalleapiprodscus.blob.core.windows.net",
              "cdn.openai.com"
          ]
      },
  }

  export default nextConfig;
  ```

- Voir code dans les fichiers `app\(dashboard)\(routes)\image\page.tsx` et `app\api\image\route.ts`.

# GENERATEUR MUSIQUE - VIDEO 

- Sur le projet, depuis la console, installer le package replicate avec la commande suivante :
  ```bash
  npm i replicate
  ```
- Se rendre sur le site [Replicate](https://replicate.com/) et se connecter.
- Générer une clé API [ici](https://replicate.com/account/api-tokens).
- Renseigner la clé API générée dans une variable d'environnement dans le fichier `.env` : `REPLICATE_API_TOKEN=`.

Pour la musique (Modèle riffusion) :
- Suivre la documentation pour le modèle choisi, fournie [ici pour Node.js](https://replicate.com/riffusion/riffusion?input=nodejs) ou [ici pour l'API](https://replicate.com/riffusion/riffusion/api?tab=nodejs).
- Voir le fichier `app\api\music\route.ts` dans le projet ainsi que le fichier `app\(dashboard)\(routes)\music\page.tsx`.

Pour la vidéo (Modèle zeroscope-v2-xl) :
- Suivre la documentation pour le modèle choisi, fournie [ici pour Node.js](https://replicate.com/anotherjesse/zeroscope-v2-xl?input=nodejs) ou [ici pour l'API](https://replicate.com/anotherjesse/zeroscope-v2-xl/api?tab=nodejs).
- Voir le fichier `app\api\video\route.ts` dans le projet ainsi que le fichier `app\(dashboard)\(routes)\video\page.tsx`.
```

Voici la suite de votre README au format Markdown, concernant l'installation et la configuration de Prisma :

```markdown

# PRISMA 

Installation de Prisma sur le projet depuis la console :
```bash
npm i -D prisma
npx prisma init
```

Cette commande rajoute un fichier `prisma\schema.prisma` ainsi qu'une variable d'environnement par défaut `DATABASE_URL` dans le fichier `.env`.
- Création de la base de données sur le site [PlanetScale](https://app.planetscale.com/).
- Créer un nouveau mot de passe pour la base de données.
- Rechercher la configuration pour une base de données avec Prisma [ici](https://app.planetscale.com/grafiti54/sass-ai-generator/connect) et suivre les instructions.
- Remplacer la valeur de la variable `DATABASE_URL` dans le fichier `.env`.
- Copier et coller le code fourni dans le fichier `prisma\schema.prisma` :

  ```prisma
  datasource db {
    provider     = "mysql"
    url          = env("DATABASE_URL")
    relationMode = "prisma"
  }

  generator client {
    provider = "prisma-client-js"
  }
  ```

- Installer le client Prisma depuis la console avec la commande suivante :
  ```bash
  npm i @prisma/client
  ```
- Créer le fichier `lib\prismadb.ts` avec le code de connexion à la base de données.

  ```typescript
  import { PrismaClient } from "@prisma/client"

  declare global {
    var prisma: PrismaClient | undefined
  }

  const prismadb = globalThis.prisma || new PrismaClient()
  if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb

  export default prismadb;
  ```

- Créer les différents modèles du projet dans le fichier `prisma\schema.prisma`.
- Ajouter les tables des différents modèles dans la base de données depuis la console avec les commandes suivantes :
  ```bash
  npx prisma db push
  npx prisma generate
  npx prisma studio
  ```




# STRIPE 

- Dans la console, installer Stripe sur le projet :
  ```bash
  npm i stripe
  ```

- Créer et se connecter à son compte Stripe [ici](https://dashboard.stripe.com/login).
- Récupérer les clés API [Stripe API Keys](https://dashboard.stripe.com/test/apikeys).
- Dans le fichier `.env`, renseigner la clé publique API de Stripe :

  ```env
  # Clé privée
  STRIPE_API_KEY=
  ```

- Effectuer la configuration de Stripe pour le projet dans le fichier `lib\stripe.ts` :

  ```typescript
  import Stripe from "stripe"

  export const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
    apiVersion: "2023-10-16",
    typescript: true,
  });
  ```

- Création du modèle Prisma pour l'inscription d'un utilisateur à l'abonnement :

  ```prisma
  model UserSubscription {
    id                    String    @id @default(cuid())
    userId                String    @unique
    stripeCustomerId      String?   @unique @map(name: "stripe_customer_id")
    stripeSubscriptionId  String?   @unique @map(name: "stripe_subscription_id")
    stripePriceId         String?   @map(name: "stripe_price_id")
    stripeCurrentPeriodEnd DateTime? @map(name: "stripe_current_period_end")
  }
  ```

  Générer le client Prisma et pousser la base de données :
  ```bash
  npx prisma generate
  npx prisma db push
  ```

- Configuration de Stripe dans le fichier `app\api\stripe\route.ts`.
- Configuration du webhook de Stripe dans le fichier `app\api\webhook\route.ts`.
- Créer le webhook Stripe [ici](https://dashboard.stripe.com/test/webhooks) en cliquant sur le bouton "Tester en local".
- Télécharger ou installer l'interface de ligne de commande (CLI) de Stripe, documentation [ici](https://stripe.com/docs/stripe-cli). Depuis la console :
  ```bash
  stripe login
  stripe listen --forward-to localhost:3000/api/webhook
  ```
  Un message indiquant : "Ready! You are using Stripe API Version [2023-10-16]. Your webhook signing secret is ....." apparaitra.
- Copier le webhook signing secret.
- Coller le webhook signing secret dans le fichier `.env` dans la variable `STRIPE_WEBHOOK_SECRET`.
- Tester l'intégration et la redirection vers Stripe dans le fichier `components\pro-modal.tsx` avec l'ajout de la fonction `onSubscribe` au moment du clic sur le bouton pour s'abonner.

- Configurer dans le fichier `middleware.ts` la redirection après paiement effectué en rajoutant `/api/webhook` :

  ```typescript
  export default authMiddleware({
    publicRoutes: ["/", "/api/webhook"],
  });
  ```

- Configurer le portail client de l'utilisateur, lui permettant de voir avec Stripe son abonnement en cours et de pouvoir l'annuler, en allant sur [Stripe Billing Portal](https://dashboard.stripe.com/test/settings/billing/portal) et cliquer sur le bouton "Activer le lien".
- Lorsque l'utilisateur clique sur le bouton "Gérer l'abonnement" sur la page settings du menu, il sera redirigé vers une page Stripe lui permettant d'effectuer ces actions.

