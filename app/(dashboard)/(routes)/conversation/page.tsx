'use client';

import axios from "axios";
import * as z from "zod"; // schéma de validation des formulaires
import { Heading } from "@/components/heading";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

import { formSchema } from "./constants"; // Schéma de validation du champs pour le prompt
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/loader";
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";
import { Empty } from "@/components/ui/empty";
import { cn } from "@/lib/utils";
import { BotAvatar } from "@/components/bot-avatar";
import { UserAvatar } from "@/components/user-avatar";
import { useProModal } from "@/hooks/use-pro-modal";

//Page la conversation avec l'ia.
const ConversationPage = () => {
  const router = useRouter();
  const proModal = useProModal();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

  //z.infer extrait le type TypeScript du schéma Zod, ce qui garantit que les données de votre formulaire correspondent au schéma défini
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema), // Utilise Zod pour la validation des données de formulaire
    //Valeurs par défaut pour les champs de formulaire
    defaultValues: {
      prompt: ""
    }
  });

  //Suivi de l'état de soumission du formulaire avec react-hook-form.
  const isLoading = form.formState.isSubmitting;

  // Fonction de validation du formulaire
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // //console.log(values);
    try {
      const userMessage: ChatCompletionRequestMessage = { role: "user", content: values.prompt };
      const newMessages = [...messages, userMessage];

      const response = await axios.post('/api/conversation', { messages: newMessages });
      setMessages((current) => [...current, userMessage, response.data]);
      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
        // //console.log("error : fini les prompt gratuits !");
      }
    } finally {
      router.refresh();
    }
  }

  return (
    <div>
      <Heading
        title="Conversation"
        description="Notre modèle de conversation le plus performant"
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="
                rounded-lg 
                border 
                w-full 
                p-4 
                px-3 
                md:px-6 
                focus-within:shadow-sm
                grid
                grid-cols-12
                gap-2
              "
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="Capitale du Pérou ?"
                        {...field} // remplace onChange onBlur value ...
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="col-span-12 lg:col-span-2 w-full" type="submit" disabled={isLoading} size="icon">
                Valider
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {/* Indique le chargement d'une réponse */}
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {/* Indique si il n'y as pas de conversation */}
          {messages.length === 0 && !isLoading && (

            <Empty label="Aucune conversation actuellement, commencez maintenant !" />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message) => (
              <div key={message.content}
                className={cn(
                  "p-8 w-full flex items-start gap-x-8 rounded-lg",
                  message.role === "user" ? "bg-white border border-black/10" : "bg-muted",
                )}
              >
                {/* Affichage dynamique du message selon question(user)/réponse(ai)  */}
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                <p className="text-sm">
                  {message.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConversationPage;