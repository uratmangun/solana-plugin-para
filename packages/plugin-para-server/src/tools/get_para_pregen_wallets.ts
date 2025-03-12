import { para } from "../utils/config";

export async function getParaPregenWallets(email: string) {
  try {
    const listAllPregenWallets = await para.getPregenWallets({
      pregenIdentifier: email,
      pregenIdentifierType: "EMAIL",
    });

    return {
      listAllPregenWallets,
    };
  } catch (error: any) {
    throw new Error(`list all pregen wallets failed ${error.message}`);
  }
}
