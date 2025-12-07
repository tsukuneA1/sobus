import Image from "next/image";
import Link from "next/link";
import BackIcon from "@/assets/guide-button/back.svg";
import { getProjects } from "@/lib/microcms";
import { MonthlyArchive } from "./_components/monthly-archive";
import { ProjectOverviewCard } from "./_components/project-overview-card";

export const revalidate = 60;

const Page = async () => {
  const projects = await getProjects({ orders: "-publishedAt" });

  return (
    <div className="flex justify-between py-[150px]">
      {/* メインコンテンツエリア */}
      <div className="max-w-[1190px] w-[70vw]">
        {/* 白い背景カード */}
        <div className="relative rounded-r-[70px] bg-white pt-[66px] pb-[112px]">
          {/* ページタイトル */}
          <div className="mb-12 md:mb-[115px]">
            <div className="mb-2 flex items-center gap-4">
              <div className="h-1 w-[128px] bg-gradient-to-r from-primary to-secondary" />
              <h1 className="text-[24px] font-bold leading-normal text-primary">
                活動実績
              </h1>
            </div>
          </div>

          {/* プロジェクト一覧 */}
          {projects.length > 0 ? (
            <div className="space-y-16 ml-36">
              {projects.map((project) => (
                <ProjectOverviewCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-lg text-muted-foreground">
                プロジェクトがまだ登録されていません。
              </p>
            </div>
          )}

          {/* メインページに戻るボタン */}
          <div className="mt-12 flex justify-center md:mt-[216px]">
            <Link
              href="/"
              className="group inline-flex h-[55px] w-full max-w-[333px] items-center justify-between rounded-[27.5px] bg-gradient-to-r from-primary to-secondary px-6 text-[24px] font-bold text-white transition-opacity hover:opacity-90"
            >
              <Image
                src={BackIcon}
                alt=""
                width={27}
                height={27}
                className="h-[27px] w-[27px]"
              />
              <span>メインページに戻る</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 月刊アーカイブ（右側固定、デスクトップのみ表示） */}
      <div className="mr-36">
        <MonthlyArchive projects={projects} />
      </div>
    </div>
  );
};

export default Page;
