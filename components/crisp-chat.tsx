"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

// Configuration chatbot https://app.crisp.chat/
export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("3644a904-554d-4800-8d41-4777ddcd70de");
    }, []);

    return null;
};




// import { useEffect } from "react";
// import { Crisp } from "crisp-sdk-web";

// export const CrispChat = () => {
//     useEffect(() => {
//         // Utilisez la variable d'environnement ici
//         const crispWebsiteId = process.env.CRISP_WEBSITE_ID;
//         if (crispWebsiteId) {
//             Crisp.configure(crispWebsiteId);
//         }
//     }, []);

//     return null;
// };