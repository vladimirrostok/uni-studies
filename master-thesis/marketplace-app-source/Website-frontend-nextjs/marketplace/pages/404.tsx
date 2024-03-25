import { FC } from "react";

import Layout from "../components/Layout";
import FullWidth from "../components/containers/FullWidth";
import Hyperlink from "../components/fields/Hyperlink";
import { EmojiSadIcon } from "@heroicons/react/solid";
import { PageNotFound } from "../lib/model";
import { getPageNotFound } from "../lib/not-found-page";
import H1 from "../components/fields/H1";
import Description from "../components/fields/Description";
import Box from "../components/containers/Box";

interface NotFoundProps {
  pageData: PageNotFound;
}

const NotFoundPage: FC<NotFoundProps> = ({ pageData }) => {
  return (
    <Layout title="404 | MetaMex">
      <FullWidth className="flex h-full items-center">
        <Box className="justify-center text-center flex-col">
          <span className="text-9xl inline-flex flex-row items-center mx-auto font-bold">
            4<EmojiSadIcon className="h-24 w-24 text-sky-400 mx-2" />4
          </span>
          <H1 className="justify-center">{pageData.headline}</H1>
          <Description className="lg:w-4/12 mx-auto">
            {pageData.description}
          </Description>
          <Hyperlink
            href="/"
            className="px-10 bg-sky-500 hover:bg-sky-400 mx-auto"
          >
            {pageData.buttonText}
          </Hyperlink>
        </Box>
      </FullWidth>
    </Layout>
  );
};

export default NotFoundPage;

export async function getStaticProps(): Promise<{ props: NotFoundProps }> {
  const pageData = await getPageNotFound();

  return {
    props: {
      pageData: pageData["data"]["attributes"],
    },
  };
}
