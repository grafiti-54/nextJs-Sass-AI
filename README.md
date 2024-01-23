

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
