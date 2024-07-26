import { Helmet } from "react-helmet-async";
type Props = {
  title: string;
  pageTitle: string;
  url: string;
  shortDesc: string;
};

export const DetailHelmet = ({ title, pageTitle, url, shortDesc }: Props) => {
  return (
    <Helmet>
      {<title>{pageTitle}</title>}
      <meta property="og:title" content={pageTitle} />
      <meta name="twitter:title" content={pageTitle} />
      <meta property="og:url" content={url} />
      <meta property="twitter:url" content={url} />
      <meta name="description" content={shortDesc} />
      <meta property="og:description" content={shortDesc} />
      <meta name="twitter:description" content={shortDesc} />
      <meta name="subject" content={"방구석 코딩쟁이" + title} />
      <meta property="og:image" content={"../../og_image.webp"} />
      <meta property="og:image:alt" content="Logo of Web 3d architrip" />
      <meta name="twitter:image" content={"../../og_image.webp"} />
      <meta name="twitter:image:alt" content="Logo of Web 3d architrip" />
      <script type="application/ld+json">
        {`{
            "@context": "https://schema.org",
            "@type": "ItemPage",
            "@id": "${url}#webpage",
            "url": "${url}",
            "name": "${pageTitle}",
            "about": { "@id": "${url}#contents" },
            "breadcrumb": { "@id": "${url}#breadcrumb" },
            "inLanguage": "en",
            "mainContentOfPage": "${url}#contents",
            "lastReviewed": "2023-08-02"
          }`}
      </script>
    </Helmet>
  );
};
