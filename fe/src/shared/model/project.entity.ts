export type AdditionalInfo = {
  type: "DownloadFile";
  content: string;
} & { type: string; content: unknown };

type Image = {
  mediumImageUrl: string;
  smallImageUrl: string;
  largeImageUrl: string;
  loadImageUrl: string;
  originImageUrl: string;
};

export interface ProjectOutline {
  image: Image;
  name: string;
  description: string;
  techSkill: string[];
  additionalInfo?: AdditionalInfo;
}

export interface ProjectDetails {
  name: string;
  main: {
    description: string;
    image: Image;
  };
  details: {
    image: Image;
    description: string;
  }[];
}

export interface ProjectStyle {
  isAlignReverse: boolean;
  animeDirection: "LToR" | "RToL";
}
