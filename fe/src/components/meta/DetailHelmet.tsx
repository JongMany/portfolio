import { Helmet } from "react-helmet-async";
type Props = {
  title: string;
  architect: string;
  pageTitle: string;
  url: string;
  web3D_link: string;
  long_description: string;
  thumbnail: string;
};

export const DetailHelmet = ({
  title,
  architect,
  pageTitle,
  url,
}: // web3D_link,
// long_description,
// thumbnail,
Props) => {
  return (
    <Helmet>
      {title && architect && <title>{pageTitle}</title>}
      <meta property="og:title" content={pageTitle} />
      <meta name="twitter:title" content={pageTitle} />
      <meta property="og:url" content={url} />
      <meta property="twitter:url" content={url} />
      {/* <meta name="description" content={short_desc} />
      <meta property="og:description" content={short_desc} />
      <meta name="twitter:description" content={short_desc} /> */}
      <meta
        name="subject"
        content={
          "Architecture, Web 3d contents, VR supported, " +
          title +
          ", " +
          architect
        }
      />
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
            "description": "Step into the iconic '${title}' designed by the renowned architect ${architect} ...",
            "breadcrumb": { "@id": "${url}#breadcrumb" },
            "inLanguage": "en",
            "mainContentOfPage": "${url}#contents",
            "lastReviewed": "2023-08-02"
          }`}
      </script>
    </Helmet>
  );
};
