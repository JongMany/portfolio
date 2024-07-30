import { useDownloadFile } from "@/entities/projects/libs/useDownloadFile";

type Props = {
  fileUrl: string;
};

export default function FileDownload({ fileUrl }: Props) {
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
