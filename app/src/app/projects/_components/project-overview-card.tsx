import Image from "next/image";
import Link from "next/link";
import NextIcon from "@/assets/guide-button/next.svg";
import type { Project } from "@/types/microcms";
import { GradientLink } from "@/components/gradient-link";

type ProjectOverviewCardProps = {
  project: Project;
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

export const ProjectOverviewCard = ({ project }: ProjectOverviewCardProps) => {
  const plainDescription = stripHtml(project.description);
  const truncatedDescription = truncateText(plainDescription, 100);

  return (
    <article className="relative flex flex-col gap-6 md:flex-row md:gap-8">
      {/* 画像 */}
      <div className="relative h-[200px] w-full shrink-0 overflow-hidden rounded-lg md:h-[294px] md:w-[392px]">
        <Image
          src={project.sumbnail.url}
          alt={project.title}
          width={392}
          height={294}
          className="h-full w-full object-cover"
        />
      </div>

      {/* テキストコンテンツ */}
      <div className="flex flex-1 flex-col justify-center gap-4">
        <div className="space-y-2">
          <h3 className="text-xl font-medium leading-normal text-black md:text-[24px]">
            {project.title}
          </h3>
          <p className="text-sm font-normal leading-normal text-black md:text-base">
            {truncatedDescription}
          </p>
        </div>

        <div className="self-end">
          <GradientLink
            href={`/projects/${project.id}`}
            text="詳細はこちら"
            width={178}
          />
        </div>
      </div>
    </article>
  );
};
