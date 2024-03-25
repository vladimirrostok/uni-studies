import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import CollectionAvatarData from "./data.json";

const CollectionAvatar: FC = ({}) => {
  const pageData = CollectionAvatarData["data"]["attributes"];

  return (
    <Link href="/collection" passHref>
      <Image
        src={pageData.avatar}
        alt={pageData.name}
        width="120"
        height="120"
        className="collection_avatar border-black rounded-full overflow-hidden w-full h-auto"
      />
    </Link>
  );
};

export default CollectionAvatar;
