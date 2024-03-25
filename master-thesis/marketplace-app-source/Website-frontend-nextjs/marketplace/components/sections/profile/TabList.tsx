import { FC } from "react";
import FieldTabList from "../../fields/TabList";
import FieldTabItem from "../../fields/TabItem";

const OPTIONS = [
  { name: "NFTs" },
  { name: "Collections" },
  { name: "Bio" },
  { name: "Activity" },
];

const ProfileTabList: FC<{ items?: typeof OPTIONS }> = ({
  items = OPTIONS,
}) => {
  return (
    <FieldTabList>
      {items.map((item) => (
        <FieldTabItem key={item.name} {...item} />
      ))}
    </FieldTabList>
  );
};

export default ProfileTabList;
