import Image from "next/image";
import Toplogo from "@/assets/hero-section/sobus-logo.png";
import TopBridge from "@/assets/hero-section/top-bridge.png";
import TopBridgeResponsive from "@/assets/hero-section/top-bridge-responsive.png";
import TopPhoto from "@/assets/hero-section/top-photo.png";

export const HeroSection = () => {
  return (
    <div className="h-[670px] flex flex-col relative md:h-[800px]">
      <h2 className="text-[20px] ml-[18px] mt-[58px] tracking-[0.1rem] font-bold  text-[#EB8338CC]  md:ml-32 md:mt-5 md:text-[50px] md:tracking-[0.5rem] ">
        WASEDA UNIVERCITY
      </h2>
      <div className="flex relative justify-end">
        <Image
          className="w-[80vw] h-[333px] object-cover opacity-60 md:w-[75vw] md:aspect-[1.7] z-10"
          src={TopPhoto}
          alt="top-photo"
        />
      </div>
      <h1 className=" absolute text-[50px]  ml-[18px] mt-[70px] tracking-[8] font-bold text-white md:top-20 md:left-25 md:text-[116px] z-10">
        SOCIAL<br></br>BUSINESS<br></br>CIRCLE
      </h1>
      <div className="absolute top-120 hidden md:block">
        <Image
          className="flex"
          src={TopBridge}
          alt="top-bridges"
          width={1000}
          height={340}
        />
      </div>
      <div className="absolute top-[350px] block md:hidden z-0 ">
        <Image
          className="flex"
          src={TopBridgeResponsive}
          alt="top-bridges"
          width={570}
          height={267}
        />
      </div>

      <Image
        className="w-[221px] h-auto absolute right-[25px] bottom-0 md:right-10 md:w-[421px]"
        src={Toplogo}
        alt="sobus-logo"
        width={421}
        height={203}
        priority={true}
      />
    </div>
  );
};
