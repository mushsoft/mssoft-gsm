'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Banner {
  _id: string;
  title: string;
  subtitle: string;
  badgeText?: string;
  linkUrl?: string;
  imageUrl: string;
}

export default function BannerSlider({ banners }: { banners: Banner[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!banners || banners.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [banners]);

  if (!banners || banners.length === 0) return null;

  return (
    <div className="relative w-full h-[280px] sm:h-[400px] overflow-hidden rounded-2xl shadow-lg bg-neutral-900">
      {banners.map((banner, index) => (
        <div
          key={banner._id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {banner.imageUrl && (
            <Image
              src={banner.imageUrl}
              alt={banner.title || 'Banner'}
              fill
              className="object-cover brightness-75"
              priority={index === 0}
            />
          )}

          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent text-white">
            {banner.badgeText && (
              <span className="w-max px-3 py-1 bg-red-600 text-xs font-bold uppercase rounded-full mb-2 tracking-wide">
                {banner.badgeText}
              </span>
            )}
            <h2 className="text-2xl sm:text-4xl font-extrabold">{banner.title}</h2>
            <p className="text-sm sm:text-lg text-neutral-200 mt-1">{banner.subtitle}</p>

            {banner.linkUrl && (
              <Link
                href={banner.linkUrl}
                className="mt-4 w-max px-6 py-2 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-lg transition-all"
              >
                Shop Deal
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}