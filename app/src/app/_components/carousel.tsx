"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import CarouselImage1 from "@/assets/carousel/demo1.png";
import CarouselImage2 from "@/assets/carousel/demo2.png";
import CarouselImage3 from "@/assets/carousel/demo3.png";
import CarouselImage4 from "@/assets/carousel/demo4.png";
import BackIcon from "@/assets/guide-button/back.svg";
import NextIcon from "@/assets/guide-button/next.svg";

const images = [
  {
    id: 1,
    src: CarouselImage1,
    alt: "Activity 1",
  },
  {
    id: 2,
    src: CarouselImage2,
    alt: "Activity 2",
  },
  {
    id: 3,
    src: CarouselImage3,
    alt: "Activity 3",
  },
  {
    id: 4,
    src: CarouselImage4,
    alt: "Activity 4",
  },
];

const getClipPath = (position: number) => {
  if (position === 0) return "polygon(0% 15%, 100% 0%, 100% 100%, 0% 85%)"; // 左
  if (position === 1) return null;
  if (position === 2) return "polygon(0% 0%, 100% 15%, 100% 85%, 0% 100%)"; // 右
  return null;
};

export const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = images.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="w-full max-w-[1200px] mx-auto px-4">
      <div className="relative">
        {/* カルーセルコンテナ */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((image) => (
              <div
                key={image.id}
                className="w-full shrink-0 flex justify-center"
              >
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-[65px]">
                  {/* 3枚の画像を横並びで表示 */}
                  {[0, 1, 2].map((offset) => {
                    const imgIndex = (currentIndex + offset) % totalSlides;
                    const img = images[imgIndex];
                    const clipPath = getClipPath(offset);

                    return (
                      <div
                        key={offset}
                        className="relative w-full md:w-[300px] h-[200px] md:h-[300px] shrink-0 drop-shadow-xl"
                      >
                        {clipPath ? (
                          <div
                            className="relative w-full h-full overflow-hidden"
                            style={{
                              clipPath,
                            }}
                          >
                            <Image
                              src={img.src}
                              alt={img.alt}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="relative w-full h-full overflow-hidden">
                            <Image
                              src={img.src}
                              alt={img.alt}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 前へボタン */}
        <button
          type="button"
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-80 z-10"
          aria-label="Previous slide"
        >
          <Image src={BackIcon} alt="Previous" width={48} height={48} />
        </button>

        {/* 次へボタン */}
        <button
          type="button"
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-80 z-10"
          aria-label="Next slide"
        >
          <Image src={NextIcon} alt="Next" width={48} height={48} />
        </button>

        {/* インジケーター */}
        <div className="flex justify-center gap-2 mt-6">
          {images.map((image, index) => (
            <button
              type="button"
              key={image.id}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex
                  ? "bg-primary"
                  : "bg-muted hover:bg-primary/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
