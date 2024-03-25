import { FC, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Box from "../../containers/Box";
import Article from "../../containers/Article";
import H3 from "../../fields/H3";
import NftCollection from "./Collection";
import EGLD from "../../Icons/EGLD";
import { buyListedForSaleNFT, listNftForSale } from "../../../lib/utils";
import { TransactionWatcher } from "@elrondnetwork/erdjs/out";
import { getWalletService } from "../../../setup";

export type NFTStoryProps = {
  owner?: boolean;
  listed_for_sale?: boolean;
  image: string;
  title: string;
  collection: string;
  nonce: string;
  identifier: string;
  mediaType: string;
};

const NftStory: FC<NFTStoryProps> = ({
  image,
  title,
  collection,
  identifier,
  nonce,
  owner,
  listed_for_sale,
  mediaType,
}) => {
  let [statusText, setStatusText] = useState("");
  let wlt = getWalletService();

  async function handleListSale(e) {
    const res = await listNftToken(e);
  }

  const listNftToken = (e) => {
    return new Promise(async (resolve, reject) => {
      setStatusText("Listing...");
      e.preventDefault();

      const tx = listNftForSale({
        chainID: "D",
        collection: collection,
        price: 1,
        senderAddress: wlt.getAddress(),
        tokenIdentifier: identifier,
        tokenNonce: nonce,
      });

      const signedTx = await wlt
        .signTransaction(tx)
        .then((e) => {
          setStatusText("Signing...");
          return e;
        })
        .catch((e) => {
          setStatusText("Transaction signing failed");
          console.log(
            "Transaction signing failed, #SHOW MODAL WITH ERROR#" + e
          );
          return null;
        });

      setStatusText("Executing...");
      await wlt
        .sendTransaction(signedTx)
        .catch((e) => {
          setStatusText("Failed : " + e);
        })
        .then((e) => {
          setStatusText("Confirming...");
        });

      setStatusText("Confirming...");
      const watcher = new TransactionWatcher(wlt.getNetworkProvider());
      const txOnNetwork = await watcher.awaitCompleted(signedTx);

      const contractErrorResults = txOnNetwork.contractResults.items.filter(
        (result) =>
          result.returnMessage &&
          !result.returnMessage.includes("too much gas provided")
      );

      if (contractErrorResults.length > 0) {
        setStatusText(contractErrorResults[0].returnMessage);
        alert("Failed to Create Collection!");
      } else {
        setStatusText("NFT Listed!");
      }

      console.log("Transaction Complete");
    });
  };

  async function handleBuyListedNFT(e) {
    const res = await buyListedNFT(e);
  }

  const buyListedNFT = (e) => {
    return new Promise(async (resolve, reject) => {
      setStatusText("Approve in Wallet");
      e.preventDefault();

      const tx = buyListedForSaleNFT({
        chainID: "D",
        collection: collection,
        tokenNonce: nonce,
      });

      const signedTx = await wlt
        .signTransaction(tx)
        .then((e) => {
          setStatusText("Signing...");
          return e;
        })
        .catch((e) => {
          setStatusText("Failed!");
          console.log(
            "Transaction signing failed, #SHOW MODAL WITH ERROR#" + e
          );
          return null;
        });

      setStatusText("Executing...");
      await wlt
        .sendTransaction(signedTx)
        .catch((e) => {
          setStatusText("Failed " + e);
        })
        .then((e) => {
          setStatusText("Confirming...");
        });

      setStatusText("Confirming...");
      const watcher = new TransactionWatcher(wlt.getNetworkProvider());
      const txOnNetwork = await watcher.awaitCompleted(signedTx);

      const contractErrorResults = txOnNetwork.contractResults.items.filter(
        (result) =>
          result.returnMessage &&
          !result.returnMessage.includes("too much gas provided")
      );

      if (contractErrorResults.length > 0) {
        setStatusText(contractErrorResults[0].returnMessage);
        alert("Failed to Create Collection!");
      } else {
        setStatusText("NFT bought!");
      }

      console.log("Transaction Complete");
    });
  };

  let content;
  if (mediaType.includes("image")) {
    content = (
      <Image
        unoptimized
        src={image}
        alt={title}
        width="1024"
        height="1024"
        className="object-contain hover:animate-pulse"
      />
    );
  } else if (mediaType.includes("video")) {
    content = (
      <video
        src={image}
        width="1024"
        height="1024"
        className="object-contain hover:animate-pulse"
        autoPlay
        loop
        muted
      />
    );
  }

  // SAVED AS A BACKUP OF PREVIOUS STATE
  // return (
  //   <Link href={"/nft-details/" + collection + "-" + nonce}>
  //     <a className="nft_story block mb-4 mx-2">
  //       <div className="hover:rounded-2xl hover:border-0.25 hover:shadow-lg hover:shadow-sky-500/50 hover:bg-gradient-to-r from-sky-400 to-fuchsia-500 overflow-hidden p-0.5">
  //         <Article className="flex-col bg-gray-900 shadow-md rounded-2xl overflow-hidden">
  //           <H3 className="mx-auto pt-5 text-xl">{title}</H3>
  //           {content}
  //           <Box className="flex-col mt-2 px-5">
  //             <Box className="flex-row mx-auto">
  //               <NftCollection title={collection + "-" + nonce} />
  //             </Box>
  //             <Box className="flex-row -mt-8 mx-auto">
  //               <p>{"Price"}</p>
  //               <Box className="flex-row items-center font-bold">
  //                 <EGLD className="h-5 w-5 mx-2" />
  //                 {"1.00"}
  //               </Box>
  //             </Box>
  //           </Box>
  //           <Box className="flex-row font-bold text-gray-400 px-3 h-6 mb-5">
  //             {getButton(
  //               owner,
  //               listed_for_sale,
  //               statusText,
  //               handleListSale,
  //               handleBuyListedNFT
  //             )}
  //             <HeartIcon className="h-6 w-6 mr-2 ml-auto" />
  //           </Box>
  //         </Article>
  //       </div>
  //     </a>
  //   </Link>
  // );

  return (
    <Link
      href={
        listed_for_sale === true
          ? "/nft-details/" + collection + "-" + nonce + "?listed=true"
          : "/nft-details/" + collection + "-" + nonce
      }
    >
      <a className="nft_story block mb-2 mx-1 max-h-290 max-w-200">
        <div className="hover:rounded-xl hover:border-0.25 hover:shadow-lg hover:shadow-sky-500/50 hover:bg-gradient-to-r from-sky-400 to-fuchsia-500 overflow-hidden p-0.5">
          <Article className="flex-col bg-gray-900 shadow-md rounded-xl overflow-hidden">
            <H3 className="mx-auto font-feature text-lg -mb-1 mt-2">{title}</H3>
            <Box className="flex-row mx-auto pb-1">
              <div>
                <NftCollection title={collection + "-" + nonce} />
              </div>
            </Box>
            <hr className="border-sky-900 border-opacity-75" />
            <div className="flex justify-between my-1 p-0">
              <h3 className="ml-1 text-xs font-sans font-bold text-cyan-400">
                Rank : 8654
              </h3>
              <h3 className="mr-1 text-xs font-sans font-bold text-green-500">
                + 300 %
              </h3>
            </div>
            <hr className="border-sky-900 border-opacity-75" />
            <div className="-mb-1">{content}</div>
            <hr className="border-fuchsia-500 border-opacity-75 my-0" />
            <Box className="flex-col mb-1">
              <Box className="flex-row justify-between mt-1">
                {/* <p className="flex justify-start">{"Price"}</p> */}

                <Box className="flex-row font-sans justify-start items-center mt-1">
                  <EGLD className="w-8 mx-3" />
                  {"1.00"}
                </Box>

                <Box className="flex-row h-9 mt-1">
                  {getButton(
                    owner,
                    listed_for_sale,
                    statusText,
                    handleListSale,
                    handleBuyListedNFT
                  )}
                  {/* <HeartIcon className="h-6 w-6 mr-2 ml-auto" /> */}
                </Box>
              </Box>
            </Box>
          </Article>
        </div>
      </a>
    </Link>
  );
};

function getButton(
  owner,
  listed_for_sale,
  statusText,
  handleListSale,
  handleBuyListedNFT
) {
  if (owner === true) {
    return (
      <button
        onClick={(e) => handleListSale(e)}
        className="btn bg-sky-500 rounded-md px-2 mx-2 hover:text-white hover:bg-sky-800 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-0"
      >
        <span className="group-hover:bg-opacity-0">
          {statusText == "" ? "List for sale" : statusText}
        </span>
      </button>
    );
  } else if (listed_for_sale === true) {
    return (
      <button
        onClick={(e) => handleBuyListedNFT(e)}
        className="btn bg-sky-500 rounded-md px-2 mx-2 hover:text-white hover:bg-sky-800 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-0"
      >
        <span className="group-hover:bg-opacity-0 ">
          {statusText == "" ? "Buy" : statusText}
        </span>
      </button>
    );
  } else {
    return <span className="group-hover:bg-opacity-0">{"Not for sale"}</span>;
  }
}

export default NftStory;
