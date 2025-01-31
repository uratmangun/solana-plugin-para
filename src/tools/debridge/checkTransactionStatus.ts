import { SolanaAgentKit } from "../../agent";
import { DEBRIDGE_API } from "../../constants";

/**
 * Response type for order IDs lookup
 */
interface OrderIdsResponse {
  orderIds: string[];
  errorCode?: number;
  errorMessage?: string;
}

/**
 * Response type for order status
 */
interface OrderStatusResponse {
  status: string;
  srcChainTxHash: string;
  dstChainTxHash?: string;
  orderLink: string;
  error?: string;
}

/**
 * Check the status of bridge transactions using their transaction hash
 * This method retrieves the current status of one or more bridge transactions
 *
 * @param agent SolanaAgentKit instance
 * @param txHash Transaction hash to check status for
 * @returns Status information for the bridge transaction
 * @throws {Error} If the API request fails or returns an error
 * 
 * @example
 * ```typescript
 * const status = await checkTransactionStatus(agent, "5v6Jx3qHsNaQvPe1Cs3AooAiY2ZnutxQHNJrHw9SwJzAeaDXMaD2JYGE579CFk88jMFw4YiKqmLUc6QCAwvhjKQX");
 * ```
 */
export async function checkTransactionStatus(
  agent: SolanaAgentKit,
  txHash: string
): Promise<OrderStatusResponse[]> {
  try {
    // Get order IDs for the transaction
    const orderIdsUrl = `${DEBRIDGE_API}/dln/tx/${txHash}/order-ids`;
    const orderIdsResponse = await fetch(orderIdsUrl);
    const responseData = await orderIdsResponse.json();

    if (!orderIdsResponse.ok) {
      if (responseData.errorCode === 2) {
        throw new Error("Invalid Solana transaction signature");
      } else {
        throw new Error(responseData.errorMessage || "Unknown error");
      }
    }

    const orderIdsData = responseData as OrderIdsResponse;
    if (!orderIdsData.orderIds || orderIdsData.orderIds.length === 0) {
      throw new Error("No bridge orders found for this transaction");
    }

    // Get status for each order
    const statuses = await Promise.all(
      orderIdsData.orderIds.map(async (orderId) => {
        const statusUrl = `${DEBRIDGE_API}/dln/order/${orderId}/status`;
        const statusResponse = await fetch(statusUrl);
        
        if (!statusResponse.ok) {
          throw new Error(`Failed to get status for order ${orderId}`);
        }

        const statusData = (await statusResponse.json()) as OrderStatusResponse;
        statusData.orderLink = `https://app.debridge.finance/order?orderId=${orderId}`;
        return statusData;
      })
    );

    return statuses;
  } catch (error: any) {
    throw error;
  }
}
