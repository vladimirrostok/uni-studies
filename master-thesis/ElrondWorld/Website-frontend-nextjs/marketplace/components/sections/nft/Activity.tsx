import { FC } from "react";
import Box from "../../containers/Box";
import H3 from "../../fields/H3";
import FieldSwitch from "../../fields/Switch";
import ActivityValueBox, { ActivityValueBoxProps } from "./ActivityValueBox";

const OPTIONS = [
  { name: "Sale" },
  { name: "Offer" },
  { name: "Transfer" },
  { name: "Listed" },
];

export class NftActivityProps {
  values: ActivityValueBoxProps[];
}

const NftActivity: FC<NftActivityProps> = ({ values }) => {
  let valueItems = [];

  for (var i = 0; i < values.length; i++) {
    valueItems.push(
      <ActivityValueBox
        action={values[i].action}
        herotag={values[i].herotag}
        icon={values[i].icon}
        time={values[i].time}
        value={values[i].value}
      />
    );
  }

  return (
    <Box className="mb-5 flex-col">
      <Box className="flex-col sm:flex-row items-center mb-5">
        <H3 className="text-sky-500 text-lg mr-auto sm:mb-0">
          {"Item History"}
        </H3>
        <Box className="flex-wrap">
          {OPTIONS.map((item) => (
            <FieldSwitch key={item.name} {...item} />
          ))}
        </Box>
      </Box>
      <Box className="flex-col bg-gray-900 shadow-md rounded-lg overflow-hidden">
        {valueItems}
      </Box>
    </Box>
  );
};

export default NftActivity;
