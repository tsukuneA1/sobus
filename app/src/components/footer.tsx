import Image from "next/image";
import Link from "next/link";
import NextIcon from "@/assets/guide-button/next.svg";
import FooterLogo from "@/assets/logo/footer-logo.svg";

export const Footer = () => {
  return (
    <footer className="bg-secondary/50 backdrop-blur supports-[backdrop-filter]:bg-secondary/50 text-foreground">
      <div className="mx-auto max-w-screen-xl px-6 py-10 md:pt-[50px] md:pb-[110px]">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          <div className="space-y-4">
            <p className="text-base font-medium leading-normal text-black">
              ソーシャルビジネス起業プロジェクト・ソービズ
            </p>
            <p className="text-base font-medium leading-normal text-black mb-[50px]">
              毎週水曜日活動
            </p>

            <div className="mt-4 flex w-full max-w-[225px] flex-col gap-3">
              <Link
                href="https://www.instagram.com/wavoc_social_business_/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-[37px] w-[225px] items-center justify-between rounded-[27.5px] bg-gradient-to-r from-primary to-secondary px-4 text-[16px] font-bold text-white hover:opacity-90"
                aria-label="Instagramへ移動"
              >
                <span>Instagram</span>
                <Image
                  src={NextIcon}
                  alt=""
                  width={21}
                  height={24}
                  className="h-[18px] w-auto"
                />
              </Link>

              <Link
                href="https://x.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-[37px] w-[225px] items-center justify-between rounded-[27.5px] bg-gradient-to-r from-primary to-secondary px-4 text-[16px] font-medium text-white hover:opacity-90"
                aria-label="Xへ移動"
              >
                <span>X</span>
                <Image
                  src={NextIcon}
                  alt=""
                  width={21}
                  height={24}
                  className="h-[18px] w-auto"
                />
              </Link>
            </div>
          </div>

          <div className="flex justify-end">
            <Image
              src={FooterLogo}
              alt="ソービズ ロゴ"
              width={420}
              height={160}
              className="h-auto w-[260px] md:w-[380px] lg:w-[420px]"
              priority={false}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};
