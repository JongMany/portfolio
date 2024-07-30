import { useDownloadFile } from "@/entities/projects/libs/useDownloadFile";
import { useDeviceSize } from "@/shared/libs";

type Props = {
  fileUrl: string;
};

export default function FileDownload({ fileUrl }: Props) {
  const { isDownloading, handleFileDownload } = useDownloadFile(fileUrl);
  const device = useDeviceSize();
  const textStyle = device === "desktop" ? "text-lg" : "text-sm";

  return (
    <button
      onClick={handleFileDownload}
      disabled={isDownloading}
      className={`font-semibold text-white px-2 py-1 rounded-md border-[1px] mb-4 ${textStyle}`}
    >
      <span>{isDownloading ? "다운로드 중" : "다운로드하기"}</span>
      {/* <form action={fileUrl} method="get" target="_blank">
        <button type="submit">Download</button>
      </form> */}
    </button>
  );
}
