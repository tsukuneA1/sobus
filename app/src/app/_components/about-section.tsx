import Image from "next/image";
import AboutBridge from "@/assets/logo/about-bridge.png";
import AboutImage from "@/assets/logo/about-image.jpg";
import AboutWord from "@/assets/logo/about-word.png";

export const AboutSection = () => {
  return (
    <section className="relative">
      <Image
        src={AboutBridge}
        alt="about-bridge"
        width={1185.67}
        height={186.99}
        className="hidden md:block flex absolute right-0"
      />
      <div className="top-[73px] flex flex-col md:flex-row md:gap-[43px]">
        <Image
          src={AboutImage}
          alt="about-image"
          width={314}
          height={186}
          className="w-[80vw] md:w-[38vw] z-10 object-contain"
        />
        <div className="w-[86vw] md:w-[46vw] px-[25px] py-[35px] md:px-[65px] md:py-[54px] self-end bg-white z-10 rounded-l-[18px] md:rounded-[40px] mt-[56px]">
          <Image
            src={AboutWord}
            alt="about-word"
            width={215}
            height={88}
            className="w-[122px] md:w-[215px] translate-y-[-150%] md:translate-y-[-130%] absolute"
          />
          <div className="top-[123px] left-[66px]">
            <h2 className="leading-relaxed relative text-lg md:text-[24px] text-primary font-bold after:content-[''] after:absolute after:left-0 after:bottom-[-2px] md:after:bottom-[-5px] after:w-[108px] md:after:w-[197px] after:h-[2px] md:after:h-1 after:bg-linear-to-r after:from-primary after:to-secondary">
              ソービズとは
            </h2>
            <p className="mt-6">
              ソーシャルビジネスという、社会課題解決のためのビジネスに関心を持つ大学生が集まっている団体です。ただし、私たちはビジネスはあくまで解決手段のひとつと考えています。ボランティアや募金、ビジネスコンテストでのアイデア考案など、関心を持つ社会課題の解決に近づく選択肢を日々模索しています。
              <br />
              <br />
              社会課題に関心を持つメンバー同士が活発に話し合い、学年を問わず自分の「やりたい」を形にしながら活動しています。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
