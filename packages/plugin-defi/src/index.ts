import { Plugin, SolanaAgentKit } from "solana-agent-kit";

// Import Adrena actions & tools
import {
  openPerpTradeLongAction,
  openPerpTradeShortAction,
  closePerpTradeLongAction,
  closePerpTradeShortAction,
} from "./adrena/actions/adrenaPerpTrading";
import {
  openPerpTradeLong,
  openPerpTradeShort,
  closePerpTradeLong,
  closePerpTradeShort,
} from "./adrena/tools";

// Import Flash actions & tools
import flashCloseTradeAction from "./flash/actions/flashCloseTrade";
import flashOpenTradeAction from "./flash/actions/flashOpenTrade";
import { flashCloseTrade, flashOpenTrade } from "./flash/tools";

// Import Lulo actions & tools
import lendAssetAction from "./lulo/actions/lendAsset";
import luloLendAction from "./lulo/actions/luloLend";
import luloWithdrawAction from "./lulo/actions/luloWithdraw";
import { lendAsset, luloLend, luloWithdraw } from "./lulo/tools";

// Import Manifest tools & actions
import {
  limitOrder,
  cancelAllOrders,
  withdrawAll,
  manifestCreateMarket,
} from "./manifest/tools";
import withdrawAllAction from "./manifest/actions/withdrawAll";
import limitOrderAction from "./manifest/actions/limitOrder";
import cancelAllOrdersAction from "./manifest/actions/cancelAllOrders";
import manifestCreateMarketAction from "./manifest/actions/manifestCreateMarket";

// Import Meteora actions & tools
import createMeteoraDLMMPoolAction from "./meteora/actions/createMeteoraDLMMPool";
import createMeteoraDynamicAMMPoolAction from "./meteora/actions/createMeteoraDynamicAMMPool";
import {
  createMeteoraDlmmPool,
  createMeteoraDynamicAMMPool,
} from "./meteora/tools";

// Import Openbook actions
import createOpenbookMarketAction from "./openbook/actions/createOpenbookMarket";

// Import Orca actions
import createOrcaSingleSidedWhirlpoolAction from "./orca/actions/createOrcaSingleSidedWhirlpool";

// Import Raydium actions
import raydiumCreateAmmV4Action from "./raydium/actions/raydiumCreateAmmV4";
import raydiumCreateClmmAction from "./raydium/actions/raydiumCreateClmm";
import raydiumCreateCpmmAction from "./raydium/actions/raydiumCreateCpmm";

// Import Solayer actions
import stakeWithSolayerAction from "./solayer/actions/stakeWithSolayer";

// Import Voltr actions
import depositVoltrStrategyAction from "./voltr/actions/depositStrategy";
import getVoltrPositionValuesAction from "./voltr/actions/getPositionValues";
import withdrawVoltrStrategyAction from "./voltr/actions/withdrawStrategy";

// Import Drift actions
import availableDriftMarketsAction from "./drift/actions/availableMarkets";
import createDriftUserAccountAction from "./drift/actions/createDriftUserAccount";
import createVaultAction from "./drift/actions/createVault";
import depositIntoDriftVaultAction from "./drift/actions/depositIntoVault";
import depositToDriftUserAccountAction from "./drift/actions/depositToDriftUserAccount";
import deriveDriftVaultAddressAction from "./drift/actions/deriveVaultAddress";
import doesUserHaveDriftAcccountAction from "./drift/actions/doesUserHaveDriftAccount";
import driftUserAccountInfoAction from "./drift/actions/driftUserAccountInfo";
import entryQuoteOfDriftPerpTradeAction from "./drift/actions/entryQuoteOfPerpTrade";
import getDriftLendAndBorrowAPYAction from "./drift/actions/getLendAndBorrowAPY";
import driftPerpMarketFundingRateAction from "./drift/actions/perpMarketFundingRate";
import requestUnstakeFromDriftInsuranceFundAction from "./drift/actions/requestUnstakeFromDriftInsuranceFund";

