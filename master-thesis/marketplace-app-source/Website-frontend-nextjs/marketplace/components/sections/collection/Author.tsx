import { FC } from "react";
import { BadgeCheckIcon } from "@heroicons/react/solid";
import Link from "next/link";
import CollectionAuthorData from "./data.json";

export interface CollectionAuthorProps {
  author: string;
}

const CollectionAuthor: FC<CollectionAuthorProps> = ({ author }) => {
  return (
    <span className="collection_author flex flex-row items-center">
      <p className="text-gray-400">By</p>
      <Link href="/profile">
        <a className="mx-1 text-sky-400 hover:text-sky-500 font-bold">
          {author}
        </a>
      </Link>
      <BadgeCheckIcon className="h-6 w-6 text-sky-500" />
    </span>
  );
};

export default CollectionAuthor;
