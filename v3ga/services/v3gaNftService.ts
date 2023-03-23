import Web3 from 'web3';
import { resolveWalletAddress } from './walletResolver';

const jsonInterface = require('./v3ga-contract.abi.js');

export type ChainName =
  | 'mainnet'
  | 'ropsten'
  | 'rinkeby'
  | 'goerli'
  | 'sepolia'
  | 'kovan'
  | 'localhost';

export interface BlockchainInfo {
  chainId: number;
  gateway: string;
  etherscanHost: string;
  info?: {
    contractOwner: string;
    contractAddress: string;
    contractAbiPath: string;
  };
}

export interface SupportedBlockchains {
  mainnet: BlockchainInfo;
  ropsten?: BlockchainInfo;
  rinkeby?: BlockchainInfo;
  goerli?: BlockchainInfo;
  sepolia?: BlockchainInfo;
  kovan?: BlockchainInfo;
  localhost?: BlockchainInfo;
}

export interface IV3gaContractService {
  get contractAddress(): string;

  get contract(): any;

  get etherscanHost(): string;

  totalSupply(invokerAddressOrEns: string): Promise<number>;
}

const SUPPORTED_BLOCKCHAINS: SupportedBlockchains = {
  mainnet: {
    chainId: 1,
    gateway: `https://mainnet.infura.io/v3/c41a1513f1374b19a629924da756bb58`,
    etherscanHost: 'https://etherscan.io',
    info: {
      contractOwner: '',
      contractAddress: '',
      contractAbiPath: '../abis/v3gaNft.abi.json',
    },
  },
  goerli: {
    chainId: 5,
    gateway: `https://goerli.infura.io/v3/c41a1513f1374b19a629924da756bb58`,
    etherscanHost: 'https://goerli.etherscan.io',
    info: {
      contractOwner: '0x4B9DAc484cc74549062f7eF318a1127D7A746792',
      contractAddress: '0xfcfCe1266fFbcCCeFc21b382343CB652F6FA0b83',
      contractAbiPath: '../abis/v3gaNft.abi.json',
    },
  },
};

export class v3gaNftService implements IV3gaContractService {
  public get contractAddress(): string {
    return this._contractAddress;
  }
  public get contract(): any {
    return this._contract;
  }
  public get etherscanHost(): any {
    return SUPPORTED_BLOCKCHAINS[this.chainName]?.etherscanHost;
  }

  protected web3Client!: Web3;
  private _contract: any;
  private _contractAddress!: string;

  constructor(public chainName: ChainName) {
    this.initialize(chainName);
  }

  private initialize(chainName: ChainName) {
    if (!SUPPORTED_BLOCKCHAINS) {
      throw new Error(
        'Sorry, a list of supported blockchain must be specified.'
      );
    }
    if (!chainName) {
      throw new Error('Sorry, a blockchain must be specified.');
    }
    if (
      !SUPPORTED_BLOCKCHAINS[chainName] ||
      !SUPPORTED_BLOCKCHAINS[chainName]?.gateway
    ) {
      throw new Error(`Sorry, ${chainName} blockchain not recognized.`);
    }
    this._contractAddress = SUPPORTED_BLOCKCHAINS[chainName]?.info
      ?.contractAddress as string;
    if (!this._contractAddress) {
      throw new Error(
        `Sorry, this NFT smart contract does not exist on the ${chainName} blockchain.`
      );
    }

    const provider = new Web3.providers.HttpProvider(
      SUPPORTED_BLOCKCHAINS[chainName]?.gateway as string,
      {
        timeout: 30000, // ms
      }
    );
    this.web3Client = new Web3(provider);

    this._contract = new this.web3Client.eth.Contract(
      jsonInterface,
      this._contractAddress
    );
  }

  public async totalSupply(invokerAddressOrEns: string): Promise<number> {
    if (!invokerAddressOrEns) {
      return 0;
    }
    const invoker = await resolveWalletAddress(
      this.web3Client,
      invokerAddressOrEns
    );

    const response: number = await this.contract.methods
      .totalSupply()
      .call({ from: invoker });

    return response;
  }
}
