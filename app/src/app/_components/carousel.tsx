"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import CarouselImage1 from "@/assets/carousel/carousel-1.jpg";
import CarouselImage2 from "@/assets/carousel/carousel-2.jpg";
import CarouselImage3 from "@/assets/carousel/carousel-3.jpg";

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
];

const getTransform = (position: number) => {
  if (position === 0) return "perspective(1000px) rotateY(-45deg)"; // 左：左に45度回転
  if (position === 1) return "perspective(1000px) rotateY(0deg)"; // 中央：回転なし
  if (position === 2) return "perspective(1000px) rotateY(45deg)"; // 右：右に45度回転
  return "perspective(1000px) rotateY(0deg)";
};

const getTransformOrigin = (position: number) => {
  if (position === 0) return "center right"; // 左：右端を軸に回転
  if (position === 1) return "center center"; // 中央：中心を軸に回転
  if (position === 2) return "center left"; // 右：左端を軸に回転
  return "center center";
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
    <section className="w-full mx-auto px-4">
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
                <div className="flex flex-row items-center justify-center gap-2 md:gap-[65px]">
                  {/* 3枚の画像を横並びで表示 */}
                  {[0, 1, 2].map((offset) => {
                    const imgIndex = (currentIndex + offset) % totalSlides;
                    const img = images[imgIndex];
                    const transform = getTransform(offset);
                    const transformOrigin = getTransformOrigin(offset);

                    return (
                      <div
                        key={offset}
                        className="relative w-[35vw] max-w-[500px] aspect-[4/3] shrink-0 drop-shadow-xl"
                        style={{
                          transform,
                          transformStyle: "preserve-3d",
                          transformOrigin,
                        }}
                      >
                        <div className="relative w-full h-full">
                          <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={goToPrevious}
          className="absolute left-0 top-0 w-1/2 h-full cursor-pointer z-10"
          aria-label="Previous slide"
        >
          <span className="sr-only">前の画像へ</span>
        </button>

        <button
          type="button"
          onClick={goToNext}
          className="absolute right-0 top-0 w-1/2 h-full cursor-pointer z-10"
          aria-label="Next slide"
        >
          <span className="sr-only">次の画像へ</span>
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
