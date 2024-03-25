import { FC } from "react";
import { CN } from "../../../utils/types";

const Main: FC<CN> = ({ children }) => (
  <main className="relative pb-10 flex flex-row">{children}</main>
);

export default Main;
