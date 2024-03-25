import { FC, useState } from "react";
import Box from "../../containers/Box";
import CollectionModalFiltersData from "./data.json";
import { Dialog } from "@headlessui/react";
import { AdjustmentsIcon } from "@heroicons/react/outline";
import FieldLabel from "../../fields/Label";

const CollectionModalFilters: FC = ({}) => {
  const pageData = CollectionModalFiltersData["data"]["attributes"];

  let [isOpen, setIsOpen] = useState(false);

  return (
    <Box>
      <button onClick={() => setIsOpen(true)}>
        <AdjustmentsIcon className="h-20 w-20 px-6 text-sky-400 hover:text-sky-500" />
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="flex text-gray-200 overflow-y-auto h-screen overflow-x-hidden fixed right-0 left-0 top-0 z-50 justify-center items-center md:inset-0 h-modal sm:h-full"
      >
        <Dialog.Overlay className="fixed inset-0 bg-transparent bg-opacity-0" />
        <Box className="relative md:w-8/12 lg:w-6/12 mx-auto flex-col bg-gray-900 shadow-md rounded-lg py-10">
          <Box className="flex-wrap">
            <Box className="flex-col w-full md:w-3/6 mb-5 px-5">
              <FieldLabel htmlFor="name">{"Background"}</FieldLabel>
              <select
                name="Background"
                id="collection-select"
                className="inline-flex bg-gray-700 items-center p-4 rounded-full font-bold transition shadow-md border-2 border-sky-500"
              >
                <option value="">{"Background"}</option>
                <option value="001">{"001"}</option>
                <option value="002">{"002"}</option>
                <option value="001">{"003"}</option>
                <option value="002">{"004"}</option>
                <option value="001">{"005"}</option>
                <option value="002">{"006"}</option>
                <option value="001">{"007"}</option>
                <option value="002">{"008"}</option>
              </select>
            </Box>
            <Box className="flex-col w-full md:w-3/6 mb-5 px-5">
              <FieldLabel htmlFor="name">{"Body"}</FieldLabel>
              <select
                name="Body"
                id="collection-select"
                className="inline-flex bg-gray-700 items-center p-4 rounded-full font-bold transition shadow-md border-2 border-sky-500"
              >
                <option value="">{"Body"}</option>
                <option value="001">{"001"}</option>
                <option value="002">{"002"}</option>
                <option value="001">{"003"}</option>
                <option value="002">{"004"}</option>
                <option value="001">{"005"}</option>
                <option value="002">{"006"}</option>
                <option value="001">{"007"}</option>
                <option value="002">{"008"}</option>
              </select>
            </Box>
            <Box className="flex-col w-full md:w-3/6 mb-5 px-5">
              <FieldLabel htmlFor="name">{"Cloud"}</FieldLabel>
              <select
                name="collections"
                id="collection-select"
                className="inline-flex bg-gray-700 items-center p-4 rounded-full font-bold transition shadow-md border-2 border-sky-500"
              >
                <option value="">{"Cloud"}</option>
                <option value="001">{"001"}</option>
                <option value="002">{"002"}</option>
                <option value="001">{"003"}</option>
                <option value="002">{"004"}</option>
                <option value="001">{"005"}</option>
                <option value="002">{"006"}</option>
                <option value="001">{"007"}</option>
                <option value="002">{"008"}</option>
              </select>
            </Box>
            <Box className="flex-col w-full md:w-3/6 mb-5 px-5">
              <FieldLabel htmlFor="name">{"Decoration"}</FieldLabel>
              <select
                name="collections"
                id="collection-select"
                className="inline-flex bg-gray-700 items-center p-4 rounded-full font-bold transition shadow-md border-2 border-sky-500"
              >
                <option value="">{"Decoration"}</option>
                <option value="001">{"001"}</option>
                <option value="002">{"002"}</option>
                <option value="001">{"003"}</option>
                <option value="002">{"004"}</option>
                <option value="001">{"005"}</option>
                <option value="002">{"006"}</option>
                <option value="001">{"007"}</option>
                <option value="002">{"008"}</option>
              </select>
            </Box>
            <Box className="flex-col w-full md:w-3/6 mb-5 px-5">
              <FieldLabel htmlFor="name">{"Hat"}</FieldLabel>
              <select
                name="collections"
                id="collection-select"
                className="inline-flex bg-gray-700 items-center p-4 rounded-full font-bold transition shadow-md border-2 border-sky-500"
              >
                <option value="">{"Hat"}</option>
                <option value="001">{"001"}</option>
                <option value="002">{"002"}</option>
                <option value="001">{"003"}</option>
                <option value="002">{"004"}</option>
                <option value="001">{"005"}</option>
                <option value="002">{"006"}</option>
                <option value="001">{"007"}</option>
                <option value="002">{"008"}</option>
              </select>
            </Box>
            <Box className="flex-col w-full md:w-3/6 mb-5 px-5">
              <FieldLabel htmlFor="name">{"Jewel"}</FieldLabel>
              <select
                name="collections"
                id="collection-select"
                className="inline-flex bg-gray-700 items-center p-4 rounded-full font-bold transition shadow-md border-2 border-sky-500"
              >
                <option value="">{"Jewel"}</option>
                <option value="001">{"001"}</option>
                <option value="002">{"002"}</option>
                <option value="001">{"003"}</option>
                <option value="002">{"004"}</option>
                <option value="001">{"005"}</option>
                <option value="002">{"006"}</option>
                <option value="001">{"007"}</option>
                <option value="002">{"008"}</option>
              </select>
            </Box>
            <Box className="flex-col w-full md:w-3/6 mb-5 px-5">
              <FieldLabel htmlFor="name">{"Tool"}</FieldLabel>
              <select
                name="collections"
                id="collection-select"
                className="inline-flex bg-gray-700 items-center p-4 rounded-full font-bold transition shadow-md border-2 border-sky-500"
              >
                <option value="">{"Tool"}</option>
                <option value="001">{"001"}</option>
                <option value="002">{"002"}</option>
                <option value="001">{"003"}</option>
                <option value="002">{"004"}</option>
                <option value="001">{"005"}</option>
                <option value="002">{"006"}</option>
                <option value="001">{"007"}</option>
                <option value="002">{"008"}</option>
              </select>
            </Box>
            <Box className="flex-col w-full md:w-3/6 mb-5 px-5">
              <FieldLabel htmlFor="name">{"Transport"}</FieldLabel>
              <select
                name="collections"
                id="collection-select"
                className="inline-flex bg-gray-700 items-center p-4 rounded-full font-bold transition shadow-md border-2 border-sky-500"
              >
                <option value="">{"Transport"}</option>
                <option value="001">{"001"}</option>
                <option value="002">{"002"}</option>
                <option value="001">{"003"}</option>
                <option value="002">{"004"}</option>
                <option value="001">{"005"}</option>
                <option value="002">{"006"}</option>
                <option value="001">{"007"}</option>
                <option value="002">{"008"}</option>
              </select>
            </Box>
          </Box>
          <Box className="justify-center">
            <button
              onClick={() => setIsOpen(false)}
              className="btn btn_solid group"
            >
              <span className="group-hover:bg-opacity-0">Ok!</span>
            </button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default CollectionModalFilters;
