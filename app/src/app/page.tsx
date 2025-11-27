import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col relative">
      <h2 className="text-[50px] font-bold tracking-[8] text-[#EB8338CC] ml-30 mt-5">
        WASEDA UNIVERCITY
      </h2>
      <div className="flex relative justify-end">
        <Image
          className="flex w-[70vw] aspect-[2] object-cover object-[0_65%]"
          src="/top-photo.jpg"
          alt="top-photo"
          width={1253.38}
          height={634}
        />
      </div>
      <h1 className="flex flex-col absolute text-[116px] tracking-[8] font-bold text-white top-30 left-25">
        SOCIAL<br></br>BUSINESS<br></br>CIRCLE
      </h1>
      <div className="absolute top-130 ">
        <div className="flex">
          <Image
            className="flex"
            src="/Group 176.png"
            alt="Vercel logomark"
            width={640.81}
            height={337.97}
          />
          <Image
            className="flex"
            src="/Group 176.png"
            alt="Vercel logomark"
            width={640.81}
            height={337.97}
          />
        </div>
        <div className="flex absolute top-0 left-0 translate-x-[-10%]">
          <Image
            className="flex"
            src="/Group 173 (1).png"
            alt="Vercel logomark"
            width={640.81}
            height={337.97}
          />
          <Image
            className="flex"
            src="/Group 173 (1).png"
            alt="Vercel logomark"
            width={640.81}
            height={337.97}
          />
        </div>
      </div>
      <div className="absolute left-250 top-150 w-100 h-48 bg-white rounded-md shadow-lg z-20" />
      <div className="flex absolute left-250 top-150 p-4 z-30">
        <Image
          className="h-auto"
          src="/hero_logo.svg"
          alt="ソービズ ロゴ"
          width={348.99}
          height={126}
          priority={true}
        />
      </div>
    </div>
    /* <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>*/
  );
}
