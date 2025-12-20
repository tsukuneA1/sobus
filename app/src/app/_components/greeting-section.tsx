import Image, { type StaticImageData } from "next/image";
import GreetingBridge from "@/assets/logo/greeting-bridge.svg";
// import historyTalk from "@/assets/sections/history/history-talk.png";
import GreetingBuilding from "@/assets/logo/greeting-building.svg";
import founderMessage from "@/assets/sections/history/founder-message.png";

type Story = {
  title: string;
  body: string;
  image: StaticImageData;
  alt: string;
};

const stories: Story[] = [
  // {
  //   title: "サークルの歴史",
  //   body: "十八等官でしたから役所のなかでも、ずうっと下の方でしたし俸給ほうきゅうもほんのわずかでしたが、受持ちが標本の採集や整理で生れ付き好きなことでしたから、わたくしは毎日ずいぶん愉快にはたらきました。",
  //   image: historyTalk,
  //   alt: "サークルの歴史を紹介する様子",
  // },
  {
    title: "創設者挨拶",
    body: "活動は、起業家を招いてセミナーをしたり、ビジネスを学ぶことから始まりました。メンバー学生たちとともにビジネスプランを作ったり、ビジコンに出たりしてきました。そして今は、ボランティアとして課題を抱えた現場に貢献すること、早稲田祭で商品を販売して課題解決に貢献することもするようになっています。「学ぶこと／社会に貢献すること」をどちらも実践する団体になってきているのがうれしいです。",
    image: founderMessage,
    alt: "創設者が活動を紹介している様子",
  },
];

export const GreetingSection = () => {
  return (
    <section className="relative flex flex-col overflow-hidden pt-[80px] md:pt-[160px]">
      <Image
        src={GreetingBuilding}
        alt=""
        width={475}
        height={145}
        className="absolute top-0 w-[225px] md:w-[475px] left-12 translate-y-[17%] md:translate-y-[12%]"
      />

      <div className="relative z-10 w-full max-w-6xl rounded-r-[55px] bg-background px-6 py-10 shadow-[0_40px_120px_rgba(29,24,13,0.08)] sm:px-10 lg:px-16">
        <div className="space-y-16">
          <header className="sr-only">サークルの歴史と創設者挨拶</header>
          {stories.map((story, index) => (
            <article
              key={story.title}
              className={`flex flex-col gap-6 md:flex-row md:items-center ${
                index === 1 ? "md:ml-[107px]" : ""
              }`}
            >
              <div
                className={`overflow-hidden rounded-[23px] bg-muted shadow-[0_16px_40px_rgba(20,16,10,0.12)] ${
                  index === 0 ? "md:w-[349px]" : "md:w-[240px]"
                }`}
              >
                <Image
                  src={story.image}
                  alt={story.alt}
                  className="h-[261px] w-full object-cover"
                  sizes="(min-width: 768px) ${index === 0 ? '349px' : '240px'}, 100vw"
                  placeholder="blur"
                  priority={story.title === "サークルの歴史"}
                />
              </div>
              <div className="md:flex-1">
                <div className="flex items-center gap-3">
                  <span className="h-[3px] w-10 rounded-full bg-gradient-to-r from-primary to-secondary" />
                  <p className="text-xl font-bold text-primary">
                    {story.title}
                  </p>
                </div>
                <p className="mt-4">{story.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
      <Image
        src={GreetingBridge}
        alt=""
        width={550}
        height={290}
        className="w-full mt-8 md:m-0 md:w-[550px] md:absolute top-1/4 right-0"
      />
    </section>
  );
};
