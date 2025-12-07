import Image from "next/image";
import AboutBridge from "@/assets/logo/about-bridge.png";
import AboutImage from "@/assets/logo/about-image.jpg";
import AboutLine from "@/assets/logo/about-line.png";
import AboutShape from "@/assets/logo/about-shape.png";
import AboutWord from "@/assets/logo/about-word.png";

export const AboutSection = () => {
  return (
    <section className="relative h-[441px]">
      <Image
        src={AboutBridge}
        alt="about-bridge"
        width={1185.67}
        height={186.99}
        className="flex absolute left-[457px]"
      />
      <div className="relative top-[73px]">
        <div className="relative left-[594px]">
          <Image
            src={AboutShape}
            alt="about-shape"
            width={669}
            height={259}
            className="flex absolute flex-col top-[69px]"
          />
          <Image
            src={AboutWord}
            alt="about-word"
            width={215}
            height={88}
            className="flex absolute left-[47px]"
          />
          <div className="absolute top-[123px] left-[66px] w-134.5 h-38">
            <h2 className="flex relative text-[24px] text-[#EB8338] font-bold">
              ソービズとは
            </h2>
            <Image
              src={AboutLine}
              alt="about-line"
              width={197}
              height={4}
              className="flex relative flex-col"
            />
            <p className="flex relative top-[23px]">
              十八等官でしたから役所のなかでも、ずうっと下の方でしたし俸給ほうきゅうもほんのわずかでしたが、受持ちが標本の採集や整理で生れ付き好きなことでしたから、わたくしは毎日ずいぶん愉快にはたらきました。殊にそのころ、モリーオ市では競馬場を植物園に拵こしらえ直すというの
            </p>
          </div>
        </div>
        <Image
          src={AboutImage}
          alt="about-image"
          height={328}
          className="flex absolute flex-col left-0 bg-zinc-50"
        />
      </div>
    </section>
  );
}