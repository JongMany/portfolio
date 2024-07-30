import { useDeviceSize } from "@/shared/libs";
import "./ImageContainer.css";
import { useEffect, useRef, useState } from "react";

// https://blog.webdevsimplified.com/2023-05/lazy-load-images/
export const ImageContainer = ({
  image,
  alt = "project",
  smallImageUrl,
}: {
  image: string;
  alt?: string;
  smallImageUrl: string;
}) => {
  const device = useDeviceSize();
  const imageStyle = device === "desktop" ? "w-full" : "w-[80vw] h-[34vh]";
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
    <div className="basis-[50%] flex flex-col items-center justify-center">
      <div
        style={{ backgroundImage: `url(${smallImageUrl})` }}
        className={`blurred-img`}
        ref={blurredImageDivRef}
      >
        <img
          ref={imageRef}
          className={`${imageStyle}`}
          src={image}
          alt={alt}
          loading="lazy"
        />
      </div>
    </div>
  );
};
