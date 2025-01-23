import { BridgeInput } from "../../types";
import { DEBRIDGE_API } from "../../constants";
import { VersionedTransaction } from "@solana/web3.js";
import { SolanaAgentKit } from "../../agent";

export async function bridge(
  agent: SolanaAgentKit,
  params: BridgeInput,
): Promise<string> {
  const queryParams = new URLSearchParams({
    senderAddress: agent.wallet_address.toString(),
    srcChainOrderAuthorityAddress: agent.wallet_address.toString(),
    ...params,
  } as unknown as URLSearchParams);

  const response = await fetch(
    `${DEBRIDGE_API}/dln/order/create-tx?` + queryParams,
  );
  const {
    tx: { data },
  } = await response.json();

  const txBuffer = Buffer.from(data.substring(2), "hex");

  const transaction = VersionedTransaction.deserialize(txBuffer);

  transaction.sign([agent.wallet]);

  const signature = await agent.connection.sendTransaction(transaction);

  return signature;
}
