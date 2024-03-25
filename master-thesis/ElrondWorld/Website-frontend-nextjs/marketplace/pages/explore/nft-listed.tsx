import { FC, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Box from "../../components/containers/Box";
import H1 from "../../components/fields/H1";
import { NFTStoryProps } from "../../components/sections/nft/Story";
import { Tab } from "@headlessui/react";
import ProfileTabList from "../../components/sections/profile/TabList";
import ProfileTabPanels from "../../components/sections/profile/TabPanel";

const elrond_api_base_url = process.env.NEXT_PUBLIC_ELROND_API_URL;
const marketPlaceSaleSmartContractAddress =
  process.env.NEXT_PUBLIC_MARKETPLACE_SMART_CONTRACT_ADDRESS;

const AllNftPage: FC = () => {
  const [nftList, setNftList] = useState<NFTStoryProps[]>([]);

  useEffect(() => {
    fetchNFTData(marketPlaceSaleSmartContractAddress);
  }, []);

  // Fetch NFTs for wallet from API.
  async function fetchNFTData(addr: string) {
    const url =
      elrond_api_base_url + "/accounts/" + addr + "/nfts?hasUris=true";

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Unable to get data from ${url}.`);
    }

    let fetchedNFTs = await res.json();

    var arrayLength = fetchedNFTs.length;
    for (var i = 0; i < arrayLength; i++) {
      let url: string = fetchedNFTs[i].url;
      let name: string = fetchedNFTs[i].name;
      let identifier: string = fetchedNFTs[i].identifier;
      let collection: string = fetchedNFTs[i].collection;
      let nonce: string = fetchedNFTs[i].nonce;
      let mediaType: string = fetchedNFTs[i].media[0].fileType;

      if (nonce.toString().length % 2 != 0) {
        // The number is not even, e.g. nonce is "1" while expected format is "01", and etc.
        // Add zero in front of unveven number to make it "2,4,6,8" even number of symbols.
        nonce = "0" + nonce;
      }

      let nftItem: NFTStoryProps = {
        nonce: nonce,
        image: "",
        title: name,
        collection: collection,
        identifier: identifier,
        mediaType: mediaType,
      };

      nftItem.listed_for_sale = true;

      // nftItem.title = name;
      // nftItem.identifier = identifier;
      // nftItem.collection = collection.substring(0, collection.length - 7);

      if (url != "" && isValidHttpUrl(url)) {
        let encodedURL = url;
        nftItem.image = encodedURL;

        setNftList((nftList) => [...nftList, nftItem]);
      }

      if (url != "" && !isValidHttpUrl(url)) {
        // TODO: handle broken format url-s.
        let encodedURL = url;
        nftItem.image = encodedURL;

        setNftList((nftList) => [...nftList, nftItem]);
      }
    }
  }

  return (
    <Layout title="NFT Market | MetaMex">
      <Box className="flex-col w-full py-2 px-2 sm:p-10">
        <H1 className="mx-auto font-feature lg:text-4xl lg:leading-10 lg:pb-5">
          {nftList.length + " Listings"}
        </H1>
        <Tab.Group>
          <span className="w-screen sm:w-full overflow-x-scroll -ml-2 lg:ml-0 px-2 lg:px-0">
            <ProfileTabList />
          </span>
          <ProfileTabPanels bio={null} nftItems={nftList} />
        </Tab.Group>
      </Box>
    </Layout>
  );
};

function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

export default AllNftPage;
