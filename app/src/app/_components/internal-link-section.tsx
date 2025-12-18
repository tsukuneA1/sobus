import Image from "next/image";
import Link from "next/link";
import NextIcon from "@/assets/guide-button/next.svg";
import Activity1 from "@/assets/internal-link/activity-1.jpg";
import Activity2 from "@/assets/internal-link/activity-2.jpg";
import Bridges from "@/assets/logo/bridges.svg";

export const InternalLinkSection = () => {
  return (
    <section className="relative w-full pt-[64px] pb-[100px] md:py-[170px] bg-primary/20 overflow-x-hidden">
      <Image
        src={Bridges}
        alt=""
        width={1185}
        height={187}
        className="w-full absolute bottom-0 overflow-hidden"
      />

      <div className="flex flex-col items-center gap-8 mb-[96px] md:mb-[270px] md:flex-row z-10">
        <div className="relative flex gap-[6px] md:gap-4 md:w-[56vw] pr-2 z-5">
          <Image
            src={Activity1}
            alt="活動の様子"
            width={367}
            height={280}
            className="h-full w-1/2 object-cover"
            placeholder="blur"
          />
          <Image
            src={Activity2}
            alt="活動の様子"
            width={367}
            height={280}
            className="h-full w-1/2 object-cover z-10"
            placeholder="blur"
            style={{
              maskImage: "linear-gradient(to left, transparent, black 30%)",
              WebkitMaskImage:
                "linear-gradient(to left, transparent, black 30%)",
            }}
          />

          <div className="hidden md:block absolute right-0 top-[60px] translate-x-4/5 rounded-[36px] bg-white h-[358px] w-[43vw] md:shrink-0 p-8 pl-[20%]">
            <div className="flex h-full flex-col justify-between gap-6">
              <div className="space-y-4">
                <h2 className="text-xl font-bold leading-normal text-primary md:text-[24px]">
                  活動実績
                </h2>
                <p className="text-sm font-medium leading-6 text-black md:text-base">
                  こちらではソービズの過去の活動を紹介します。活動の様子が写真でご覧いただけます。
                </p>
              </div>

              <Link
                href="/projects"
                className="group inline-flex h-[55px] w-full max-w-[333px] items-center justify-between rounded-[27.5px] bg-gradient-to-r from-primary to-secondary px-6 text-xl font-bold text-white transition-opacity hover:opacity-90 md:text-[24px]"
              >
                <span>活動実績一覧</span>
                <Image
                  src={NextIcon}
                  alt=""
                  width={27}
                  height={27}
                  className="h-[27px] w-[27px]"
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="rounded-l-[36px] bg-white w-[85vw] md:shrink-0 p-8 self-end">
          <div className="flex h-full flex-col justify-between gap-6">
            <div className="space-y-4">
              <h2 className="text-xl font-bold leading-normal text-primary md:text-[24px]">
                活動実績
              </h2>
              <p className="text-sm font-medium leading-6 text-black md:text-base">
                こちらではソービズの過去の活動を紹介します。活動の様子が写真でご覧いただけます。
              </p>
            </div>

            <Link
              href="/projects"
              className="group inline-flex h-[55px] w-full max-w-[333px] items-center justify-between rounded-[27.5px] bg-gradient-to-r from-primary to-secondary px-6 text-xl font-bold text-white transition-opacity hover:opacity-90 md:text-[24px]"
            >
              <span>活動実績一覧</span>
              <Image
                src={NextIcon}
                alt=""
                width={27}
                height={27}
                className="h-[27px] w-[27px]"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* 年間スケジュールボタン */}
      <div className="relative flex justify-center px-6 z-10">
        <Link
          href="/schedule"
          className="inline-flex h-[80px] w-full max-w-[502px] items-center justify-center rounded-[54.5px] border-[3px] border-solid border-primary bg-white text-2xl font-bold text-primary transition-opacity hover:opacity-90 md:h-[109px] md:text-[32px]"
        >
          年間スケジュール
        </Link>
      </div>
    </section>
  );
};
