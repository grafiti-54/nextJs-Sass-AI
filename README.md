

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
  Possibilité de modifier le formulaire sur le site [https://dashboard.clerk.com/](https://dashboard.clerk.com/) dans la partie du menu customization.
```
Voici la continuation de votre README avec les corrections orthographiques apportées :

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

