// microCMS共通型
export interface MicroCMSBase {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  revisedAt?: string;
}

// プロジェクト (活動実績)
export interface Project extends MicroCMSBase {
  title: string;
  slug: string;
  status: 'published' | 'archived';
  category?: 'business-contest' | 'volunteer' | 'lecture' | 'learning' | 'other';
  period: string;
  members?: number;
  heroImage: {
    url: string;
    height?: number;
    width?: number;
  };
  description: string;
  gallery?: Array<{
    url: string;
    height?: number;
    width?: number;
  }>;
  achievements?: string;
}

// ブログ
export interface Blog extends MicroCMSBase {
  title: string;
  slug: string;
  status: 'published' | 'draft';
  category?: 'business-contest' | 'volunteer' | 'lecture' | 'learning' | 'event' | 'daily' | 'other';
  thumbnail: {
    url: string;
    height?: number;
    width?: number;
  };
  content: string;
  gallery?: Array<{
    url: string;
    height?: number;
    width?: number;
  }>;
}

// サイト設定
export interface SiteSetting {
  logo: {
    url: string;
    height?: number;
    width?: number;
  };
  siteName: string;
  heroImage: {
    url: string;
    height?: number;
    width?: number;
  };
  heroCopy: string;
  mission: string;
  vision: string;
  values: string;
  instagramUrl?: string;
  contactUrl?: string;
}

// ギャラリー
export interface Gallery extends MicroCMSBase {
  image: {
    url: string;
    height?: number;
    width?: number;
  };
  caption?: string;
  order: number;
}

// microCMS APIレスポンス型
export interface MicroCMSListResponse<T> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
}
