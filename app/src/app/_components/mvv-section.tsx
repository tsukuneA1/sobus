import Image from "next/image";
import building from "@/assets/mvv/building.png";
import presentation from "@/assets/mvv/presentation.jpg";

export const MvvSection = () => {
  return (
    <section className="h-[1220px] w-full bg-secondary flex flex-col items-center">
      <Image
        src={building}
        alt="背景の建物"
        className="w-full h-auto block relative top-0 m-0"
      />

      <article className="h-[1076px] w-[90%] bg-card rounded-[70px_0_0_70px] p-[80px_10px_80px_100px] box-border -mt-3.5 ml-auto relative">
        <figure className="w-[50%] aspect-100/76 overflow-hidden absolute top-1/3 right-0 z-1">
          <Image
            src={presentation}
            alt="プレゼン画像"
            className="w-full h-full object-cover object-[right_center] opacity-20"
          />
          <div className="absolute inset-0 bg-linear-to-r from-white to-transparent"></div>
        </figure>

        <div className="relative z-2">
          <h3 className="mt-4 mb-4 font-bold text-[32px]">
            私たちは「MVV」を掲げています。
          </h3>
          <h4 className="mt-5 mb-5 font-bold text-[24px]">
            あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、
          </h4>
        </div>

        <div className="relative z-2">
          <section>
            <h2 className="mt-3 mb-3 font-bold flex items-end">
              <span className="text-[100px] leading-none">M</span>
              <span className="text-[80px] leading-none bg-linear-to-r from-accent-green to-primary bg-clip-text text-transparent opacity-60">
                ission
              </span>
            </h2>
            <p className="leading-relaxed relative mt-4 mb-4 text-[24px] font-bold after:content-[''] after:absolute after:left-0 after:bottom-[-5px] after:w-[197px] after:h-1 after:bg-linear-to-r after:from-primary after:to-secondary">
              ミッション
            </p>
            <p className="leading-relaxed mt-4 mb-4 text-[16px] font-bold">
              社会課題とビジネスの架け橋になる
            </p>
          </section>

          <section className="ml-[10vw]">
            <h2 className="font-bold mt-3 mb-3 flex items-end">
              <span className="text-[100px] leading-none">V</span>
              <span className="text-[80px] leading-none bg-linear-to-r from-accent-green to-primary bg-clip-text text-transparent opacity-60">
                ision
              </span>
            </h2>
            <p className="leading-relaxed relative mt-4 mb-4 text-[24px] font-bold after:content-[''] after:absolute after:left-0 after:bottom-[-5px] after:w-[197px] after:h-1 after:bg-linear-to-r after:from-primary after:to-secondary">
              ビジョン
            </p>
            <p className="leading-relaxed mt-4 mb-4 text-[16px] font-bold">
              ボランティアをする学生/ビジネスに関心のある学生が現場で体感・実践すると共に、
              「ソーシャルビジネス」を大学生に伝えていく
            </p>
          </section>

          <section className="ml-[20vw]">
            <h2 className="font-bold mt-3 mb-3 flex items-end">
              <span className="text-[100px] leading-none">V</span>
              <span className="text-[80px] leading-none bg-linear-to-r from-accent-green to-primary bg-clip-text text-transparent opacity-60">
                alue
              </span>
            </h2>
            <p className="relative leading-relaxed mt-4 mb-4 text-[24px] font-bold after:content-[''] after:absolute after:left-0 after:bottom-[-5px] after:w-[197px] after:h-1 after:bg-linear-to-r after:from-primary after:to-secondary">
              バリュー
            </p>
            <p className="leading-relaxed mt-4 mb-4 text-[16px] font-bold">
              やりたいことをやる・人を巻き込んで環境を変える
            </p>
          </section>
        </div>
      </article>
    </section>
  );
};
