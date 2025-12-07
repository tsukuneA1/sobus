import Image from "next/image";
import Toplogo from "@/assets/hero-section/sobus-logo.png";
import TopBridge from "@/assets/hero-section/top-bridge.png";
import TopPhoto from "@/assets/hero-section/top-photo.png";

export const HeroSection = () => {
  return (
    <div className="flex flex-col relative h-[800px]">
      <h2 className="text-[50px] font-bold tracking-[8] text-[#EB8338CC] ml-30 mt-5">
        WASEDA UNIVERCITY
      </h2>
      <div className="flex relative justify-end">
        <Image
          className=" w-[75vw] aspect-[1.7] object-cover opacity-[0.6] "
          src={TopPhoto}
          alt="top-photo"
        />
      </div>
      <h1 className=" absolute text-[116px] tracking-[8] font-bold text-white top-15 left-25">
        SOCIAL<br></br>BUSINESS<br></br>CIRCLE
      </h1>
      <div className="absolute top-120 ">
        <Image
          className="flex"
          src={TopBridge}
          alt="top-bridges"
          width={1000}
          height={340}
        />
      </div>

      <Image
        className="h-auto absolute bottom-0 right-10"
        src={Toplogo}
        alt="sobus-logo"
        width={421}
        height={203}
        priority={true}
      />
    </div>
  );
};
