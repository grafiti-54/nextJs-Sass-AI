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


/**
Configuration des Images :
images: {...} est un objet dans la configuration de Next.js qui spécifie comment les images sont gérées.
domains: [...] est un tableau de chaînes de caractères qui spécifie les domaines desquels les images peuvent être chargées. Next.js, par défaut, ne permet pas de charger des images de domaines externes pour des raisons de sécurité. En ajoutant des domaines à cette liste, vous autorisez Next.js à servir des images provenant de ces sources externes.
Domaines Autorisés :
Les domaines spécifiés dans l'exemple - "googleusercontent.com", "oaidalleapiprodscus.blob.core.windows.net", et "cdn.openai.com" - sont les seuls domaines externes d'où les images peuvent être chargées. Cela peut être utile si votre application utilise des images stockées sur ces domaines.
Ce code configure votre application Next.js pour permettre le chargement d'images à partir de domaines spécifiques, étendant ainsi les capacités de gestion des images au-delà des limites par défaut de Next.js 
*/
