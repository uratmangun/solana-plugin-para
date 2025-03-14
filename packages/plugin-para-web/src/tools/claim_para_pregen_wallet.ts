import {para} from "../utils/config";

export async function claimParaPregenWallet(email: string) {
  try {
    if (!email) {
      throw new Error("Provide `email` in the request body to claim a pre-generated wallet.");
    }
    const isLoggedIn = await para.isFullyLoggedIn();
if(!isLoggedIn){
  throw new Error("Please login to Para using email: " + email + " to claim a pre-generated wallet.");
}
    
    const wallet = await para.claimPregenWallets({
       pregenIdentifier: email,
      pregenIdentifierType: "EMAIL",
    });
    if (!wallet) {
      throw new Error(
        "Failed to claim pre-generated wallet. Check your Para configuration and try again.",
      );
    }
 

    return {
      message: "Pre-generated wallet claimed successfully.",
    email
    };
  } catch (error: any) {
    throw new Error(`claim pregen wallet failed ${error.message}`);
  }
}
