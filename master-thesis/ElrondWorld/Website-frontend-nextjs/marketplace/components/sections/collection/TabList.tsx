import { FC } from "react";
import FieldTabList from "../../fields/TabList";
import FieldTabItem from "../../fields/TabItem";

const OPTIONS = [{ name: "Items" }, { name: "Activity" }];

const CollectionTabList: FC<{ items?: typeof OPTIONS }> = ({
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

export default CollectionTabList;
