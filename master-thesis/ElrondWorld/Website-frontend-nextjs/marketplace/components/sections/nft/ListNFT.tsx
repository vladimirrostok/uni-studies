import { FC, useState } from "react";
import Box from "../../containers/Box";
import { Dialog } from "@headlessui/react";
import FieldLabel from "../../fields/Label";
import FieldInput from "../../fields/Input";

const ListNFT: FC = ({}) => {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <Box>
      <button className="btn btn_outline group" onClick={() => setIsOpen(true)}>
        <span className="group-hover:bg-opacity-0">{"List NFT"}</span>
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="flex overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center md:inset-0 h-modal sm:h-full"
      >
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
        <Box className="relative items-center w-full max-w-md h-full md:h-auto flex-col bg-gray-900 shadow-md rounded-lg p-5 text-white">
          <Dialog.Title className="text-2xl font-bold my-5">
            {"Make an offer"}
          </Dialog.Title>
          <Dialog.Description className="mb-4 text-center text-xl text-gray-400">
            {"You are about to make an offer for Mr Ghost #001 by Gokai Labs"}
          </Dialog.Description>
          <span className="text-lg font-bold">
            {"You must offer at least 0.0670 EGLD"}
          </span>
          <span className="text-lg font-bold">
            {"Your balance is 3.8765 EGLD"}
          </span>
          <Box className="flex-col my-5">
            <FieldLabel className="hidden" htmlFor="offer">
              {"Offer"}
            </FieldLabel>
            <FieldInput
              id="offer"
              type="text"
              name="Offer"
              placeholder="Offer"
            ></FieldInput>
          </Box>
          <Box className="justify-center">
            <button
              onClick={() => setIsOpen(false)}
              className="btn btn_solid group mr-5"
            >
              <span className="group-hover:bg-opacity-0">{"Submit offer"}</span>
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="btn btn_cancel group"
            >
              <span className="group-hover:bg-opacity-0">{"Cancel"}</span>
            </button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default ListNFT;
