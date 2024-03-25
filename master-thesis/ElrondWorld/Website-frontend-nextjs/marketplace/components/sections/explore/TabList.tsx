import { FC } from "react";
import FieldTabList from "../../fields/TabList";
import FieldTabItem from "../../fields/TabItem";

const OPTIONS = [
  { name: "Trending" },
  { name: "Top" },
  { name: "Music" },
  { name: "Art" },
  { name: "Virtual Worlds" },
  { name: "Trading Cards" },
  { name: "Utility" },
  { name: "Collectible" },
  { name: "P2E" },
];

const ExploreTabList: FC<{ items?: typeof OPTIONS }> = ({
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

export default ExploreTabList;
