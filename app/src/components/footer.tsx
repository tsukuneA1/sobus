import Link from "next/link";

type FooterProps = {
  className?: string;
};

export const Footer = ({ className }: FooterProps) => {
  return (
    <footer className={className}>
      hoge
    </footer>
  );
};
