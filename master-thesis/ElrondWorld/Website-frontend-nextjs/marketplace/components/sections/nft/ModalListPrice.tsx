import { FC, useState } from "react";
import Box from "../../containers/Box";
import { Dialog } from "@headlessui/react";
import FieldLabel from "../../fields/Label";
import FieldInput from "../../fields/Input";

const NftModalListPrice: FC = ({}) => {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <Box>
      <button
        className="btn btn_outline group py-1 px-1 "
        onClick={() => setIsOpen(true)}
      >
        <span className="group-hover:bg-opacity-0">{"Set Sale Price"}</span>
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="flex overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center md:inset-0 h-modal sm:h-full"
      >
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
        <Box className="relative items-center w-full max-w-md h-full md:h-auto flex-col bg-gray-900 shadow-md rounded-lg p-5 text-white">
          <Dialog.Title className="text-2xl font-bold my-5 text-sky-500">
            {"What is your selling price?"}
          </Dialog.Title>
          <Dialog.Description className="mb-4 text-center text-xl">
            {
              "Specify the price you would like to set for the sale of this NFT on the marketplace."
            }
          </Dialog.Description>
          <span className="text-md">
            {"Consider Royalties and 3% Marketplace Fee"}
          </span>
          <span className="text-md ">
            {"You originally paid 0.75 $EGLD for this NFT"}
          </span>
          <Box className="flex-col my-5">
            <FieldLabel className="hidden" htmlFor="price">
              {"Price"}
            </FieldLabel>
            <FieldInput
              id="price"
              type="text"
              name="Price"
              placeholder="Set Price"
            ></FieldInput>
          </Box>
          <Box className="justify-center">
            <button
              onClick={() => setIsOpen(false)}
              className="btn btn_solid group mr-5"
            >
              <span className="group-hover:bg-opacity-0">{"Submit Price"}</span>
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

export default NftModalListPrice;
