import Head from "next/head";
const HeadForProdcs = ({ title, description, link, image }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:url" content={link} />
        <meta property="og:image" content={image} />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content={title} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@LinekPawe" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
      </Head>
    </>
  );
};

export default HeadForProdcs;
