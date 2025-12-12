import Image from "next/image";
import Link from "next/link";
import NextIcon from "@/assets/guide-button/next.svg";
import Bridges from "@/assets/logo/bridges.svg";
import Activity1 from "@/assets/internal-link/activity-1.jpg";
import Activity2 from "@/assets/internal-link/activity-2.jpg";

export const InternalLinkSection = () => {
  return (
    <section className="relative w-full py-[170px] bg-primary/20">
    {/* <section className="relative w-full pb-[170px] before:absolute before:inset-0 before:-top-120 before:bg-primary/20 before:pointer-events-none"> */}
      <Image
        src={Bridges}
        alt="bridges"
        fill
        className="object-bottom object-contain pointer-events-none"
      />

      {/* 活動実績セクション */}
      <div className="relative flex flex-col items-center gap-8 mb-[125px] md:flex-row z-10">
        {/* 左側の画像 */}
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative h-[200px] w-full overflow-hidden rounded-lg md:h-[280px] md:w-[367px]">
            <Image
              src={Activity1}
              alt="活動の様子"
              width={367}
              height={280}
              className="h-full w-full object-cover"
              placeholder="blur"
            />
          </div>
          <div className="relative h-[200px] w-full overflow-hidden rounded-lg md:h-[280px] md:w-[367px]">
            <Image
              src={Activity2}
              alt="活動の様子"
              width={367}
              height={280}
              className="h-full w-full object-cover"
              placeholder="blur"
            />
          </div>
        </div>

        {/* 右側の白いカード */}
        <div className="h-auto w-full rounded-[36px] bg-white p-6 md:h-[358px] md:w-[621px] md:shrink-0 md:p-8">
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
