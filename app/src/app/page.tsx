import { getProjects } from "@/lib/microcms";
import { Carousel } from "./_components/carousel";
import { GreetingSection } from "./_components/greeting-section";
import { HeroSection } from "./_components/hero-section";
import { InternalLinkSection } from "./_components/internal-link-section";
import { MvvSection } from "./_components/mvv-section";

export const revalidate = 60;

export default async function Home() {
  // 最新のプロジェクトを1件取得（活動実績セクション用）
  const latestProject = (
    await getProjects({ limit: 1, orders: "-publishedAt" })
  )[0];

  return (
    <main className="flex min-h-screen w-full flex-col gap-[105px]">
      <HeroSection />
      <MvvSection />
      <Carousel />
      <GreetingSection />
      <InternalLinkSection latestProject={latestProject} />
    </main>
  );
}
