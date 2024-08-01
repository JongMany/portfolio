import "./ImageContainer.css";
import { useEffect, useRef, useState } from "react";

// https://blog.webdevsimplified.com/2023-05/lazy-load-images/
export const Img = ({
  alt = "project",
  imageSet: {
    smallImageUrl,
    mediumImageUrl,
    largeImageUrl,
    originImageUrl,
    loadImageUrl,
  },
  imageStyle,
}: {
  alt?: string;
  imageSet: {
    loadImageUrl: string;
    smallImageUrl: string;
    mediumImageUrl: string;
    largeImageUrl: string;
    originImageUrl: string;
  };
  imageStyle?: string;
}) => {
  // const device = useDeviceSize();
  // const imageStyle = device === "desktop" ? "w-full" : "w-[80vw] h-[34vh]";
  const blurredImageDivRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [, setIsLargeImgLoaded] = useState(false);

  useEffect(() => {
    function loaded() {
      if (blurredImageDivRef.current) {
        setIsLargeImgLoaded(true);
        blurredImageDivRef.current.classList.add("loaded");
      }
    }

    const img = imageRef.current;
    if (img?.complete) {
      loaded();
    } else {
      img?.addEventListener("load", loaded);
    }

    return () => {
      img?.removeEventListener("load", loaded);
    };
  }, []);

  return (
    <div
      style={{ backgroundImage: `url(${loadImageUrl})` }}
      className={`blurred-img`}
      ref={blurredImageDivRef}
    >
      <picture>
        <source type="image/webp" srcSet="" />
        <img
          ref={imageRef}
          role="presentation"
          srcSet={`
            ${smallImageUrl}?width=300 300w,
            ${mediumImageUrl}?width=500 500w,
            ${largeImageUrl}?width=800 700w
          `}
          sizes=""
          className={`${imageStyle}`}
          src={originImageUrl}
          alt={alt}
          loading="lazy"
          decoding="async"
          fetchPriority="high"
        />
      </picture>
    </div>
  );
};
