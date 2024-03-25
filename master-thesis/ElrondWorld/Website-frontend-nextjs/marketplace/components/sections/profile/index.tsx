import { FC, useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import ProfileTop from "./Top";
import Box from "../../containers/Box";
import ProfileTabList from "./TabList";
import ProfileTabPanels from "./TabPanel";
import { getWalletService } from "../../../setup";
import { useRouter } from "next/router";
import { ProfileSocialProps } from "./Social";
import { NFTStoryProps } from "../nft/Story";

const backend_base_url = process.env.NEXT_PUBLIC_BACKEND_API_URL;
const elrond_api_base_url = process.env.NEXT_PUBLIC_ELROND_API_URL;
const elrond_mainnet_api_url = process.env.NEXT_PUBLIC_MAINNET_ELROND_API_URL;

const Profile: FC = ({}) => {
  const [isOwner, setOwner] = useState(false);

  const [wltAddress, setWltAddress] = useState(null);
  const router = useRouter();
  const { slug } = router.query;

  const [nftList, setNftList] = useState<NFTStoryProps[]>([]);
  const [isFetching, setIsFetching] = useState(true);

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

      if (isOwner) nftItem.owner = true;

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

    setIsFetching(false);
  }

  useEffect(() => {
    if (router.isReady) {
      if (slug == undefined) {
        let wlt = getWalletService();

        if (wlt.isLoggedIn() === true) {
          setWltAddress(wlt.getAddress());
          setOwner(true); // Mark user access his own profile and can manage NFT-s.
        } else {
          router.push("/wallet");
        }
        return;
      }

      if (slug != undefined && slug.toString() != "") {
        setWltAddress(slug.toString());
        fetchNFTData(slug.toString());
      }
    }
  }, [router.isReady]);

  const [WalletAddress, setWalletAddress] = useState("");
  const [Herotag, setHerotag] = useState("");

  const [Username, setUsername] = useState("Username");
  const [Banner, setBanner] = useState("");
  const [Image, setImage] = useState("");
  const [Bio, setBio] = useState("Bio");
  const [Website, setWebsite] = useState("website.com");
  const [Twitter, setTwitter] = useState("@TwitterUsername");
  const [Discord, setDiscord] = useState("Username#0000");
  const [Telegram, setTelegram] = useState("@TelegramUsername");
  const [Facebook, setFacebook] = useState("FacebookUsername");
  const [Instagram, setInstagram] = useState("InstagramUsername");
  const [CreatedAt, setCreatedAt] = useState("");

  // Wait till page loads and fetch address to include it into the call.
  // Otherwise will fail with wlt.GetAddress() not-logged error.
  useEffect(() => {
    const fetchData = async () => {
      let wlt = getWalletService();

      if (wlt.isLoggedIn() === true && slug == undefined) {
        setWltAddress(wlt.getAddress());
        fetchNFTData(wlt.getAddress());
      }

      if (wltAddress != "") {
        const url =
          backend_base_url + "/profile?profile_wallet_address=" + wltAddress;
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`Unable to get data from ${url}.`);
        }

        let fetched = await res.json();
        if (fetched.profile_wallet_address)
          setWalletAddress(fetched.profile_wallet_address);

        if (fetched.profile_name) setUsername(fetched.profile_name);
        if (fetched.profile_bio) setBio(fetched.profile_bio);
        if (fetched.profile_banner_file) setBanner(fetched.profile_banner_file);
        if (fetched.profile_image_file) setImage(fetched.profile_image_file);
        if (fetched.profile_website) setWebsite(fetched.profile_website);
        if (fetched.profile_twitter) setTwitter(fetched.profile_twitter);
        if (fetched.profile_discord) setDiscord(fetched.profile_discord);
        if (fetched.profile_telegram) setTelegram(fetched.profile_telegram);
        if (fetched.profile_facebook) setFacebook(fetched.profile_facebook);
        if (fetched.profile_instagram) setInstagram(fetched.profile_instagram);
        if (fetched.created_at) setCreatedAt(fetched.created_at);
      }
    };

    if (wltAddress) {
      fetchData();
    }
  }, [wltAddress]);

  useEffect(() => {
    const getWalletHerotag = async () => {
      if (WalletAddress != "") {
        const res = await fetch(
          elrond_mainnet_api_url + "/accounts/" + wltAddress
        );

        // TODO - how to handle global errors?
        if (!res.ok) {
          return console.error(await res.text());
        }

        if (res.status === 200) {
          const walletBalanceInfo = await res.json();
          console.log(walletBalanceInfo);

          // Ensure data exists in response.
          if (walletBalanceInfo.username) {
            let herotag = walletBalanceInfo.username;

            // Clearly check if herotag exists and not null.
            if (herotag != "") {
              setHerotag(herotag);
            }
          } else {
            // TODO - report bug as empty herotag still exists as key in json.
            setHerotag("");
          }

          setHerotag(walletBalanceInfo.username);
        }
      }
    };

    getWalletHerotag();
  }, [WalletAddress]);

  let _socialProps: ProfileSocialProps = {
    website: Website,
    twitter: Twitter,
    discord: Discord,
    telegram: Telegram,
    instagram: Instagram,
    facebook: Facebook,
  };

  return (
    <Box className="profile flex-col">
      <ProfileTop
        profileName={Username}
        profileImage={Image}
        profileBanner={Banner}
        herotag={Herotag}
        walletAddress={wltAddress}
        created_at={CreatedAt}
        socialProps={_socialProps}
      />
      <Box className="profile_nft_list flex-col items-start">
        <Tab.Group>
          <span className="font-headingsWide w-screen sm:w-full overflow-x-scroll -ml-2 lg:ml-0 px-2 lg:px-0">
            <ProfileTabList />
          </span>
          <ProfileTabPanels
            bio={Bio}
            nftItems={!isFetching ? nftList : null}
            owner={isOwner}
          />
        </Tab.Group>
      </Box>
    </Box>
  );
};

export default Profile;

function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}
