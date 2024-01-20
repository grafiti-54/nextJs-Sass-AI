'use client';

import * as z from "zod"; // schéma de validation des formulaires
import { Heading } from "@/components/heading";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

import { formSchema } from "./constants"; // Schéma de validation du champs pour le prompt
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/loader";


const ConversationPage = () => {

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
    console.log(values);

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
          Liste des messages
        </div>
      </div>
    </div>
  )
}

export default ConversationPage;