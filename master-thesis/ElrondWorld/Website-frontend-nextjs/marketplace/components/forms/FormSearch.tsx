import { FC } from "react";
import FieldInput from "../fields/Input";

const FormSearch: FC = () => {
  return (
    <FieldInput
      id="search"
      type="text"
      name="search"
      placeholder="Search Collections and Creators"
      className="w-full h-12 mb-0"
    ></FieldInput>
  );
};

export default FormSearch;
