import Image from "next/image";
import building from "@/assets/mvv/building.png";
import presentation from "@/assets/mvv/presentation.jpg";

type MvvItemProps = {
  firstTitleChar: string;
  restTitle: string;
  titleDescription: string;
  content: string;
};

const MvvItem = ({
  firstTitleChar,
  restTitle,
  titleDescription,
  content,
}: MvvItemProps) => {
  return (
    <div>
      <h3 className="mt-3 md:mb-3 font-bold flex items-end">
        <span className="text-[40px] font-[900] md:text-[100px] leading-none">
          {firstTitleChar}
        </span>
        <span className="text-[36px] md:text-[80px] leading-none bg-linear-to-r from-accent-green to-primary bg-clip-text text-transparent opacity-60">
          {restTitle}
        </span>
      </h3>
      <p className="leading-relaxed relative mt-2 md:mt-4 md:mb-4 text-lg md:text-[24px] font-bold after:content-[''] after:absolute after:left-0 after:bottom-[-3px] md:after:bottom-[-5px] after:w-[108px] md:after:w-[197px] after:h-[2px] md:after:h-1 after:bg-linear-to-r after:from-primary after:to-secondary">
        {titleDescription}
      </p>
      <p className="leading-relaxed mt-3 md:mt-4 mb-4 text-[16px] font-bold">
        {content}
      </p>
    </div>
  );
};

export const MvvSection = () => {
  return (
    <section className="w-full bg-secondary flex flex-col items-center">
      <Image
        src={building}
        alt="背景の建物"
        className="w-full h-auto block relative top-0 m-0"
      />

      <div className="w-[90%] bg-card rounded-l-[35px] md:rounded-l-[70px] pl-[35px] pb-15 pt-[40px] md:px-[80px] md:pt-[80px] md:pb-[10px] box-border -mt-3.5 ml-auto relative">
        <figure className="w-[50%] aspect-100/76 overflow-hidden absolute top-1/3 right-0 z-1">
          <Image
            src={presentation}
            alt="プレゼン画像"
            className="w-full h-full object-cover object-[right_center] opacity-20"
          />
          <div className="absolute inset-0 bg-linear-to-r from-white to-transparent"></div>
        </figure>

        <header className="relative z-2">
          <h2 className="mt-4 mb-4 font-bold text-lg md:text-[32px]">
            私たちは「MVV」を掲げています。
          </h2>
          <p className="mt-5 mb-5 font-bold md:text-[24px]">
            社会課題を解決する担い手を増やすことを目的にしています
          </p>
        </header>

        <div className="relative z-2">
          <MvvItem
            firstTitleChar="M"
            restTitle="ission"
            titleDescription="ミッション"
            content="社会課題とビジネスの架け橋になる"
          />

          <div className="md:ml-[10vw]">
            <MvvItem
              firstTitleChar="V"
              restTitle="ision"
              titleDescription="ビジョン"
              content="社会課題を解決する担い手を増やす"
            />
          </div>

          <div className="md:ml-[20vw]">
            <MvvItem
              firstTitleChar="V"
              restTitle="alue"
              titleDescription="バリュー"
              content="やりたいことをやる・人を巻き込んで環境を変える"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
