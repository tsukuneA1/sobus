import type { MicroCMSQueries } from "microcms-js-sdk";
import { createClient } from "microcms-js-sdk";
import type { Gallery, MicroCMSListResponse, Project } from "@/types/microcms";

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error("MICROCMS_API_KEY is required");
}

// microCMSクライアント
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

// ============================================
// Projects API
// ============================================

/**
 * プロジェクト一覧を取得
 * @param queries - microCMSクエリパラメータ
 * @returns プロジェクト配列
 */
export const getProjects = async (queries?: MicroCMSQueries) => {
  const data = await client.get<MicroCMSListResponse<Project>>({
    endpoint: "projects",
    queries,
  });
  return data.contents;
};

/**
 * プロジェクト詳細を取得
 * @param contentId - コンテンツID
 * @returns プロジェクト
 */
export const getProjectById = async (contentId: string) => {
  return await client.get<Project>({
    endpoint: "projects",
    contentId,
  });
};

// ============================================
// Gallery API
// ============================================

/**
 * ギャラリー画像を取得（order昇順）
 * @returns ギャラリー配列
 */
export const getGallery = async () => {
  const data = await client.get<MicroCMSListResponse<Gallery>>({
    endpoint: "gallery",
    queries: { orders: "order" },
  });
  return data.contents;
};
