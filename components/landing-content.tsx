"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const testimonials = [
    {
        name: "Julien",
        avatar: "J",
        title: "Ingénieur Logiciel",
        description: "C'est la meilleure application que j'ai jamais utilisée. 😉",
    },
    {
        name: "Sofia",
        avatar: "S",
        title: "Designer",
        description: "J'utilise cela quotidiennement pour générer de nouvelles photos.",
    },
    {
        name: "Thomas",
        avatar: "T",
        title: "PDG",
        description: "Cette appli a changé ma vie 🙂, je ne peux plus travailler sans.",
    },
    {
        name: "Marie",
        avatar: "M",
        title: "Directrice Financière",
        description: "Le meilleur de sa catégorie, l'abonnement premium en vaut vraiment la peine.",
    },
];

export const LandingContent = () => {
    return (
        <div className="px-10 pb-20">
            <h2 className="text-center text-4xl text-white font-extrabold mb-10">Témoignages</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {testimonials.map((item) => (
                    <Card key={item.description} className="bg-[#192339] border-none text-white">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-x-2">
                                <div>
                                    <p className="text-lg">{item.name}</p>
                                    <p className="text-zinc-400 text-sm">{item.title}</p>
                                </div>
                            </CardTitle>
                            <CardContent className="pt-4 px-0">
                                {item.description}
                            </CardContent>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    )
}