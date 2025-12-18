"use client";

import { links } from "@/app/constants/links";
import Link from "next/link";
import { useState } from "react";

export const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };

  return (
    <>
      <button
        type="button"
        onClick={toggleMenu}
        aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
        aria-expanded={isOpen}
        className="relative inline-flex h-[24px] w-[30px] flex-col justify-center gap-[6px] p-0 cursor-pointer"
      >
        <span
          className={`block h-[2px] w-full rounded bg-primary transition-all duration-300 ${
            isOpen ? "absolute top-1/2 -translate-y-1/2 rotate-45" : ""
          }`}
        />
        <span
          className={`block h-[2px] w-full rounded bg-primary transition-opacity duration-300 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`block h-[2px] w-full rounded bg-primary transition-all duration-300 ${
            isOpen ? "absolute top-1/2 -translate-y-1/2 -rotate-45" : ""
          }`}
        />
      </button>

      <div
        className={`fixed right-0 top-[68px] z-[60] w-[348px] bg-primary transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex flex-col items-center gap-8 py-[87px]">
          <Link
            href={links.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-zen-kaku text-2xl font-bold leading-normal text-white transition-opacity hover:opacity-80 md:hidden"
          >
            Instagram
          </Link>
          <Link
            href={links.x.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-zen-kaku text-2xl font-bold leading-normal text-white transition-opacity hover:opacity-80 md:hidden"
          >
            X
          </Link>
          <Link
            href={links.home.url}
            onClick={toggleMenu}
            className="font-zen-kaku text-2xl font-bold leading-normal text-white transition-opacity hover:opacity-80"
          >
            トップページ
          </Link>
          <Link
            href={links.projects.url}
            onClick={toggleMenu}
            className="font-zen-kaku text-2xl font-bold leading-normal text-white transition-opacity hover:opacity-80"
          >
            活動実績
          </Link>
          <Link
            href={links.schedules.url}
            onClick={toggleMenu}
            className="font-zen-kaku text-2xl font-bold leading-normal text-white transition-opacity hover:opacity-80"
          >
            年間スケジュール
          </Link>
        </nav>
      </div>
    </>
  );
};
