//Layout pour formulaire de connexion/inscription clerk.
const AuthLayout = ({
    children
  }: {
    children: React.ReactNode;
  }) => {
    return ( 
      <main className="h-full bg-[#192e5c] flex items-center justify-center">
        {children}
      </main>
    );
  }
   
  export default AuthLayout;