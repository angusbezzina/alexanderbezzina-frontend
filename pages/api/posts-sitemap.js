const { SitemapStream, streamToPromise } = require("sitemap");

export default async function createSitemap(req, res) {
  res.setHeader("Content-Type", "text/xml");
  try {
    const smStream = new SitemapStream({
      hostname: `https://${req.headers.host}`,
      cacheTime: 600000,
    });

    // List of posts
    let posts = [];

    posts = ["/"];

    // Create each URL row
    for (const post of posts) {
      smStream.write({
        url: post,
        changefreq: "daily",
        priority: 0.9,
      });
    }

    // End sitemap stream
    smStream.end();

    // XML sitemap string
    const sitemapOutput = (await streamToPromise(smStream)).toString();
    res.write(sitemapOutput);
    res.end();
  } catch (e) {
    console.log(e);
    res.statusCode = 500;
    res.end();
  }
}
