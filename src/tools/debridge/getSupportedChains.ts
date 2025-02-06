import { DEBRIDGE_API } from "../../constants";

export interface ChainInfo {
  chainId: string;
  originalChainId: string;
  chainName: string;
}

export interface SupportedChainsResponse {
  chains: ChainInfo[];
}

export async function getSupportedChains(): Promise<SupportedChainsResponse> {
  const response = await fetch(`${DEBRIDGE_API}/supported-chains-info`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch supported chains: ${response.statusText}`);
  }

  const data = await response.json();
  
  if ('error' in data) {
    throw new Error(`API Error: ${data.error}`);
  }

  return data;
}
