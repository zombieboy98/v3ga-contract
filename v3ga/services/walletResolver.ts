import Web3 from 'web3';

export function looksLikeEns(address: string) {
  // This is not standard compliant, but is what is most common in practice
  if (address.match(/^[a-zA-Z0-9]+\.eth$/)) {
    return true;
  }

  return false;
}

// Given a hex wallet address or ENS string,
// Return a hex wallet address
export async function resolveWalletAddress(web3: Web3, address: string) {
  let resolvedAddress: string;
  if (looksLikeEns(address)) {
    resolvedAddress = await web3.eth.ens.getAddress(address);
    resolvedAddress = resolvedAddress && resolvedAddress.toLowerCase();
  } else {
    resolvedAddress = address;
  }
  return resolvedAddress;
}
