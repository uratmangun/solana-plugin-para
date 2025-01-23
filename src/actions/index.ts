import tokenBalancesAction from "./tokenBalances";
import getWalletAddressAction from "./getWalletAddress";
export const ACTIONS = {
  WALLET_ADDRESS_ACTION: getWalletAddressAction,
  TOKEN_BALANCES_ACTION: tokenBalancesAction,
}

export type { Action, ActionExample, Handler } from "../types/action";
