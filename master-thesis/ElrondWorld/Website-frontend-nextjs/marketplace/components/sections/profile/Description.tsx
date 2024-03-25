import { FC } from "react";
import Description from "../../fields/Description";

type Props = {
  bio: string;
};

const ProfileDescription: FC<Props> = ({ bio }) => {
  return (
    <Description className="collection_description px-5 text-xl py-10">
      {bio}
    </Description>
  );
};

export default ProfileDescription;
