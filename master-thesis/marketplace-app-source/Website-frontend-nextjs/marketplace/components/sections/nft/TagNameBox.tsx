import { FC } from "react";
import Box from "../../containers/Box";
import H3 from "../../fields/H3";

export interface TagNameBoxProps {
  tagName: string;
};

const TagNameBox: FC<TagNameBoxProps> = ({ tagName }) => {
  return (
        <p className="border border-violet-400 text-fuchsia-500 py-1 px-4 mr-2 mb-2 text-sm rounded-full">
          {tagName}
        </p>
  );
};

export default TagNameBox;