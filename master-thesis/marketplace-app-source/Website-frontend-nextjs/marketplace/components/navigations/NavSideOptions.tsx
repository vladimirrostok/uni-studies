import React, { FC } from "react";
import NextLink from "next/link";
import NavSideCollapsibleOption from "./NavSideCollapsibleOption";
import NavSideCollapsibleOptionProfile from "./NavSideCollapsibleOptionProfile";
import Create from "../Icons/nav-side-options/create";
import Sectors from "../Icons/nav-side-options/sectors";
import Games from "../Icons/nav-side-options/games";
import Chat from "../Icons/nav-side-options/chat";
import News from "../Icons/nav-side-options/news";
import Stats from "../Icons/nav-side-options/stats";
import Box from "../containers/Box";
import FormSearch from "../forms/FormSearch";

const NavSideOptions: FC = ({}) => {
  return (
    <Box className="rounded scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-800 scrollbar-track-black overflow-y-scroll max-h-[calc(100vh_-_80px)]">
      <div className="flex justify-center w-full min-h-screen">
        <div className="w-full">
          <div className="px-6 pt-0 lg:hidden">
            <NavSideCollapsibleOptionProfile
              profilename={"Elrond World"}
              walletaddress={"erd1ffn92...8gs6fr8an"}
              htagpic={
                <div className="relative w-10 h-10 rounded-full before:absolute before:w-2 before:h-2 before:bg-green-500 before:rounded-full before:right-0 before:bottom-0 before:ring-1 before:ring-white">
                  <img
                    className="rounded-full"
                    src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
                    alt=""
                  />
                </div>
              }
              items={[
                { name: "View Profile", link: "/profile" },
                { name: "My Watchlist", link: "/drops" },
                { name: "Wallet Balances", link: "/wallet" },
                {
                  name: "Profile Settings",
                  link: "/profile-settings",
                },
              ]}
            ></NavSideCollapsibleOptionProfile>
          </div>
          <div className="px-5 pt-2 lg:hidden">
            <hr className="border-sky-500" />
          </div>
          <div className="px-6 pt-4 text-sm hover:animate-pulse lg:hidden">
            <FormSearch />
          </div>
          <div className="px-6 pt-4">
            <ul className="flex flex-col space-y-2">
              <li className="">
                <NavSideCollapsibleOption
                  name={"Explore Collections"}
                  icon={<Create className="w-5 h-5 stroke-current" />}
                  items={[
                    { name: "NFTs Listed for Sale", link: "/explore/nft-listed" },
                    { name: "Trending Collections", link: "/explore" },
                    { name: "Top Perfomaning", link: "/explore" },
                    { name: "Music Collections", link: "/explore" },
                    { name: "Art Collections", link: "/explore" },
                    { name: "Virtual Worlds", link: "/explore" },
                    { name: "Trading Cards", link: "/explore" },
                    { name: "Utility Items", link: "/explore" },
                    { name: "Collectibles", link: "/explore" },
                    { name: "P2E Assets", link: "/explore" },
                  ]}
                ></NavSideCollapsibleOption>
              </li>
              <li className="relative text-gray-400 hover:text-white focus-within:text-white">
                <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                  <News className="w-5 h-5 stroke-current" />
                </div>
                <NextLink href="/blog">
                  <a className="inline-block w-full py-2 pl-8 pr-4 text-base rounded hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800">
                    MetaScrow Swaps
                  </a>
                </NextLink>
              </li>
              <li className="relative text-gray-400 hover:text-white focus-within:text-white">
                <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                  <Sectors className="w-5 h-5 stroke-current" />
                </div>
                <NextLink href="/">
                  <a className="inline-block w-full py-2 pl-8 pr-4 text-base rounded hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800">
                    MetaBids Auction
                  </a>
                </NextLink>
              </li>
              <li className="relative text-gray-400 hover:text-white focus-within:text-white">
                <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                  <Sectors className="w-5 h-5 stroke-current" />
                </div>
                <NextLink href="/launchpad">
                  <a className="inline-block w-full py-2 pl-8 pr-4 text-base rounded hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800">
                    MetaLaunch Pad
                  </a>
                </NextLink>
              </li>
              <li className="relative text-gray-400 hover:text-white focus-within:text-white">
                <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                  <Games className="w-5 h-5 stroke-current" />
                </div>
                <NextLink href="/">
                  <a className="inline-block w-full py-2 pl-8 pr-4 text-base rounded hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800">
                    MetaGame Zone
                  </a>
                </NextLink>
              </li>
              <li className="relative text-gray-400 hover:text-white focus-within:text-white">
                <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                  <News className="w-5 h-5 stroke-current" />
                </div>
                <NextLink href="/blog">
                  <a className="inline-block w-full py-2 pl-8 pr-4 text-base rounded hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800">
                    MetaMex News
                  </a>
                </NextLink>
              </li>      
              <li className="relative text-gray-400 hover:text-white focus-within:text-white">
                <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                  <Sectors className="w-5 h-5 stroke-current" />
                </div>
                <NextLink href="/launchpad">
                  <a className="inline-block w-full py-2 pl-8 pr-4 text-base rounded hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800">
                    MetaMerch Store
                  </a>
                </NextLink>
              </li>     
              <li className="relative text-gray-400 hover:text-white focus-within:text-white">
                <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                  <Chat className="w-5 h-5 stroke-current" />
                </div>
                <NextLink href="/">
                  <a className="inline-block w-full py-2 pl-8 pr-4 text-base rounded hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800">
                    MetaChill Lounge
                  </a>
                </NextLink>
              </li>
              <li className="relative text-gray-400 hover:text-white focus-within:text-white">
                <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                  <Sectors className="w-5 h-5 stroke-current" />
                </div>
                <NextLink href="/explore/nft-listed">
                  <a className="inline-block w-full py-2 pl-8 pr-4 text-base rounded hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800">
                  MetaMex Marketplace
                  </a>
                </NextLink>
              </li>
            </ul>
          </div>
          <div className="px-5 pt-2">
            <hr className="border-sky-500" />
          </div>

          <div className="px-6 pt-4">
            <ul>
              <li className="">
                <NavSideCollapsibleOption
                  name={"Create Your Assets"}
                  icon={<Create className="w-5 h-5 stroke-current" />}
                  items={[
                    { name: "Create NFTs / SFTs", link: "/createnfts" },
                    { name: "Create ESDT Tokens", link: "/createnfts" },
                    { name: "Create Collections", link: "/createcollection" },
                    {
                      name: "Activate Collections",
                      link: "/activatecollection",
                    },
                  ]}
                ></NavSideCollapsibleOption>
              </li>

              <li className="">
                <NavSideCollapsibleOption
                  name={"List on Marketplace"}
                  icon={<Create className="w-5 h-5 stroke-current" />}
                  items={[
                    { name: "Apply for Listing", link: "/#" },
                    {
                      name: "Apply for Launchpad",
                      link: "/#",
                    },
                    { name: "Apply for Auctions", link: "/#" },
                  ]}
                ></NavSideCollapsibleOption>
              </li>
            </ul>
          </div>

          <div className="px-5 pt-2">
            <hr className="border-sky-500" />
          </div>

          <div className="px-6 pt-4">
            <ul>
            <li className="relative text-gray-400 hover:text-white focus-within:text-white">
                <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                  <Sectors className="w-5 h-5 stroke-current" />
                </div>
                <NextLink href="/">
                  <a className="inline-block w-full py-2 pl-8 pr-4 text-base rounded hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800">
                    Partner Services
                  </a>
                </NextLink>
              </li>
              <li className="relative text-gray-400 hover:text-white focus-within:text-white">
                <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                  <Stats className="w-5 h-5 stroke-current" />
                </div>
                <NextLink href="#">
                  <a className="inline-block w-full py-2 pl-8 pr-4 text-base rounded hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800">
                    Marketplace Stats
                  </a>
                </NextLink>
              </li>
              <li className="relative text-gray-400 hover:text-white focus-within:text-white">
                <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                  <Stats className="w-5 h-5 stroke-current" />
                </div>
                <NextLink href="#">
                  <a className="inline-block w-full py-2 pl-8 pr-4 text-base rounded hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800">
                    Elrond World DAO
                  </a>
                </NextLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default NavSideOptions;
