"use client";

import Link from "next/link";
import { useMemo } from "react";
import type { Project } from "@/types/microcms";

type MonthlyArchiveProps = {
  projects: Project[];
};

/**
 * プロジェクトから年月のリストを生成
 */
const generateMonthlyArchive = (projects: Project[]) => {
  const monthMap = new Map<string, string>();

  projects.forEach((project) => {
    if (project.publishedAt) {
      const date = new Date(project.publishedAt);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const key = `${year}-${month}`;
      const label = `${year} ${month}月`;

      if (!monthMap.has(key)) {
        monthMap.set(key, label);
      }
    }
  });

  // 年月でソート（新しい順）
  return Array.from(monthMap.entries())
    .sort(([a], [b]) => {
      const [yearA, monthA] = a.split("-").map(Number);
      const [yearB, monthB] = b.split("-").map(Number);
      if (yearA !== yearB) return yearB - yearA;
      return monthB - monthA;
    })
    .map(([, label]) => label);
};

export const MonthlyArchive = ({ projects }: MonthlyArchiveProps) => {
  const archiveList = useMemo(
    () => generateMonthlyArchive(projects),
    [projects],
  );

  return (
    <aside className="sticky top-[100px]">
      <h2 className="mb-4 text-lg md:text-xl font-semibold leading-[25px] text-primary">
        月刊アーカイブ
      </h2>
      <nav>
        <ul className="space-y-1">
          {archiveList.map((label) => (
            <li key={label}>
              <Link
                href={`/projects?month=${label}`}
                className="block text-base font-semibold leading-[25px] text-primary transition-opacity hover:opacity-80"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
