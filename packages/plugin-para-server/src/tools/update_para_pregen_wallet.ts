import { para } from "../utils/config";

export async function updateParaPregenWallet(email: string, walletId: string) {
  try {
    if (!email) {
      throw new Error(
        "Provide `email` in the request body to create a pre-generated wallet.",
      );
    }

    const walletExists = await para.hasPregenWallet({
      pregenIdentifier: email,
      pregenIdentifierType: "EMAIL",
    });
    if (walletExists) {
      throw new Error(
        "A pre-generated wallet already exists for this user. Consider using that wallet or choose a different email.",
      );
    }

    await para.updatePregenWalletIdentifier({
      walletId: walletId,
      newPregenIdentifier: email,
      newPregenIdentifierType: "EMAIL",
    });

    return {
      message: "Pre-generated wallet updated successfully.",
      walletId,
      email,
    };
  } catch (error: any) {
    throw new Error(`Error updating pre-generated wallet: ${error.message}`);
  }
}
