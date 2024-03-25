import {
  Address,
  IChainID,
  TokenPayment,
  Transaction,
  TransactionPayload,
} from "@elrondnetwork/erdjs/out";
import { ITransactionValue } from "@elrondnetwork/erdjs/out/interface";
import BigNumber from "bignumber.js";

const marketPlaceSaleSmartContractAddress =
  process.env.NEXT_PUBLIC_MARKETPLACE_SMART_CONTRACT_ADDRESS;

export interface IssueNFTData {
  address: string;
  chainID: IChainID;
  tokenName: string;
  tokenTicker: string;
  canFreeze: boolean;
  canWipe: boolean;
  canPause: boolean;
}

export const issueNft = (data: IssueNFTData) =>
  new Transaction({
    receiver: new Address(
      "erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzllls8a5w6u"
    ),
    value: TokenPayment.egldFromAmount(0.05),
    // prettier-ignore
    data: new TransactionPayload(
            "issueNonFungible" +
            "@" + stringToHex(data.tokenName) + // <token name in hexadecimal encoding>
            "@" + stringToHex(data.tokenTicker) + // <token ticker in hexadecimal encoding>
            "@" + stringToHex("canFreeze") + "@" + stringToHex(data.canFreeze.toString()) + // <"true" or "false" hexadecimal encoded>
            "@" + stringToHex("canPause") + "@" + stringToHex(data.canPause.toString()) + // <"true" or "false" hexadecimal encoded>
            "@" + stringToHex("canWipe") + "@" + stringToHex(data.canWipe.toString()) + // <"true" or "false" hexadecimal encoded>
            "@" + stringToHex("canChangeOwner") + "@" + stringToHex("true") // <"true" or "false" hexadecimal encoded>
        ),
    gasLimit: 100000000,
    chainID: data.chainID,
  });

export interface AssignRolesData {
  address: string;
  chainID: IChainID;
  tokenIdentifier: string;
  senderAddress: string;
}

export const assignRoles = (data: AssignRolesData) =>
  new Transaction({
    receiver: new Address(
      "erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzllls8a5w6u"
    ),
    value: TokenPayment.egldFromAmount(0),
    // prettier-ignore
    data: new TransactionPayload(
            "setSpecialRole" +
            "@" + stringToHex(data.tokenIdentifier) + // <token identifier in hexadecimal encoding>
            "@" + (new Address(data.senderAddress).hex()) + // <address to assign the role(s) in a hexadecimal encoding>
            "@" + "45534454526f6c654e4654437265617465" // <role in hexadecimal encoding> // ESDTRoleNFTCreate
        ),
    gasLimit: 100000000,
    chainID: "D",
  });

export interface CreateNFTData {
  senderAddress: string;
  chainID: IChainID;
  tokenIdentifier: string;
  nftName: string;
  royalties: number;
  uri: string;
  attributes?: string;
}

// TODO: royalties
export const createNFT = (data: CreateNFTData) =>
  new Transaction({
    receiver: new Address(data.senderAddress),
    value: TokenPayment.egldFromAmount(0),
    // prettier-ignore
    data: new TransactionPayload(
            "ESDTNFTCreate" +
            "@" + stringToHex(data.tokenIdentifier) + // <token identifier in hexadecimal encoding>
            "@" + "01" + // <initial quantity in hexadecimal encoding>
            "@" + stringToHex(data.nftName) + // <NFT name in hexadecimal encoding>
            "@" + data.royalties.toString(16).padStart(4, "0") + // <Royalties in hexadecimal encoding>
            "@" + "" + // <Hash in hexadecimal encoding> // Arbitrary field that should contain the hash of the NFT metadata // Optional filed, should be left null when building the transaction to create the NFT
            "@" + intToEven(stringToHex(data.attributes)) + // <Attributes in hexadecimal encoding>
            "@" + stringToHex(data.uri) // <URI in hexadecimal encoding>
        ),
    gasLimit: 6000000, // reduce, as errors: @too much gas provided: gas needed = 1790000 or (2)984000, gas remained = 98210000 or (2) 9016000
    chainID: "D",
  });

export interface listNftForSaleData {
  senderAddress: string;
  chainID: IChainID;
  tokenIdentifier: string;
  tokenNonce: string;
  collection: string;
  price: number;
}

export const listNftForSale = (data: listNftForSaleData) =>
  new Transaction({
    receiver: new Address(data.senderAddress),
    value: TokenPayment.egldFromAmount(0),
    // prettier-ignore
    data: new TransactionPayload(
            "ESDTNFTTransfer" +
            "@" + stringToHex(data.collection) + // <token identifier in hexadecimal encoding>
            "@" + data.tokenNonce.toString() + // <the nonce after the NFT creation in hexadecimal encoding> (ENCODED ALREADY)
            "@" + "01" +   // <quantity to transfer in hexadecimal encoding>
            "@" + new Address(marketPlaceSaleSmartContractAddress).hex() + // <destination address in hexadecimal encoding> (DECODED ALREADY)
            "@" + stringToHex("list_nft") + // <name of method to call in hexadecimal encoding>
            "@" + stringToHex(data.collection) + // <collection id>
            "@" + data.tokenNonce.toString() + // <the nonce after the NFT creation in hexadecimal encoding> (ENCODED ALREADY)
            "@" + intToEven(parseInt(TokenPayment.egldFromAmount(1).toString()).toString(16)) + // <selling_price>
            "@" + new Address(data.senderAddress).hex()
        ),
    gasLimit: 100000000, // reduce, as errors: @too much gas provided: gas needed = 1790000 or (2)984000, gas remained = 98210000 or (2) 9016000
    chainID: "D",
  });

export interface buyListedNFTData {
  chainID: IChainID;
  tokenNonce: string;
  collection: string;
}

export const buyListedForSaleNFT = (data: buyListedNFTData) =>
  new Transaction({
    receiver: new Address(marketPlaceSaleSmartContractAddress),
    value: TokenPayment.egldFromAmount(1),
    // prettier-ignore
    data: new TransactionPayload(
            "buy_nft" +
            "@" + stringToHex(data.collection) + // <collection id>
            // NFT nonce from Elrond API is just returned for (01) as 1, while SC mapped it as 01, must format it to valid encoding back
            "@" + intToEven(data.tokenNonce) // <the nonce after the NFT creation in hexadecimal encoding> (ENCODED ALREADY)
        ),
    gasLimit: 100000000, // reduce, as errors: @too much gas provided: gas needed = 1790000 or (2)984000, gas remained = 98210000 or (2) 9016000
    chainID: "D",
  });

export const stringToHex = (str: string) => {
  if (str) {
    const arr1 = [];
    for (let n = 0, l = str.length; n < l; n++) {
      const hex = Number(str.charCodeAt(n)).toString(16);
      arr1.push(hex);
    }
    return arr1.join("");
  }
  return "";
};

export const intToEven = (number) => {
  if (number.toString().length % 2 != 0) {
    // The number is not even, e.g. nonce is "1" while expected format is "01", and etc.
    // Add zero in front of unveven number to make it "2,4,6,8" even number of symbols.
    return "0" + number;
  }
  return number;
};

function padTrailingZeros(num, size) {
  var s = num + "";
  while (s.length < size) s = s + "0";
  return s;
}
