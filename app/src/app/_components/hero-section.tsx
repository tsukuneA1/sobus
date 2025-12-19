import Image from "next/image";
import Toplogo from "@/assets/hero-section/sobus-logo.png";
import TopBridge from "@/assets/hero-section/top-bridge.png";
import TopBridgeResponsive from "@/assets/hero-section/top-bridge-responsive.png";
import TopPhoto from "@/assets/hero-section/top-photo.png";

export const HeroSection = () => {
  return (
    <section className="h-[670px] flex flex-col relative md:h-[800px]">
      <h2 className="text-[20px] ml-[18px] mt-[58px] tracking-[0.1rem] font-bold  text-[#EB8338CC]  md:ml-32 md:mt-5 md:text-[50px] md:tracking-[0.5rem] ">
        WASEDA UNIVERCITY
      </h2>
      <div className="flex justify-end">
        <Image
          className="absolute w-[80vw] h-[333px] object-cover opacity-60 md:w-[75vw] md:h-[634px] md:aspect-[1.7] "
          src={TopPhoto}
          alt="top-photo"
        />
      </div>
      <h1 className=" absolute text-[50px]  ml-[18px] mt-[70px] tracking-[8] font-bold text-white md:top-20 md:left-25 md:text-[116px] ">
        SOCIAL<br></br>BUSINESS<br></br>CIRCLE
      </h1>
   
        <Image
          className="absolute top-90 h-[267px]  md:h-[340px] md:w-[1200px] md:top-120"
          src={TopBridge}
          alt="top-bridges"
          width={1000}
          height={340}
          
        />
       <Image
        className="w-[221px] h-auto absolute right-[25px] bottom-0 md:right-10 md:w-[421px]"
        src={Toplogo}
        alt="sobus-logo"
        width={421}
        height={203}
        priority={true}
      />
    </section>
  );
};
