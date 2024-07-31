export type AdditionalInfo = {
  type: "DownloadFile";
  content: string;
} & { type: string; content: unknown };

export interface Project {
  image: {
    default: string;
    small: string;
  };
  name: string;
  description: string;
  techSkill: string[];
  additionalInfo?: AdditionalInfo;
}
export interface ProjectStyle {
  isAlignReverse: boolean;
  animeDirection: "LToR" | "RToL";
}
