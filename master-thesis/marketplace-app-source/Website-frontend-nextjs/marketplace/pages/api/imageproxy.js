// https://www.akmittal.dev/posts/nextjs-image-use-any-domain/
// pages/api/imageproxy.js
// export default async (req, res) => {
//   const url = decodeURIComponent(req.query.url);
//   const result = await fetch(url);
//   const body = await result.body;
//   body.pipe(res);
// };

/*
Commented above, as there is way to allow any random hosts by completely disabling image optimization
use keyword unoptimized in <image> component to achieve that like

          <Image
            unoptimized
            src={image}
            alt={name}
            width="2048"
            height="2048"
            className="object-contain"
          />

 */
