import { useState } from "react";

export function useDownloadFile(fileUrl: string) {
  const [isDownloading, setIsDownloading] = useState(false);
  const handleFileDownload = () => {
    if (!isDownloading) {
      setIsDownloading(true);
      fetch(fileUrl)
        .then((response) => response.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(new Blob([blob]));
          const linkElem = document.createElement("a");
          linkElem.href = url;
          linkElem.download = fileUrl.split("/").pop() || "download";
          document.body.appendChild(linkElem);
          linkElem.click();

          window.URL.revokeObjectURL(url);
          setIsDownloading(false);
        })
        .catch((error) => {
          console.error(`File download failed: ${error}`);
          setIsDownloading(false);
        });
    }
  };

  return { isDownloading, handleFileDownload };
}
