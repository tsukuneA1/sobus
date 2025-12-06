import Image from "next/image";
import CarouselImage1 from "@/assets/carousel/image-1.jpg";

export const Carousel = () => {
  return (
    <section className="w-full max-w-[1200px] mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-[65px]">
        <div className="relative w-full md:w-[300px] h-[200px] md:h-[300px] shrink-0 drop-shadow-xl">
          <div
            className="relative w-full h-full overflow-hidden"
            style={{
              clipPath: "polygon(0% 15%, 100% 0%, 100% 100%, 0% 85%)",
            }}
          >
            <Image
              src="/images/activity-1.png"
              alt="Activity 1"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="relative w-full md:w-[300px] h-[200px] md:h-[300px] shrink-0 drop-shadow-xl overflow-hidden">
          <Image
            src={CarouselImage1}
            alt="Activity 2"
            fill
            className="object-cover"
          />
        </div>
        
        <div className="relative w-full md:w-[300px] h-[200px] md:h-[300px] shrink-0 drop-shadow-xl">
          <div
            className="relative w-full h-full overflow-hidden"
            style={{
              clipPath: "polygon(0% 0%, 100% 15%, 100% 85%, 0% 100%)",
            }}
          >
            <Image
              src="/images/activity-3.png"
              alt="Activity 3"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
