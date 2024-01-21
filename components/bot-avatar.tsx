import { Avatar, AvatarImage } from "@/components/ui/avatar";

//Composant Avatar representant l'IA lors de la conversation.
export const BotAvatar = () => {
  return (
    <Avatar className="h-8 w-8">
      <AvatarImage className="p-1" src="/logo.png" />
    </Avatar>
  );
};