import {para} from "../utils/config"

export async function switchWallet(userShare:string,type:"pregen" | "main") {
  try {
    if (type=="pregen" && !userShare) {
      throw new Error(
        "Provide `userShare` in the request body to switch wallet.",
      );
    }

    if (type=="main" ) {
      
    }else{
 await para.setUserShare(userShare)     
    }
    



    return {
      message: "switched to pre-generated wallet successfully",
      
    };
  } catch (error: any) {
    throw new Error(`Error updating pre-generated wallet: ${error.message}`);
  }
}
