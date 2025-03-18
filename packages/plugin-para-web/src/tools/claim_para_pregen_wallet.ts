import { para } from "../utils/config";

export async function claimParaPregenWallet(agent:any,userShare:string) {
  let email: string | undefined;
  try {
   

    const isLoggedIn = await para.isFullyLoggedIn();
    if (!isLoggedIn) {
      throw new Error("Please login to Para to claim a pre-generated wallet.");
    }
    if(!userShare){
      throw new Error("userShare required");     
    }
    email = await para.getEmail();
    
    await para.setUserShare(userShare);
    await para.claimPregenWallets({
      pregenIdentifier: email,
      pregenIdentifierType: "EMAIL",
    });

    return {
      message: "Pre-generated wallet claimed successfully.",
      email,
    };
  } catch (error: any) {
  
      throw new Error(error.message);
   
  }
}
