const https = require("https");
const { createWriteStream } = require("fs");

const cmsURL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://strapi-cms-akawx.ondigitalocean.app/api";

/**
 * Fetch content from CMS and write into file.
 *
 * @param {string} endpoint - absolute path from CMS root. e.g /footer
 * @param {string} filename - relative path to file to write to. creates or overwrites.
 * @returns
 */
function prefetchJSON(endpoint, filename) {
  return new Promise((resolve, reject) => {
    https.get(`${cmsURL}${endpoint}`, (response) => {
      const writeStream = createWriteStream(filename);
      response.pipe(writeStream);
      resolve();
    });
  });
}

(async function () {
  await prefetchJSON("/section-hero", "components/sections/hero/data.json");
  /* NB! when you add prefetched files, add them to .gitignore as well */

  console.log("Done prefetching shared data! 🎉");
})();
