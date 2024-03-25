import { FC, useEffect, useState } from "react";
import * as qs from "qs";
import Box from "../containers/Box";
import BlogList from "./BlogList";

const strapi_api_url = process.env.NEXT_PUBLIC_API_BASE_URL;

const ListBlogs: FC = ({}) => {
  const [stateLoading, setStateLoading] = useState(true);
  const [articlesMeta, setArticlesMeta] = useState(null);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(8);

  const [articlesFetched, setArticlesFetched] = useState(null);
  const [paginationPageOptions, setPaginationPageOptions] = useState(null);

  useEffect(() => {
    updateArticlesByPage(currentPageNumber);
  }, [currentPageNumber]);

  async function updateArticlesByPage(pageNumber) {
    setStateLoading(true);

    const { articles, meta } = await getArticles(
      currentPageNumber,
      currentPageSize
    );

    updateArticlesFetched(articles);
    updatePaginationPageOptions(meta);
    setArticlesMeta(meta);

    setStateLoading(false);
  }

  async function getArticles(pageNumber, pageSize) {
    const query = qs.stringify(
      {
        pagination: {
          page: pageNumber,
          pageSize: pageSize,
        },
      },
      {
        encodeValuesOnly: true,
      }
    );

    let url =
      strapi_api_url + `/articles?${query}&populate=thumbnail&sort[0]=id:asc`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Unable to get data from ${url}.`);
    }

    let fetched = await res.json();

    return {
      articles: fetched.data,
      meta: fetched.meta,
    };
  }

  function updateArticlesFetched(articles) {
    setArticlesFetched(<BlogList blogItems={articles} />);
  }

  function updatePaginationPageOptions(meta) {
    let items = [];
    setPaginationPageOptions(null);

    if (meta) {
      if (meta.pagination.pageCount) {
        // {#each { length: stateMeta.pagination.pageCount } as _, p}
        for (var i = 0; i < meta.pagination.pageCount; i++) {
          items.push(
            <button className="bg-gray-800 p-4 rounded-lg mx-1"
              onClick={() => setCurrentPageNumber(i + 1)}
              disabled={meta.pagination.page === i + 1}
            >
              {""}
              {i + 1}
            </button>
          );
        }
      }
    }
    setPaginationPageOptions(items);
  }

  return (
    <section>
      <div className="container h-screen justify-start">
        {stateLoading || !articlesFetched || !articlesMeta ? (
          <p>Loading...</p>
        ) : (
          <>
            <Box>{articlesMeta.pagination.total} articles</Box>
            {articlesFetched}
            <Box className="flex-row items-center">
              <Box className="mr-auto">Page {currentPageNumber}</Box>
              <button className="bg-gray-800 p-4 rounded-lg mx-1"
                onClick={() => setCurrentPageNumber(currentPageNumber - 1)}
                disabled={articlesMeta.pagination.page === 1}
              >
                Previous
              </button>

              <Box>{paginationPageOptions}</Box>

              <button className="bg-gray-800 p-4 rounded-lg mx-1"
                onClick={() => setCurrentPageNumber(currentPageNumber + 1)}
                disabled={
                  articlesMeta.pagination.page ===
                  articlesMeta.pagination.pageCount
                }
              >
                Next
              </button>
            </Box>
          </>
        )}
      </div>
    </section>
  );
};

export default ListBlogs;
