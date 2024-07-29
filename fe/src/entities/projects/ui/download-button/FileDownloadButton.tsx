import { useDownloadFile } from "@/entities/projects/libs/useDownloadFile";

type Props = {
  fileUrl: string;
};

export default function FileDownload({ fileUrl }: Props) {
  // const [isDownloading, setIsDownloading] = useState(false);
  // const handleFileDownload = () => {
  //   if (!isDownloading) {
  //     setIsDownloading(true);
  //     fetch(fileUrl)
  //       .then((response) => response.blob())
  //       .then((blob) => {
  //         const url = window.URL.createObjectURL(new Blob([blob]));
  //         const linkElem = document.createElement("a");
  //         linkElem.href = url;
  //         linkElem.download = fileUrl.split("/").pop() || "download";
  //         document.body.appendChild(linkElem);
  //         linkElem.click();

  //         window.URL.revokeObjectURL(url);
  //         setIsDownloading(false);
  //       })
  //       .catch((error) => {
  //         console.error(`File download failed: ${error}`);
  //         setIsDownloading(false);
  //       });
  //   }
  // };
  const { isDownloading, handleFileDownload } = useDownloadFile(fileUrl);

  return (
    <button
      onClick={handleFileDownload}
      disabled={isDownloading}
      className="font-semibold text-white px-2 py-1 rounded-md border-[1px] mt-4"
    >
      <span>{isDownloading ? "다운로드 중" : "다운로드하기"}</span>
      {/* <form action={fileUrl} method="get" target="_blank">
        <button type="submit">Download</button>
      </form> */}
    </button>
  );
}
