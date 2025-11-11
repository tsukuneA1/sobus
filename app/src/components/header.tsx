import Image from "next/image";
import Link from "next/link";
import HeaderLogo from "@/assets/logo/header-logo.svg";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-secondary/50 backdrop-blur supports-[backdrop-filter]:bg-secondary/50">
      <div className="mx-auto flex h-[68px] items-center justify-between px-6">
        <Link
          href="/"
          aria-label="ソービズのトップへ"
          className="flex h-12 items-center"
        >
          <Image
            src={HeaderLogo}
            alt="ソービズロゴ"
            width={182}
            height={48}
            className="h-full w-auto"
          />
        </Link>

        <nav className="flex items-center gap-10">
          <Link
            href="https://www.instagram.com/wavoc_social_business_/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-bold text-foreground hover:opacity-80"
          >
            Instagram
          </Link>
          <Link
            href="https://x.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-bold text-foreground hover:opacity-80"
          >
            X
          </Link>

          <button
            type="button"
            aria-label="メニューを開く"
            className="inline-flex h-[24px] w-[30px] flex-col justify-between p-0"
          >
            <span className="block h-[2px] w-full rounded bg-primary" />
            <span className="block h-[2px] w-full rounded bg-primary" />
            <span className="block h-[2px] w-full rounded bg-primary" />
          </button>
        </nav>
      </div>
    </header>
  );
};
