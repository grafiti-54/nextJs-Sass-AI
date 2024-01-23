import Replicate from "replicate";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


// import { checkSubscription } from "@/lib/subscription";
import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(
  req: Request
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("Prompt are required", { status: 400 });
    }

    const freeTrial = await checkApiLimit();
    //const isPro = await checkSubscription();

    //Erreur status 403 va permettre de redirigé l'utilisateur coté client.
    if (!freeTrial) {
      return new NextResponse("L'essai gratuit a expiré. Veuillez passer à la version Pro.", { status: 403 });
    }

    //https://replicate.com/anotherjesse/zeroscope-v2-xl/api?tab=nodejs
    const response = await replicate.run(
      "anotherjesse/zeroscope-v2-xl:71996d331e8ede8ef7bd76eba9fae076d31792e4ddf4ad057779b443d6aea62f",
      {
        input: {
          prompt,
        }
      }
    );

    //todo ispro a supprimer
    const isPro = false
    if (!isPro) {
      await incrementApiLimit();
    }

    return NextResponse.json(response);

  } catch (error) {
    console.log("[VIDEO_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 })
  }
}