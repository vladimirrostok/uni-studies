import Moment from "react-moment";

import * as React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { getStrapiMedia } from "../../../lib/media";
import H1 from "../../fields/H1";
import Box from "../../containers/Box";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/solid";

const strapi_api_url = process.env.NEXT_PUBLIC_API_BASE_URL;

const BlogPost = ({}) => {
  const [stateLoading, setStateLoading] = useState(true);
  const [article, setArticle] = useState(null);

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    fetchBlogPost();
  }, [slug]);

  async function fetchBlogPost() {
    if (slug != undefined) {
      const response = await fetch(
        `${strapi_api_url}/articles?filters[slug][$eq]=${slug}&populate=thumbnail`
      );

      // Handle response
      if (!response.ok) {
        console.error(response.statusText);
        throw new Error(`An error occured please try again`);
      }

      const data = await response.json();

      setArticle(data.data[0]);

      setStateLoading(false);
    }
  }

  return stateLoading || article === null ? (
    <p>Loading...</p>
  ) : (
    <>
      <Box className="h-screen justify-start text-left flex-col ">

          <Box className="relative">
            <Box className="bg-black absolute inset-0 opacity-60 z-10"></Box>
            <Box className="absolute z-10 flex flex-col p-4 md:p-10 w-full h-full">
              <Link href="/blog">
                <a className="btn text-white flex items-center -mt-4">
                  <ChevronLeftIcon className="h-6 w-6 text-white mr-1" />
                  <Box className="mb-0">Back</Box>
                </a>
              </Link>
              <H1 className="lg:text-2xl text-white mt-auto">
                {article.attributes.title}
              </H1>
              <Moment format="MMM Do YYYY">
                {article.attributes.published_at}
              </Moment>
            </Box>
          
          <Box className="profile_banner flex-col overflow-hidden">
            <Image
              src={getStrapiMedia(article.attributes.thumbnail)}
              width="1500"
              height="500"
              className="w-full h-full object-cover"
            />
          </Box>
        </Box>
        

        <div className="flex flex-col md:flex-row px-5 text-base py-10">
          <ReactMarkdown
            className="reactMarkDown w-full md:w-9/12 md:pr-10 mb-10 whitespace-pre-line"
            rehypePlugins={[rehypeRaw, remarkGfm]} //adds support for strikethrough, tables, tasklists and URLs directly and underline
            // transformImageUri={uri => uri.startsWith("http") ? uri : `${process.env.GATSBY_IMAGE_BASE_URL}${uri}`}
          >
            {article.attributes.description}
          </ReactMarkdown>
          <Box className="w-full md:w-3/12 bg-gray-900 text-gray-500 rounded-3xl justify-center items-center min-h-[200px]">
            Your add here
          </Box>
        </div>
      </Box>
    </>
  );
};

export default BlogPost;
