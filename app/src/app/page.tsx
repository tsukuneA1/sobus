import { ActivityImagesSection } from "./_components/activity-images-section";
import { GreetingSection } from "./_components/greeting-section";
import { MvvSection } from "./_components/mvv-section";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col gap-[105px] items-center justify-between dark:bg-black sm:items-start bg-secondary">
        <MvvSection />

        <ActivityImagesSection />

        <GreetingSection />
      </main>
    </div>
  );
}
