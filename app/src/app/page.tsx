import Image, { type StaticImageData } from "next/image";

import founderMessage from "@/assets/sections/history/founder-message.jpg";
import historyTalk from "@/assets/sections/history/history-talk.jpg";

type Story = {
  title: string;
  body: string;
  image: StaticImageData;
  alt: string;
};

const stories: Story[] = [
  {
    title: "サークルの歴史",
    body: "十八等官でしたから役所のなかでも、ずうっと下の方でしたし俸給ほうきゅうもほんのわずかでしたが、受持ちが標本の採集や整理で生れ付き好きなことでしたから、わたくしは毎日ずいぶん愉快にはたらきました。",
    image: historyTalk,
    alt: "サークルの歴史を紹介する様子",
  },
  {
    title: "創設者挨拶",
    body: "十八等官でしたから役所のなかでも、ずうっと下の方でしたし俸給ほうきゅうもほんのわずかでしたが、受持ちが標本の採集や整理で生れ付き好きなことでしたから、わたくしは毎日ずいぶん愉快にはたらきました。",
    image: founderMessage,
    alt: "創設者が活動を紹介している様子",
  },
];

const skylineHeights = ["h-12", "h-16", "h-10", "h-20", "h-14", "h-12"];

const Skyline = () => {
  return (
    <div aria-hidden="true" className="flex gap-4 text-secondary-foreground/40">
      {skylineHeights.map((height, index) => (
        <span
          key={`${height}-${index.toString()}`}
          className={`w-10 rounded-lg bg-background/80 ${height}`}
        />
      ))}
    </div>
  );
};

const DecorativeBridge = () => {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 420 180"
      className="h-32 w-[360px] text-secondary-foreground/35"
      fill="none"
      role="img"
    >
      <path
        d="M10 150h400M10 140h400M60 150V90M360 150V90M210 150V40"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M60 90C110 70 160 60 210 40s100-20 150 0v50"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M110 150V90M160 150V70M260 150V70M310 150V90"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
};

const StorySection = ({ story }: { story: Story }) => {
  return (
    <article className="flex flex-col gap-6 md:flex-row md:items-center">
      <div className="overflow-hidden rounded-[23px] bg-muted shadow-[0_16px_40px_rgba(20,16,10,0.12)] md:w-72 lg:w-80">
        <Image
          src={story.image}
          alt={story.alt}
          className="h-[260px] w-full object-cover"
          sizes="(min-width: 1024px) 20rem, (min-width: 768px) 18rem, 100vw"
          placeholder="blur"
          priority={story.title === "サークルの歴史"}
        />
      </div>
      <div className="md:flex-1">
        <div className="flex items-center gap-3">
          <span className="h-[3px] w-10 rounded-full bg-gradient-to-r from-primary to-secondary" />
          <p className="text-xl font-bold text-primary">{story.title}</p>
        </div>
        <p className="mt-4 text-base leading-[1.9] text-muted-foreground">
          {story.body}
        </p>
      </div>
    </article>
  );
};

const storiesId = "stories";

const Home = () => {
  return (
    <main className="bg-secondary">
      <section
        aria-labelledby={storiesId}
        className="relative isolate mx-auto flex min-h-screen max-w-6xl flex-col items-center px-6 py-16 lg:px-12"
      >
        <div className="pointer-events-none absolute left-10 top-10 hidden md:block">
          <Skyline />
        </div>
        <div className="pointer-events-none absolute -bottom-10 right-8 hidden lg:block">
          <DecorativeBridge />
        </div>
        <div className="relative w-full rounded-[55px] bg-background px-6 py-10 shadow-[0_40px_120px_rgba(29,24,13,0.08)] sm:px-10 lg:px-16">
          <div className="space-y-16">
            <header id={storiesId} className="sr-only">
              サークルの歴史と創設者挨拶
            </header>
            {stories.map((story) => (
              <StorySection key={story.title} story={story} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
