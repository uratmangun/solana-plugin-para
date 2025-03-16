import {para} from "../utils/config";

export async function claimParaPregenWallet() {
  let email:string|undefined;
  try {
   
    const isLoggedIn = await para.isFullyLoggedIn();
if(!isLoggedIn){
  throw new Error("Please login to Para to claim a pre-generated wallet.");
}
    email=await para.getEmail();
    
     await para.claimPregenWallets({
      pregenIdentifier: email,
      pregenIdentifierType: "EMAIL",
    });
    
 

    return {
      message: "Pre-generated wallet claimed successfully.",
    email
    };
  } catch (error: any) {
       // false positive Error: Cannot read properties of undefined (reading 'scheme')
       if((error as Error).message.includes("Cannot read properties of undefined (reading 'scheme')")){
        return {
          message: "Pre-generated wallet claimed successfully.",
        email
        };
      }else{
        throw new Error(error.message);
      }
   
  }
}
