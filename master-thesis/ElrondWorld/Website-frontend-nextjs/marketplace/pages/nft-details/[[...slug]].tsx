import { FC, useEffect, useState } from "react";
import FullWidth from "../../components/containers/FullWidth";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import * as React from "react";
import Section from "../../components/containers/Section";
import NftTop from "../../components/sections/nft/Top";
import H2 from "../../components/fields/H2";
import Box from "../../components/containers/Box";
import Hyperlink from "../../components/fields/Hyperlink";
import { NftPriceProps } from "../../components/sections/nft/Price";
import { NftHeadlineProps } from "../../components/sections/nft/Headline";
import { intToEven, stringToHex } from "../../lib/utils";
import { NftMediaProps } from "../../components/sections/nft/Media";

const elrond_api_url = process.env.NEXT_PUBLIC_ELROND_API_URL;
const marketPlaceSaleSmartContractAddress =
  process.env.NEXT_PUBLIC_MARKETPLACE_SMART_CONTRACT_ADDRESS;

const NftDetailsPage: FC = () => {
  const [stateLoading, setStateLoading] = useState(true);
  const [NFT, setNFT] = useState(null);
  const [listingData, setListingData] = useState(null);

  const router = useRouter();
  const { listed, slug } = router.query;

  useEffect(() => {
    fetchNFTDetails();
  }, [slug]);

  async function fetchNFTDetails() {
    if (slug != undefined && listed === "true") {
      // Handle Elrond API response
      const nftResponse = await fetch(`${elrond_api_url}/nfts/${slug}`);

      if (!nftResponse.ok) {
        console.error(nftResponse.statusText);
        throw new Error(`An error occured please try again`);
      }

      const nftData = await nftResponse.json();

      setNFT(nftData);
      console.log(nftData);

      // Handle Marketplace SC response
      let token = stringToHex(nftData.collection);
      let nonce = intToEven(nftData.nonce);

      const listingResponse = await fetch(`${elrond_api_url}/vm-values/query`, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          scAddress: marketPlaceSaleSmartContractAddress,
          funcName: "get_listing",
          args: [token, nonce],
        }),
      });

      if (!listingResponse.ok) {
        console.error(listingResponse.statusText);
        throw new Error(`An error occured please try again`);
      }

      const listingData = await listingResponse.json();

      let priceEncoded = listingData.data.data.returnData[3];

      // Base 64 > HEX > decimal (price)
      let buff = new Buffer(priceEncoded, "base64");
      let hexPrice = buff.toString("hex");
      let decodedPrice = (parseInt(hexPrice, 16) / 1000000000000000000).toFixed(
        2
      );

      setListingData({ amount: decodedPrice });

      // Mark as loaded.
      setStateLoading(false);
    } else {
      // Mark as loaded as NO SLUG is specified in browser, so skip it, remove price.
      // HOTFIX to load page from profile page for non-listed NFT.

      // Handle Elrond API response
      const nftResponse = await fetch(`${elrond_api_url}/nfts/${slug}`);

      if (!nftResponse.ok) {
        console.error(nftResponse.statusText);
        throw new Error(`An error occured please try again`);
      }

      const nftData = await nftResponse.json();
      setNFT(nftData);

      setListingData({ amount: null });
      setStateLoading(false);
    }
  }

  return stateLoading || NFT === null || listingData === null ? (
    <p>Loading...</p>
  ) : (
    <Layout title="NFT Details | MetaMex">
      <FullWidth>
        <Section className="nft flex-col lg:py-0">
          <NftTop
            NftPricePropsValues={
              {
                amount: listingData.amount,
                amountInUSD: 13.13,
                saleEnds: "Sale ends July 5, 2022 at 1:14am +07",
              } as NftPriceProps
            }
            NftHeadlinePropsValues={
              {
                favorites: "13 favorites",
                name: NFT.name,
                views: "123 views",
              } as NftHeadlineProps
            }
            NftMediaPropsValues={
              {
                image: NFT.media[0].url,
                name: "Mr Ghost #001",
              } as NftMediaProps
            }
          />
          <H2 className="font-feature text-3xl mt-10 mx-auto text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-fuchsia-500">
            {"More From This Collection"}
          </H2>
          <Box className="px-2 -mx-2 -mt-10 flex-col">
            <Hyperlink href="/collection" className="btn_solid mx-auto">
              {"View Collection"}
            </Hyperlink>
          </Box>
        </Section>
      </FullWidth>
    </Layout>
  );
};

export default NftDetailsPage;
