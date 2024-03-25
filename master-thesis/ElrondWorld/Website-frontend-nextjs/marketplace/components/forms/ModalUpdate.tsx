import { FC, useState } from "react";
import Box from "../containers/Box";
import { Dialog } from "@headlessui/react";

const FormModalUpdate: FC = ({}) => {
  let [isOpen, setIsOpen] = useState(true);

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(true)}
      className="flex overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center md:inset-0 h-modal sm:h-full"
    >
      <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
      <Box className="relative items-center w-full max-w-md h-full md:h-auto flex-col bg-gray-900 shadow-md rounded-lg p-5 text-white">
        <Dialog.Title className="text-2xl font-bold my-5">
          Profile has been updated!
        </Dialog.Title>
        <Box className="justify-center">
          <button
            onClick={() => setIsOpen(false)}
            className="btn btn_solid group mb-5"
          >
            <span className="group-hover:bg-opacity-0">Thanks</span>
          </button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default FormModalUpdate;
