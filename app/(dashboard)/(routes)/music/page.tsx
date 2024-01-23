'use client';

import axios from "axios";
import * as z from "zod"; // schéma de validation des formulaires
import { Heading } from "@/components/heading";
import { Music } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

import { formSchema } from "./constants"; // Schéma de validation du champs pour le prompt
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/loader";
import { useRouter } from "next/navigation";
import { Empty } from "@/components/ui/empty";
import { useProModal } from "@/hooks/use-pro-modal";
import toast from "react-hot-toast";

//Page pour la demande de création d'une musique par l'ai.
const MusicPage = () => {
  const router = useRouter();
  const proModal = useProModal();
  const [music, setMusic] = useState<string>();

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
      setMusic(undefined)
      const response = await axios.post('/api/music', values);
      setMusic(response.data.audio)
      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error("Une erreur est survenue !")
      }
      console.log(error);
    } finally {
      router.refresh();
    }
  }

  return (
    <div>
      <Heading
        title="Musique"
        description="Transformez vos idées en musique"
        icon={Music}
        iconColor="text-emerald-500"
        bgColor="bg-emerald-500/10"
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
                        placeholder="Orchestre de musique"
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
          {!music && !isLoading && (

            <Empty label="Aucune musique actuellement, commencez maintenant !" />
          )}
          {/* Génération de la musique ici */}
          {music && (
          <audio controls className="w-full mt-8">
            <source src={music} />
            <track kind="captions" src="" label="No captions available" default />
          </audio>
        )}
        </div>
      </div>
    </div>
  )
}

export default MusicPage;