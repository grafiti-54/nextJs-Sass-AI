'use client';

import axios from "axios";
import * as z from "zod"; // schéma de validation des formulaires
import { Heading } from "@/components/heading";
import { FileAudio } from "lucide-react";
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

//Page pour la demande de création d'une video par l'ai.
const VideoPage = () => {
  const router = useRouter();
  const proModal = useProModal();
  const [video, setVideo] = useState<string>();

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
      setVideo(undefined)
      const response = await axios.post('/api/video', values);
      setVideo(response.data[0])
      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      }
      console.log(error);
    } finally {
      router.refresh();
    }
  }

  return (
    <div>
      <Heading
        title="Vidéo"
        description="Transformez vos idées en vidéo"
        icon={FileAudio}
        iconColor="text-orange-700"
        bgColor="bg-orange-700/10"
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
                        placeholder="Poisson-clown nageant dans un récif corallien, magnifique, 8K, parfait, primé, National Geographic"
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
          {!video && !isLoading && (

            <Empty label="Aucune vidéo actuellement, commencez maintenant !" />
          )}
          {/* Génération de la musique ici */}
          {video && (
          <video controls className="w-full aspect-video mt-8 rounded-lg border bg-black">
            <source src={video} />
            <track kind="captions" label="No captions available" default />
          </video>
        )}
        </div>
      </div>
    </div>
  )
}

export default VideoPage;