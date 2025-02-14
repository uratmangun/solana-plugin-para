import { Plugin, SolanaAgentKit } from "solana-agent-kit";

// Import Adrena actions & tools
import {
  openPerpTradeLongAction,
  openPerpTradeShortAction,
  closePerpTradeLongAction,
  closePerpTradeShortAction,
} from './adrena/actions/adrenaPerpTrading';
import { openPerpTradeLong, openPerpTradeShort, closePerpTradeLong, closePerpTradeShort } from './adrena/tools';

// Import Flash actions & tools
import flashCloseTradeAction from './flash/actions/flashCloseTrade';
import flashOpenTradeAction from './flash/actions/flashOpenTrade';
import { flashCloseTrade, flashOpenTrade } from './flash/tools';

// Import Lulo actions & tools
import lendAssetAction from './lulo/actions/lendAsset';
import luloLendAction from './lulo/actions/luloLend';
import luloWithdrawAction from './lulo/actions/luloWithdraw';
import { lendAsset, luloLend, luloWithdraw } from './lulo/tools';

// Import Manifest tools
import { limitOrder, cancelAllOrders, withdrawAll, manifestCreateMarket } from './manifest/tools';

// Import Meteora actions & tools
import createMeteoraDLMMPoolAction from './meteora/actions/createMeteoraDLMMPool';
import createMeteoraDynamicAMMPoolAction from './meteora/actions/createMeteoraDynamicAMMPool';
import { createMeteoraDlmmPool, createMeteoraDynamicAMMPool } from './meteora/tools';

// Import Openbook actions
import createOpenbookMarketAction from './openbook/actions/createOpenbookMarket';

// Import Orca actions
import createOrcaSingleSidedWhirlpoolAction from './orca/actions/createOrcaSingleSidedWhirlpool';

// Import Raydium actions
import raydiumCreateAmmV4Action from './raydium/actions/raydiumCreateAmmV4';
import raydiumCreateClmmAction from './raydium/actions/raydiumCreateClmm';
import raydiumCreateCpmmAction from './raydium/actions/raydiumCreateCpmm';

// Import Solayer actions
import stakeWithSolayerAction from './solayer/actions/stakeWithSolayer';

// Import Voltr actions
import depositVoltrStrategyAction from './voltr/actions/depositStrategy';
import getVoltrPositionValuesAction from './voltr/actions/getPositionValues';
import withdrawVoltrStrategyAction from './voltr/actions/withdrawStrategy';

// Import Openbook tools
import { openbookCreateMarket } from './openbook/tools';

// Import Orca tools
import { 
  orcaClosePosition,
  orcaCreateCLMM,
  orcaCreateSingleSidedLiquidityPool,
  orcaFetchPositions,
  orcaOpenCenteredPositionWithLiquidity,
  orcaOpenSingleSidedPosition
} from './orca/tools';

// Import Raydium tools
import { 
  raydiumCreateAmmV4,
  raydiumCreateClmm,
  raydiumCreateCpmm 
} from './raydium';

// Import Solayer tools
import { stakeWithSolayer } from './solayer/tools';

// Import Voltr tools
import { 
  voltrDepositStrategy,
  voltrGetPositionValues,
  voltrWithdrawStrategy 
} from './voltr/tools';

// Define and export the plugin
const DefiPlugin: Plugin = {
  name: 'defi',
  
  // Combine all tools
  methods: {
    // Adrena methods
    openPerpTradeLong,
    openPerpTradeShort,
    closePerpTradeLong,
    closePerpTradeShort,

    // Flash methods
    flashCloseTrade,
    flashOpenTrade,

    // Lulo methods
    lendAsset,
    luloLend,
    luloWithdraw,

    // Manifest methods
    limitOrder,
    cancelAllOrders,
    withdrawAll,
    manifestCreateMarket,

    // Meteora methods
    createMeteoraDlmmPool,
    createMeteoraDynamicAMMPool,

    // Openbook methods
    openbookCreateMarket,

    // Orca methods
    orcaClosePosition,
    orcaCreateCLMM,
    orcaCreateSingleSidedLiquidityPool,
    orcaFetchPositions,
    orcaOpenCenteredPositionWithLiquidity,
    orcaOpenSingleSidedPosition,

    // Raydium methods
    raydiumCreateAmmV4,
    raydiumCreateClmm,
    raydiumCreateCpmm,

    // Solayer methods
    stakeWithSolayer,

    // Voltr methods
    voltrDepositStrategy,
    voltrGetPositionValues,
    voltrWithdrawStrategy,
  },

  // Combine all actions
  actions: [
    // Adrena actions
    openPerpTradeLongAction,
    openPerpTradeShortAction,
    closePerpTradeLongAction,
    closePerpTradeShortAction,

    // Flash actions
    flashCloseTradeAction,
    flashOpenTradeAction,

    // Lulo actions
    lendAssetAction,
    luloLendAction,
    luloWithdrawAction,

    // Meteora actions
    createMeteoraDLMMPoolAction,
    createMeteoraDynamicAMMPoolAction,

    // Openbook actions
    createOpenbookMarketAction,

    // Orca actions
    createOrcaSingleSidedWhirlpoolAction,

    // Raydium actions
    raydiumCreateAmmV4Action,
    raydiumCreateClmmAction,
    raydiumCreateCpmmAction,

    // Solayer actions
    stakeWithSolayerAction,

    // Voltr actions
    depositVoltrStrategyAction,
    getVoltrPositionValuesAction,
    withdrawVoltrStrategyAction,
  ],

  // Initialize function
  initialize: function(agent: SolanaAgentKit): void {
    // Initialize all methods with the agent instance
    Object.entries(this.methods).forEach(([methodName, method]) => {
      if (typeof method === 'function') {
        this.methods[methodName] = method.bind(null, agent);
      }
    });

    // Any necessary initialization logic
    if (!agent.config.OPENAI_API_KEY) {
      console.warn('Warning: OPENAI_API_KEY not provided in config');
    }
  }
};

// Default export for convenience
export = DefiPlugin;
