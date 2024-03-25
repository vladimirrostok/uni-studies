import { FC } from "react";
import NavSocial from "../../navigations/NavSocial";
import FullWidth from "../../containers/FullWidth";

const IndexFooter: FC = () => {
  return (
    <footer className="flex justify-end">
      <FullWidth>
        <NavSocial />
      </FullWidth>
    </footer>
  );
};

export default IndexFooter;
