import { AboutSection } from "./_components/about-section";
import { Carousel } from "./_components/carousel";
import { GreetingSection } from "./_components/greeting-section";
import { HeroSection } from "./_components/hero-section";
import { InternalLinkSection } from "./_components/internal-link-section";
import { MvvSection } from "./_components/mvv-section";

export const revalidate = 60;

export default async function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col gap-[105px]">
      <HeroSection />
      <MvvSection />
      <AboutSection />
      <Carousel />
      {/* <GreetingSection /> */}
      <InternalLinkSection />
    </main>
  );
}
