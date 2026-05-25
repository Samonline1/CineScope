import React from "react";
import DefaultHome from "./DefaultHome";
import Footer from "./footer";

const heroSlides = [
  {
    id: "87140",
    title: "Fresh picks for tonight",
    subtitle: "High-energy stories, bold visuals, and one-tap jump into details.",
    image:
      "https://occ-0-6245-2164.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABXxsD1pl2iFLCR_wYq31-s1nCmjtG0247mfCf5wrOhTJJBCHKitOzHntERYOE76-i-omH4g2bupItBiT5RrxcyjI3G1Jqqz_Sk2S.webp?r=f5f",
    tags: ["Featured", "Action", "Binge"],
  },
  {
    id: "2993",
    title: "Award-winning drama",
    subtitle: "Moody frames, unforgettable characters, and a cinematic landing view.",
    image:
      "https://occ-0-6245-2186.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABXqhmOK-KBUzjOrk0iJ5gWgxMBnDHXjEiChZUCMhRxfsq-CBzrzlm4zjco7lRKJpuuMhL3i5mkSaZdwdjXpTgrllHr9Y1Pry8oXl.webp?r=608",
    tags: ["Drama", "Awarded", "Popular"],
  },
  {
    id: "50036",
    title: "Anime-ready lineup",
    subtitle: "Dive into intense worlds, stylized action, and standout fan favorites.",
    image:
      "https://occ-0-6245-2186.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABaudtqamvNh8KcHWf3cktNN-66448zDt6baD8201rPkhv8EOrFFUKMcgwCS6aMHeBTreNbJP0u9PJ6S6EpblQ2j5D0N0zzzGbsys.webp?r=a7e",
    tags: ["Anime", "Adventure", "Trending"],
  },
  {
    id: "67252",
    title: "Stream something huge",
    subtitle: "Full-bleed visuals and a cleaner mobile-first hero that still feels premium.",
    image:
      "https://m.media-amazon.com/images/S/pv-target-images/51c2c75da778c109ccc33ff293ff48f0cccc60b18c3fef8a42afe2a80e07acac._SX1920_FMwebp_.jpg",
    tags: ["Epic", "Series", "Weekend"],
  },
  {
    id: "53647",
    title: "Top picks curated for you",
    subtitle: "Start with a featured title or search instantly for movies, anime, and actors.",
    image:
      "https://occ-0-6245-2186.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABTFUb7eF66eBI9-QcgF7miSIruCKoL7yuIKoyCQzj-xMqEiH-xKY_k7XqPKKH3KN3JBuTMVt01qHpKf1XlD5hVZ4SKt-Qq1XehyQ.webp?r=178",
    tags: ["Editors Pick", "Sci-Fi", "Must Watch"],
    logos: [
      "https://occ-0-6245-2186.1.nflxso.net/dnm/api/v6/S4oi7EPZbv2UEPaukW54OORa0S8/AAAABZyOthTbqP0lKDk4RMY_d_osHdCvHVA61Xt7-hBWI4TkHsbptPli42zFj8yRdJOHxcWwyHuHNd-xjPyKyjeUV5j30LHGsjuj.webp?r=5ff",
      "https://occ-0-6245-2186.1.nflxso.net/dnm/api/v6/S4oi7EPZbv2UEPaukW54OORa0S8/AAAABXG5gmlIhSDh9F5SdDQdBne7h4_X54BQqzS_bAwMmlgTD9uZTKR9pEl7h7UkRvMhwJ0_HwqYNaKLXgBh2g5sxbWzIp3Tn597sA.webp?r=d59",
    ],
  },
];

const SearchHero = ({ onOpenDetails }) => {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-black ">
      <div className="scroll-animation flex w-screen gap-0 ">
        {heroSlides.map((slide) => (
          <article
            key={slide.id}
            className="relative h-[34rem] w-screen flex-shrink-0 cursor-pointer overflow-hidden sm:h-[42rem] lg:h-[44rem]"
            onClick={() => onOpenDetails(slide.id)}
          >
            <img
              className="absolute inset-0 block h-full w-full object-cover"
              src={slide.image}
              alt={slide.title}
              loading="lazy"
            />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(229,9,20,0.24),transparent_30%)]" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/55 to-black/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

            <div className="relative z-10 flex h-full items-end px-4 pb-8 pt-20 sm:px-6 sm:pb-10 lg:px-12 lg:pb-14">
              <div className="max-w-sm rounded-[28px] border border-white/10 bg-black/35 p-4 backdrop-blur-md sm:max-w-lg sm:p-6 lg:max-w-xl lg:p-7">
                <div className="mb-3 flex flex-wrap gap-2">
                  {slide.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-200 sm:text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {slide.logos?.length ? (
                  <div className="mb-4 flex max-w-[80%] flex-col gap-3 sm:max-w-[70%]">
                    {slide.logos.map((logo) => (
                      <img
                        key={logo}
                        src={logo}
                        alt=""
                        className="max-h-10 w-fit object-contain sm:max-h-14"
                        loading="lazy"
                      />
                    ))}
                  </div>
                ) : (
                  <h2 className="max-w-xs text-3xl font-black uppercase tracking-tight text-white sm:max-w-md sm:text-4xl lg:text-5xl">
                    {slide.title}
                  </h2>
                )}

                <p className="mt-3 max-w-md text-sm leading-6 text-gray-200 sm:text-base">
                  {slide.subtitle}
                </p>

                <div className="mt-5 flex items-center gap-3">
                  <span className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white">
                    Open details
                  </span>
                  <span className="text-xs uppercase tracking-[0.24em] text-gray-300 sm:text-sm">
                    Tap to explore
                  </span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black to-transparent" />

      <div className="relative z-10">
        <DefaultHome />
        <Footer />
      </div>
    </section>
  );
};

export default SearchHero;
