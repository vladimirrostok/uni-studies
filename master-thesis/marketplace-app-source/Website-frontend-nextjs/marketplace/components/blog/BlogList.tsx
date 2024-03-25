import { FC } from "react";
import ActionAreaCard from "./BlogCard";
import Box from "../containers/Box";
import { getStrapiMedia } from "../../lib/media";

export type BlogListProps = {
  blogItems: any;
};

const BlogList: FC<BlogListProps> = ({ blogItems }) => {
  return (
    <Box className="flex-wrap items-stretch mt-5 md:-mx-2 w-full">
      {blogItems &&
        blogItems.map((item) => (
          <ActionAreaCard
            key={item.id}
            id={item.id}
            thumbnail={getStrapiMedia(item.attributes.thumbnail)}
            slug={item.attributes.slug}
            title={item.attributes.title}
            content={item.attributes.description}
          />
        ))}
    </Box>
  );
};

export default BlogList;