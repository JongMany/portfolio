import { useParams } from "react-router-dom";

export default function ProjectDetailPage() {
  const { projectName } = useParams<{ projectName: string }>();

  if (!projectName) {
    return <>Invalid Project Name</>;
  }

  const decodedProjectName = decodeURIComponent(projectName!);

  return <>Detail ProjectPage: {decodedProjectName}</>;
}
