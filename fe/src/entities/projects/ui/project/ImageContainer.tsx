import { useDeviceSize } from "@/shared/libs";
import { Img } from "@/shared/ui/image/Img";

// https://blog.webdevsimplified.com/2023-05/lazy-load-images/
export const ImageContainer = ({
  alt = "project",
  imageSet,
}: {
  alt?: string;
  imageSet: {
    loadImageUrl: string;
    smallImageUrl: string;
    mediumImageUrl: string;
    largeImageUrl: string;
    originImageUrl: string;
  };
}) => {
  const device = useDeviceSize();
  const imageStyle = device === "desktop" ? "w-full" : "w-[80vw] h-[34vh]";
  const containerStyle = device === "desktop" ? "w-[100%]" : "w-[70%] h-[80%]";
  return (
    <section className="basis-[50%] flex flex-col items-center justify-center">
      <div className={containerStyle}>
        <Img imageStyle={imageStyle} alt={alt} imageSet={imageSet} />
      </div>
    </section>
  );
};
