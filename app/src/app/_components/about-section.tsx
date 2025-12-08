"use client";

import Image from "next/image";
import MediaQuery from "react-responsive";
import AboutBridge from "@/assets/logo/about-bridge.png";
import AboutBuilding from "@/assets/logo/about-building.png";
import AboutImage from "@/assets/logo/about-image.jpg";
import AboutLine from "@/assets/logo/about-line.png";
import AboutShape from "@/assets/logo/about-shape.png";
import AboutShapeMobile from "@/assets/logo/about-shape-mobile.png";
import AboutWord from "@/assets/logo/about-word.png";
export const AboutSection = () => {
  return (
    <div>
      <MediaQuery maxWidth={768}>
        <section className="relative h-[557px] overflow-hidden">
          <Image
            src={AboutBuilding}
            alt="about-building"
            width={225}
            height={76}
            className="flex absolute left-0"
          />
          <div className="relative">
            <div className="absolute right-0 top-[243px]">
              <Image
                src={AboutShapeMobile}
                alt="about-shape-mobile"
                className="flex flex-col"
              />
              <Image
                src={AboutWord}
                alt="about-word"
                width={122}
                height={76}
                className="flex absolute top-[-30] left-[19px]"
              />
              <div className="absolute top-[35px] left-[26px] w-134.5 h-38">
                <h2 className="flex relative text-[18px] text-primary font-bold">
                  ソービズとは
                </h2>
                <Image
                  src={AboutLine}
                  alt="about-line"
                  width={108}
                  height={2}
                  className="flex relative flex-col"
                />
                <p className="flex relative top-[23px] w-[284px] h-[192px]">
                  十八等官でしたから役所のなかでも、ずうっと下の方でしたし俸給ほうきゅうもほんのわずかでしたが、受持ちが標本の採集や整理で生れ付き好きなことでしたから、わたくしは毎日ずいぶん愉快にはたらきました。殊にそのころ、モリーオ市では競馬場を植物園に拵こしらえ直すというの
                </p>
              </div>
            </div>
            <Image
              src={AboutImage}
              alt="about-image"
              height={187}
              className="flex absolute flex-col left-0 bg-zinc-50"
            />
          </div>
        </section>
      </MediaQuery>
      <MediaQuery minWidth={769}>
        <section className="relative h-[441px] overflow-hidden">
          <Image
            src={AboutBridge}
            alt="about-bridge"
            width={1185.67}
            height={186.99}
            className="flex absolute right-0"
          />
          <div className="relative top-[73px]">
            <div className="relative left-[41%]">
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
                <h2 className="flex relative text-[24px] text-primary font-bold">
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
      </MediaQuery>
    </div>
  );
};