// Import Openbook tools
import { openbookCreateMarket } from "./openbook/tools";

// Import Orca tools
import {
  orcaClosePosition,
  orcaCreateCLMM,
  orcaCreateSingleSidedLiquidityPool,
  orcaFetchPositions,
  orcaOpenCenteredPositionWithLiquidity,
  orcaOpenSingleSidedPosition,
} from "./orca/tools";

// Import Raydium tools
import {
  raydiumCreateAmmV4,
  raydiumCreateClmm,
  raydiumCreateCpmm,
} from "./raydium";

// Import Solayer tools
import { stakeWithSolayer } from "./solayer/tools";

// Import Voltr tools
import {
  voltrDepositStrategy,
  voltrGetPositionValues,
  voltrWithdrawStrategy,
} from "./voltr/tools";

// Import Drift tools
import {
  driftPerpTrade,
  calculatePerpMarketFundingRate,
  createVault,
  createDriftUserAccount,
  depositIntoVault,
  depositToDriftUserAccount,
  doesUserHaveDriftAccount,
  driftUserAccountInfo,
  getAvailableDriftPerpMarkets,
  getAvailableDriftSpotMarkets,
  getLendingAndBorrowAPY,
  updateVault,
  withdrawFromDriftVault,
  withdrawFromDriftUserAccount,
  requestWithdrawalFromVault,
  updateVaultDelegate,
  getVaultInfo,
  getVaultAddress,
  tradeDriftVault,
  swapSpotToken,
  stakeToDriftInsuranceFund,
  requestUnstakeFromDriftInsuranceFund,
  unstakeFromDriftInsuranceFund,
} from "./drift/tools";

// Define and export the plugin
const DefiPlugin = {
  name: "defi",

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

    // Drift methods,
    driftPerpTrade,
    calculatePerpMarketFundingRate,
    createVault,
    createDriftUserAccount,
    depositIntoVault,
    depositToDriftUserAccount,
    doesUserHaveDriftAccount,
    driftUserAccountInfo,
    getAvailableDriftPerpMarkets,
    getAvailableDriftSpotMarkets,
    getLendingAndBorrowAPY,
    updateVault,
    withdrawFromDriftVault,
    withdrawFromDriftUserAccount,
    requestWithdrawalFromVault,
    updateVaultDelegate,
    getVaultInfo,
    getVaultAddress,
    tradeDriftVault,
    swapSpotToken,
    stakeToDriftInsuranceFund,
    requestUnstakeFromDriftInsuranceFund,
    unstakeFromDriftInsuranceFund,
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

    // Manifest actions
    withdrawAllAction,
    limitOrderAction,
    cancelAllOrdersAction,
    manifestCreateMarketAction,

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

    // Drift actions
    availableDriftMarketsAction,
    createDriftUserAccountAction,
    createVaultAction,
    depositIntoDriftVaultAction,
    depositToDriftUserAccountAction,
    deriveDriftVaultAddressAction,
    doesUserHaveDriftAcccountAction,
    driftUserAccountInfoAction,
    entryQuoteOfDriftPerpTradeAction,
    getDriftLendAndBorrowAPYAction,
    driftPerpMarketFundingRateAction,
    requestUnstakeFromDriftInsuranceFundAction,
  ],

  // Initialize function
  initialize: function (agent: SolanaAgentKit): void {
    // Initialize all methods with the agent instance
    Object.entries(this.methods).forEach(([methodName, method]) => {
      if (typeof method === "function") {
        this.methods[methodName] = method.bind(null, agent);
      }
    });

    // Any necessary initialization logic
    if (!agent.config.OPENAI_API_KEY) {
      console.warn("Warning: OPENAI_API_KEY not provided in config");
    }
  },
} satisfies Plugin;

// Default export for convenience
export = DefiPlugin;
