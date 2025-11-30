import Image from "next/image";
import building from "@/assets/mvv/building.png";
import presentation from "@/assets/mvv/presentation.jpg";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        {/* mvv ここから*/}
        <section className="h-[1220px] w-full bg-secondary flex flex-col items-center">
          <Image
            src={building}
            alt="背景の建物"
            className="w-full h-auto block relative top-0 m-0"
          />

          <article className="h-[1076px] w-[90%] bg-card rounded-[70px_0_0_70px] p-[80px_10px_80px_100px] box-border -mt-3.5 ml-auto relative">
            <figure className="w-[50%] aspect-100/76 overflow-hidden absolute top-1/3 right-0 z-1">
              <Image
                src={presentation}
                alt="プレゼン画像"
                className="w-full h-full object-cover object-[right_center] opacity-20"
              />
              <div className="absolute inset-0 bg-linear-to-r from-white to-transparent"></div>
            </figure>

            <div className="relative z-2">
              <h3 className="mt-4 mb-4 font-bold text-[32px]">
                私たちは「MVV」を掲げています。
              </h3>
              <h4 className="mt-5 mb-5 font-bold text-[24px]">
                あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、
              </h4>
            </div>

            <div className="relative z-2">
              <section>
                <h2 className="mt-3 mb-3 font-bold flex items-end">
                  <span className="text-[100px] leading-none">M</span>
                  <span className="text-[80px] leading-none bg-linear-to-r from-accent-green to-primary bg-clip-text text-transparent opacity-60">
                    ission
                  </span>
                </h2>
                <p className="leading-relaxed relative mt-4 mb-4 text-[24px] font-bold after:content-[''] after:absolute after:left-0 after:bottom-[-5px] after:w-[197px] after:h-1 after:bg-linear-to-r after:from-primary after:to-secondary">
                  ミッション
                </p>
                <p className="leading-relaxed mt-4 mb-4 text-[16px] font-bold">
                  あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、
                </p>
              </section>

              <section className="ml-[10vw]">
                <h2 className="font-bold mt-3 mb-3 flex items-end">
                  <span className="text-[100px] leading-none">V</span>
                  <span className="text-[80px] leading-none bg-linear-to-r from-accent-green to-primary bg-clip-text text-transparent opacity-60">
                    ision
                  </span>
                </h2>
                <p className="leading-relaxed relative mt-4 mb-4 text-[24px] font-bold after:content-[''] after:absolute after:left-0 after:bottom-[-5px] after:w-[197px] after:h-1 after:bg-linear-to-r after:from-primary after:to-secondary">
                  ビジョン
                </p>
                <p className="leading-relaxed mt-4 mb-4 text-[16px] font-bold">
                  あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、
                </p>
              </section>

              <section className="ml-[20vw]">
                <h2 className="font-bold mt-3 mb-3 flex items-end">
                  <span className="text-[100px] leading-none">V</span>
                  <span className="text-[80px] leading-none bg-linear-to-r from-accent-green to-primary bg-clip-text text-transparent opacity-60">
                    alue
                  </span>
                </h2>
                <p className="relative leading-relaxed mt-4 mb-4 text-[24px] font-bold after:content-[''] after:absolute after:left-0 after:bottom-[-5px] after:w-[197px] after:h-1 after:bg-linear-to-r after:from-primary after:to-secondary">
                  バリュー
                </p>
                <p className="leading-relaxed mt-4 mb-4 text-[16px] font-bold">
                  あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、
                </p>
              </section>
            </div>
          </article>
        </section>
        {/*mvvここまで */}

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
    </div>
  );
}
