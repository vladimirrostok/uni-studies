import { FC } from "react";
import Link from "next/link";
import CollectionActivityData from "./data.json";
import Box from "../../containers/Box";
import Image from "next/image";
import EGLD from "../../Icons/EGLD";
import {
  BookmarkIcon,
  CakeIcon,
  ExclamationCircleIcon,
  HandIcon,
  ShoppingCartIcon,
  SwitchHorizontalIcon,
} from "@heroicons/react/solid";

const CollectionActivity: FC = ({}) => {
  const pageData = CollectionActivityData["data"]["attributes"];

  return (
    <Box className="my-10 flex-col bg-gray-900 shadow-md rounded-lg">
      <Box className="flex-row w-full font-bold p-5 items-center text-center text-xl hidden md:flex">
        <span className="flex-1"></span>
        <span className="flex-1 text-left">Item</span>
        <span className="flex-1">Price</span>
        <span className="flex-1">Quantity</span>
        <span className="flex-1">From</span>
        <span className="flex-1">To</span>
        <span className="flex-1">Time</span>
      </Box>
      <Link href="/nft" passHref>
        <Box className="flex-row w-full font-bold p-5 items-center hover:bg-gray-800 border-t border-black">
          <Box className="flex-1 flex-row">
            <BookmarkIcon className="h-6 w-6 mr-2" />
            List
          </Box>
          <span className="flex flex-1 items-center">
            <Box className="mr-2">
              <Image
                src={pageData.avatar}
                alt={pageData.name}
                width="50"
                height="50"
                className="object-contain rounded-lg"
              />
            </Box>
            Mr Ghost #589
          </span>
          <span className="flex-1">
            <Box className="flex-col items-end">
              <Box className="flex-row items-center font-bold">
                <EGLD className="h-4 w-4 mr-2" />
                {"0.0666"}
              </Box>
              <Box className="font-normal text-gray-400">$ 15.86</Box>
            </Box>
          </span>
          <span className="flex-1 text-center hidden md:block">1</span>
          <span className="flex-1 text-sky-500 text-center hidden md:block">
            @gokai
          </span>
          <span className="flex-1 text-sky-500 text-center hidden md:block">
            erd1kj...koagi
          </span>
          <span className="flex-1 text-gray-400 text-center">5m ago</span>
        </Box>
      </Link>
      <Link href="/nft" passHref>
        <Box className="flex-row w-full font-bold p-5 items-center hover:bg-gray-800 border-t border-black">
          <Box className="flex-1 flex-row">
            <CakeIcon className="h-6 w-6 mr-2" />
            Minted
          </Box>
          <span className="flex flex-1 items-center">
            <Box className="mr-2">
              <Image
                src={pageData.avatar}
                alt={pageData.name}
                width="50"
                height="50"
                className="object-contain rounded-lg"
              />
            </Box>
            Mr Ghost #056
          </span>
          <span className="flex-1">
            <Box className="flex-col items-end">
              <Box className="flex-row items-center font-bold">
                <EGLD className="h-4 w-4 mr-2" />
                {"0.0666"}
              </Box>
              <Box className="font-normal text-gray-400">$ 15.86</Box>
            </Box>
          </span>
          <span className="flex-1 text-center hidden md:block">1</span>
          <span className="flex-1 text-sky-500 text-center hidden md:block">
            @gokai
          </span>
          <span className="flex-1 text-sky-500 text-center hidden md:block">
            erd1kj...koagi
          </span>
          <span className="flex-1 text-gray-400 text-center">5m ago</span>
        </Box>
      </Link>
      <Link href="/nft" passHref>
        <Box className="flex-row w-full font-bold p-5 items-center hover:bg-gray-800 border-t border-black">
          <Box className="flex-1 flex-row">
            <SwitchHorizontalIcon className="h-6 w-6 mr-2" />
            Transfer
          </Box>
          <span className="flex flex-1 items-center">
            <Box className="mr-2">
              <Image
                src={pageData.avatar}
                alt={pageData.name}
                width="50"
                height="50"
                className="object-contain rounded-lg"
              />
            </Box>
            Mr Ghost #123
          </span>
          <span className="flex-1">
            <Box className="flex-col items-end">
              <Box className="flex-row items-center font-bold">
                <EGLD className="h-4 w-4 mr-2" />
                {"0.0666"}
              </Box>
              <Box className="font-normal text-gray-400">$ 15.86</Box>
            </Box>
          </span>
          <span className="flex-1 text-center hidden md:block">1</span>
          <span className="flex-1 text-sky-500 text-center hidden md:block">
            @gokai
          </span>
          <span className="flex-1 text-sky-500 text-center hidden md:block">
            erd1kj...koagi
          </span>
          <span className="flex-1 text-gray-400 text-center">5m ago</span>
        </Box>
      </Link>
      <Link href="/nft" passHref>
        <Box className="flex-row w-full font-bold p-5 items-center hover:bg-gray-800 border-t border-black">
          <Box className="flex-1 flex-row">
            <ShoppingCartIcon className="h-6 w-6 mr-2" />
            Sale
          </Box>
          <span className="flex flex-1 items-center">
            <Box className="mr-2">
              <Image
                src={pageData.avatar}
                alt={pageData.name}
                width="50"
                height="50"
                className="object-contain rounded-lg"
              />
            </Box>
            Mr Ghost #001
          </span>
          <span className="flex-1">
            <Box className="flex-col items-end">
              <Box className="flex-row items-center font-bold">
                <EGLD className="h-4 w-4 mr-2" />
                {"0.0666"}
              </Box>
              <Box className="font-normal text-gray-400">$ 15.86</Box>
            </Box>
          </span>
          <span className="flex-1 text-center hidden md:block">1</span>
          <span className="flex-1 text-sky-500 text-center hidden md:block">
            @gokai
          </span>
          <span className="flex-1 text-sky-500 text-center hidden md:block">
            erd1kj...koagi
          </span>
          <span className="flex-1 text-gray-400 text-center">5m ago</span>
        </Box>
      </Link>
      <Link href="/nft" passHref>
        <Box className="flex-row w-full font-bold p-5 items-center hover:bg-gray-800 border-t border-black">
          <Box className="flex-1 flex-row">
            <HandIcon className="h-6 w-6 mr-2" />
            Offer
          </Box>
          <span className="flex flex-1 items-center">
            <Box className="mr-2">
              <Image
                src={pageData.avatar}
                alt={pageData.name}
                width="50"
                height="50"
                className="object-contain rounded-lg"
              />
            </Box>
            Mr Ghost #001
          </span>
          <span className="flex-1">
            <Box className="flex-col items-end">
              <Box className="flex-row items-center font-bold">
                <EGLD className="h-4 w-4 mr-2" />
                {"0.0666"}
              </Box>
              <Box className="font-normal text-gray-400">$ 15.86</Box>
            </Box>
          </span>
          <span className="flex-1 text-center hidden md:block">1</span>
          <span className="flex-1 text-sky-500 text-center hidden md:block">
            @gokai
          </span>
          <span className="flex-1 text-sky-500 text-center hidden md:block">
            erd1kj...koagi
          </span>
          <span className="flex-1 text-gray-400 text-center">5m ago</span>
        </Box>
      </Link>
      <Link href="/nft" passHref>
        <Box className="flex-row w-full font-bold p-5 items-center hover:bg-gray-800 border-t border-black">
          <Box className="flex-1 flex-row">
            <ExclamationCircleIcon className="h-6 w-6 mr-2" />
            Cancel
          </Box>
          <span className="flex flex-1 items-center">
            <Box className="mr-2">
              <Image
                src={pageData.avatar}
                alt={pageData.name}
                width="50"
                height="50"
                className="object-contain rounded-lg"
              />
            </Box>
            Mr Ghost #001
          </span>
          <span className="flex-1">
            <Box className="flex-col items-end">
              <Box className="flex-row items-center font-bold">
                <EGLD className="h-4 w-4 mr-2" />
                {"0.0666"}
              </Box>
              <Box className="font-normal text-gray-400">$ 15.86</Box>
            </Box>
          </span>
          <span className="flex-1 text-center hidden md:block">1</span>
          <span className="flex-1 text-sky-500 text-center hidden md:block">
            @gokai
          </span>
          <span className="flex-1 text-sky-500 text-center hidden md:block">
            erd1kj...koagi
          </span>
          <span className="flex-1 text-gray-400 text-center">5m ago</span>
        </Box>
      </Link>
    </Box>
  );
};

export default CollectionActivity;
