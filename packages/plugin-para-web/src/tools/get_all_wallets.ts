import {para} from "../utils/config";

export async function getAllWallets() {
  try {
  const isLoggedIn = await para.isFullyLoggedIn();
if(!isLoggedIn){
  throw new Error("Please login to Para to get wallets.");
}
    
const wallets = Object.values(await para.getWallets());

    return {
       wallets
    };
  } catch (error: any) {
    throw new Error(`get wallets failed ${error.message}`);
  }
}
