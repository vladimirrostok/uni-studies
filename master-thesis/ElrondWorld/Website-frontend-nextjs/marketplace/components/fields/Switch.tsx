import { FC, HTMLProps, useState } from "react";
import { Switch } from "@headlessui/react";
import Box from "../containers/Box";

interface FieldSwitchProps extends HTMLProps<HTMLInputElement> {
  setExternalValue?: (boolean) => void;
}

const FieldSwitch: FC<FieldSwitchProps> = ({
  children,
  className,
  id,
  name,
  setExternalValue,
}) => {
  const [enabled, setEnabled] = useState(false);

  function setValues(value: boolean) {
    setEnabled(value);
    setExternalValue(value);
  }

  return (
    <Switch.Group>
      <Box className="mb-2 sm:mb-0 ml-2 items-center text-lg">
        <Switch
          id={id}
          name={name}
          checked={enabled}
          onChange={setValues}
          className={`${
            enabled ? "bg-sky-500" : "bg-gray-400"
          } relative inline-flex items-center h-6 rounded-full w-11`}
        >
          <span
            className={`${
              enabled ? "translate-x-6" : "translate-x-1"
            } inline-block w-4 h-4 transform bg-white rounded-full`}
          />
        </Switch>
        <Switch.Label
          className={`${
            enabled ? "text-sky-500" : "text-gray-400"
          } px-2 whitespace-no-wrap cursor-pointer`}
        >
          {name}
          {children}
        </Switch.Label>
      </Box>
    </Switch.Group>
  );
};

export default FieldSwitch;
