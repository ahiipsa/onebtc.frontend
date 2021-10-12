import stores from '../../../../stores';
import { ListStoreConstructor } from '../../../../stores/core/ListStoreConstructor';
import { btcRelayClient } from '../../../../modules/btcRelay/btcRelayClient';

interface IVaultInfo {
  address: string;
  amount: string;
}
const cache: Record<string, ListStoreConstructor<IVaultInfo>> = {};

export const getVaultBalancesStore = vaultId => {
  if (cache[vaultId]) {
    return cache[vaultId];
  }

  const loadFn = () => {
    return btcRelayClient.loadVaultBalances(vaultId);
  };

  const vaultBalancesStore = new ListStoreConstructor<IVaultInfo>(
    stores,
    loadFn,
    {
      pollingInterval: 10000,
    },
  );

  cache[vaultId] = vaultBalancesStore;

  return vaultBalancesStore;
};
