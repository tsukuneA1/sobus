import Image from "next/image";
import Link from "next/link";
import { links } from "@/app/constants/links";
import HeaderLogo from "@/assets/logo/header-logo.svg";
import { HamburgerMenu } from "@/components/hamburger-menu";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-secondary/50 backdrop-blur supports-[backdrop-filter]:bg-secondary/50">
      <div className="mx-auto flex h-[68px] items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          aria-label="ソービズのトップへ"
          className="flex h-12 items-center"
        >
          <Image
            src={HeaderLogo}
            alt="ソービズロゴ"
            width={102}
            height={27}
            className="h-full w-[102px] md:w-[182px]"
          />
        </Link>

        <nav className="flex items-center gap-10">
          <Link
            href={links.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-bold text-foreground hover:opacity-80 hidden md:block"
          >
            Instagram
          </Link>
          <Link
            href={links.x.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-bold text-foreground hover:opacity-80 hidden md:block"
          >
            X
          </Link>

          <HamburgerMenu />
        </nav>
      </div>
    </header>
  );
};
