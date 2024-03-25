const media_url = process.env.NEXT_PUBLIC_API_BASE_URL_MEDIA;

/**
 * Get full Strapi URL from path
 * @param {string} path Path of the URL
 * @returns {string} Full Strapi URL
 */
export function getStrapiURL(path = "") {
  return `${media_url || "http://localhost:1337"}${path}`;
}

export function getStrapiMedia(media) {
  const url = media.data.attributes.url;
  const imageUrl = url.startsWith("/") ? getStrapiURL(url) : url;
  return imageUrl;
}
