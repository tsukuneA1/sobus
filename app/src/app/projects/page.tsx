import Image from "next/image";
import Link from "next/link";
import BackIcon from "@/assets/guide-button/back.svg";
import { getProjects } from "@/lib/microcms";
import { MonthlyArchive } from "./_components/monthly-archive";
import { ProjectOverviewCard } from "./_components/project-overview-card";
import Bridges from "@/assets/logo/bridges.svg";
import BackgroundPattern from "@/assets/logo/background-pattern.svg";
import BackgroundPatternWhite from "@/assets/logo/background-pattern-white.svg";

export const revalidate = 60;

const Page = async () => {
  const projects = await getProjects({ orders: "-publishedAt" });

  return (
    <div className="flex justify-between pt-[46px] pb-[136px] md:py-[150px] gap-[18px] relative">
      {/* メインコンテンツエリア */}
      <div className="max-w-[1190px] w-[70vw] z-2">
        {/* 白い背景カード */}
        <div className="relative rounded-r-[18px] md:rounded-r-[70px] bg-white pt-[66px] pb-[112px]">
          {/* ページタイトル */}
          <div className="mb-12 md:mb-[115px]">
            <div className="mb-2 flex items-center gap-4">
              <div className="h-1 w-[28px] md:w-[128px] bg-gradient-to-r from-primary to-secondary" />
              <h1 className="text-lg md:text-xl font-bold leading-normal text-primary">
                活動実績
              </h1>
            </div>
          </div>

          {/* プロジェクト一覧 */}
          {projects.length > 0 ? (
            <div className="space-y-16 mx-9 md:mx-36">
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
              className="group inline-flex h-[42px] md:h-[55px] w-auto md:w-full max-w-[333px] items-center justify-between rounded-[27.5px] bg-gradient-to-r from-primary to-secondary px-[15px] md:px-6 md:text-[24px] font-bold text-white transition-opacity hover:opacity-90"
            >
              <Image
                src={BackIcon}
                alt=""
                width={21}
                height={21}
                className="h-[21px] w-[21px] md:h-[27px] md:w-[27px]"
              />
              <span>メインページに戻る</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="mr-[25px] md:mr-36">
        <MonthlyArchive projects={projects} />
      </div>

      <Image
        src={Bridges}
        alt=""
        width={1185}
        height={187}
        className="w-full absolute bottom-0 overflow-hidden"
      />
      <Image
        src={BackgroundPattern}
        alt=""
        height={250}
        className="h-[250px] md:h-[1080px] w-auto absolute bottom-0 right-0"
      />
      <Image
        src={BackgroundPatternWhite}
        alt=""
        height={200}
        className="h-[200px] md:h-[720px] w-auto absolute top-[250px] md:top-[140px] right-0"
      />
    </div>
  );
};

export default Page;
