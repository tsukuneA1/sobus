type MicroCMSBase = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  revisedAt?: string;
};

type MicroCMSImage = {
  url: string;
  height?: number;
  width?: number;
};

export type Project = {
  title: string;
  category: string;
  sumbnail: MicroCMSImage;
  description: string;
  gallery?: MicroCMSImage[];
} & MicroCMSBase;

export type Gallery = {
  image: MicroCMSImage;
  caption?: string;
  order: number;
} & MicroCMSBase;

export type MicroCMSListResponse<T> = {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
};
