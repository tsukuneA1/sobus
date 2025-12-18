import Image from "next/image";
import FooterLogo from "@/assets/logo/footer-logo.svg";
import { GradientLink } from "./gradient-link";
import { links } from "@/app/constants/links";

export const Footer = () => {
  return (
    <footer className="flex flex-col md:flex-row md:justify-between md:items-center py-[50px] px-[25px] md:px-[150px] md:pb-[110px] bg-secondary/50 text-foreground">
      <div>
        <p className="text-base font-medium leading-normal">
          ソーシャルビジネス起業プロジェクト・ソービズ
        </p>
        <p className="text-base font-medium leading-normal mt-2 mb-[50px]">
          毎週水曜日活動
        </p>

        <div className="mt-4 flex w-full max-w-[225px] flex-col gap-6">
          <GradientLink
            href={links.instagram.url}
            text="Instagram"
            target="_blank"
          />
          <GradientLink
            href={links.x.url}
            text="X"
            target="_blank"
          />
        </div>
      </div>

      <Image
        src={FooterLogo}
        alt="ソービズ ロゴ"
        width={240}
        height={87}
        className="h-auto w-[240px] md:w-[350px] mt-[88px] md:mt-0 self-end md:self-auto"
        priority={false}
      />
    </footer>
  );
};
