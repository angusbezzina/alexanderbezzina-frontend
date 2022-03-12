import Head from "next/head";
import { useRouter } from "next/router";

const Meta = ({ title, description, image }) => {
  const { asPath } = useRouter();

  return (
    <Head>
      <title>{title ? title : "Alexander Bezzina Online Portfolio"}</title>
      <meta
        name="description"
        content={
          description
            ? description
            : "Alexander Bezzina, researcher, podcaster, photographer"
        }
      />
      <meta
        name="keywords"
        content="Alexander Bezzina, Conservation Researchers, Wildlife Photography"
      />
      <title>{title ? title : `Alexander Bezzina Online Portfolio`}</title>

      <meta property="og:title" content={title} />
      <meta property="og:type" content="article" />
      {image && <meta property="og:image" content={image} />}
      <meta
        property="og:url"
        content={`https://www.alexanderbezzina.com${asPath}`}
      />
      <meta name="twitter:card" content="summary_large_image" />

      <meta
        property="og:description"
        content={
          description
            ? description
            : "Alexander Bezzina, researcher, podcaster, photographer"
        }
      />
      <meta
        property="og:site_name"
        content="Alexander Bezzina Online Portfolio"
      />
    </Head>
  );
};

export default Meta;
