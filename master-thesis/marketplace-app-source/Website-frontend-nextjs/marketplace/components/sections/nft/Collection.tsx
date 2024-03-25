import { FC } from "react";
import { BadgeCheckIcon } from "@heroicons/react/solid";
import Box from "../../containers/Box";
import Link from "next/link";

export type CollectionProps = {
  title: string;
};

const NftCollection: FC<CollectionProps> = ({ title }) => {
  return (
    <Box className="">
      <span className="flex flex-row items-center justify-start">
        <Link href="/collection">
          <a className="text-slate-200 text-xs hover:text-sky-400 font-sans">{title}</a>
        </Link>
        <BadgeCheckIcon className="ml-2 h-5 w-4 text-sky-400" />
      </span>
    </Box>
  );
};

export default NftCollection;
