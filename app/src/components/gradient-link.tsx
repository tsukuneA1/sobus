import Image from "next/image";
import Link from "next/link";
import NextIcon from "@/assets/guide-button/next.svg";

type GradientLinkProps = {
  href: string;
  text: string;
  width?: number;
  target?: "_blank" | "_self";
};

export const GradientLink = ({
  href,
  text,
  width = 225,
  target = "_self",
}: GradientLinkProps) => {
  return (
    <Link
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className="inline-flex h-[37px] items-center justify-between rounded-[27.5px] bg-gradient-to-r from-primary to-secondary px-4 text-[16px] font-medium text-white hover:opacity-90"
      style={{ width: `${width}px` }}
      aria-label={text}
    >
      <span>{text}</span>
      <Image
        src={NextIcon}
        alt={text}
        width={21}
        height={24}
        className="h-[18px] w-auto"
      />
    </Link>
  );
};
