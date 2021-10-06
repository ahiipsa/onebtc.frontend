import { IVault } from './btcRelayTypes';

const COLLATERAL_RATIO = 1.5;
export function getVaultInfo(vault: IVault) {
  const oneAmount = Number(vault.collateral) / 1e18;
  const amountSat = (oneAmount * 1e8) / COLLATERAL_RATIO; // TODO: 1 ONE !== 1 BTC
  const toBeIssuedSat = Number(vault.toBeIssued);
  const toBeRedeemedSat = Number(vault.toBeRedeemed);
  const tobeReplacedSat = Number(vault.toBeReplaced);
  const issuedSat = Number(vault.issued);
  const collateralRedeemed = amountSat / (toBeRedeemedSat / 100);
  const collateralIssued = amountSat / (toBeIssuedSat / 100);
  const collateralTotal = amountSat / ((toBeIssuedSat + toBeRedeemedSat) / 100);

  const availableAmountSat = amountSat - toBeRedeemedSat - toBeIssuedSat;
  const availableToRedeem = issuedSat - toBeRedeemedSat - tobeReplacedSat;
  return {
    oneAmount,
    availableAmountSat,
    availableToRedeem,
    toBeIssuedSat,
    toBeRedeemedSat,
    collateralRedeemed,
    collateralIssued,
    collateralTotal,
  };
}