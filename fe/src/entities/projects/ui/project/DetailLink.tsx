import { useDeviceSize } from "@/shared/libs";
import { Link } from "react-router-dom";

type Props = {
  projectName: string;
};
export const DetailLink = ({ projectName }: Props) => {
  const device = useDeviceSize();
  if (device !== "desktop") {
    const encodedProjectName = encodeURIComponent(projectName);
    return <Link to={`/project/${encodedProjectName}`}>더 자세히 보기</Link>;
  }

  return <Link to="/project">더 자세히 보기</Link>;
};
