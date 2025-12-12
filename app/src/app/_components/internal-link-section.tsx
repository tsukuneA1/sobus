import Image from "next/image";
import Link from "next/link";
import NextIcon from "@/assets/guide-button/next.svg";
import Bridges from "@/assets/logo/bridges.svg";
import type { Project } from "@/types/microcms";

type InternalLinkSectionProps = {
  latestProject?: Project;
};

/**
 * HTMLテキストからプレーンテキストを抽出
 */
const stripHtml = (html: string): string => {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();
};

/**
 * テキストを指定文字数で切り詰め
 */
const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};

export const InternalLinkSection = ({
  latestProject,
}: InternalLinkSectionProps) => {
  const projectDescription = latestProject
    ? truncateText(stripHtml(latestProject.description), 50)
    : "十八等官でしたから役所のなかでも、ずうっと下の方でしたし俸給ほうき";

  return (
    <section className="relative w-full pb-[170px] bg-primary/20">
      <Image
        src={Bridges}
        alt="bridges"
        fill
        className="object-bottom object-contain"
      />

      {/* 活動実績セクション */}
      <div className="relative mb-16 flex flex-col items-center gap-8 md:mb-[358px] md:flex-row">
        {/* 左側の画像 */}
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative h-[200px] w-full overflow-hidden rounded-lg md:h-[280px] md:w-[367px]">
            {latestProject?.gallery?.[0] ? (
              <Image
                src={latestProject.gallery[0].url}
                alt={latestProject.title}
                width={367}
                height={280}
                className="h-full w-full object-cover"
              />
            ) : latestProject?.sumbnail ? (
              <Image
                src={latestProject.sumbnail.url}
                alt={latestProject.title}
                width={367}
                height={280}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-muted" />
            )}
          </div>
          <div className="relative h-[200px] w-full overflow-hidden rounded-lg md:h-[319px] md:w-[466px]">
            {latestProject?.gallery?.[1] ? (
              <Image
                src={latestProject.gallery[1].url}
                alt={latestProject.title}
                width={466}
                height={319}
                className="h-full w-full object-cover"
              />
            ) : latestProject?.sumbnail ? (
              <Image
                src={latestProject.sumbnail.url}
                alt={latestProject.title}
                width={466}
                height={319}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-muted" />
            )}
          </div>
        </div>

        {/* 右側の白いカード */}
        <div className="h-auto w-full rounded-[36px] bg-white p-6 md:h-[358px] md:w-[621px] md:shrink-0 md:p-8">
          <div className="flex h-full flex-col justify-between gap-6">
            <div className="space-y-4">
              <h2 className="text-xl font-bold leading-normal text-primary md:text-[24px]">
                活動実績
              </h2>
              <p className="text-sm font-medium leading-6 text-black md:text-base">
                {projectDescription}
              </p>
            </div>

            <Link
              href="/projects"
              className="group inline-flex h-[55px] w-full max-w-[333px] items-center justify-between rounded-[27.5px] bg-gradient-to-r from-primary to-secondary px-6 text-xl font-bold text-white transition-opacity hover:opacity-90 md:text-[24px]"
            >
              <span>活動実績一覧</span>
              <Image
                src={NextIcon}
                alt=""
                width={27}
                height={27}
                className="h-[27px] w-[27px]"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* 年間スケジュールボタン */}
      <div className="flex justify-center px-6">
        <Link
          href="/schedule"
          className="inline-flex h-[80px] w-full max-w-[502px] items-center justify-center rounded-[54.5px] border-[3px] border-solid border-primary bg-white text-2xl font-bold text-primary transition-opacity hover:opacity-90 md:h-[109px] md:text-[32px] z-10"
        >
          年間スケジュール
        </Link>
      </div>
    </section>
  );
};
