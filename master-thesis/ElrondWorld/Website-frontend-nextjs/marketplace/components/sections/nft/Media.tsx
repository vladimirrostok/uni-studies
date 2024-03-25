import { FC, useState } from "react";
import Image from "next/image";
import Box from "../../containers/Box";
import { Dialog } from "@headlessui/react";

export interface NftMediaProps {
  image: string;
  name: string;
}

const NftMedia: FC<NftMediaProps> = ({ image, name }) => {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <Box className="mx-auto">
      <Image
        unoptimized
        src={image}
        alt={name}
        width="590"
        height="590"
        className="object-contain lg:cursor-pointer"
        onClick={() => setIsOpen(true)}
      />
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="hidden lg:flex overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center md:inset-0 h-modal sm:h-full"
      >
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
        <Box className="relative items-center w-full max-w-4xl h-screen md:h-auto flex-col bg-gray-900 shadow-md rounded-lg p-5 text-white">
          <Image
            unoptimized
            src={image}
            alt={name}
            width="2048"
            height="2048"
            className="object-contain"
          />
        </Box>
      </Dialog>
    </Box>
  );
};

export default NftMedia;
