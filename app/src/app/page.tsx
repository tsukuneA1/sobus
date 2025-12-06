import { Carousel } from "./_components/carousel";
import { GreetingSection } from "./_components/greeting-section";
import { HeroSection } from "./_components/hero-section";
import { MvvSection } from "./_components/mvv-section";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col gap-[105px]">
      <HeroSection />
      <MvvSection />
      <Carousel />
      <GreetingSection />
    </main>
  );
}
