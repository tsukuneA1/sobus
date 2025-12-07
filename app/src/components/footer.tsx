import Image from "next/image";
import FooterLogo from "@/assets/logo/footer-logo.svg";
import { GradientLink } from "./gradient-link";

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
              <GradientLink
                href="https://www.instagram.com/wavoc_social_business_/"
                text="Instagram"
                target="_blank"
              />
              <GradientLink
                href="https://x.com/wavoc_sbp"
                text="X"
                target="_blank"
              />
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
