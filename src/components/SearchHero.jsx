import React from "react";
import DefaultHome from "./DefaultHome";
import Footer from "./footer";

const heroSlides = [
  {
    id: "87140",
    title: "Fresh picks to explore",
    subtitle: "High-energy stories, bold visuals, and quick access to cast and title details.",
    image:
      "https://occ-0-6245-2164.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABXxsD1pl2iFLCR_wYq31-s1nCmjtG0247mfCf5wrOhTJJBCHKitOzHntERYOE76-i-omH4g2bupItBiT5RrxcyjI3G1Jqqz_Sk2S.webp?r=f5f",
    tags: ["Featured", "Action", "Details"],
  },
  {
    id: "2993",
    title: "Award-winning drama",
    subtitle: "Moody frames, unforgettable characters, and a strong first look at the story world.",
    image:
      "https://occ-0-6245-2186.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABXqhmOK-KBUzjOrk0iJ5gWgxMBnDHXjEiChZUCMhRxfsq-CBzrzlm4zjco7lRKJpuuMhL3i5mkSaZdwdjXpTgrllHr9Y1Pry8oXl.webp?r=608",
    tags: ["Drama", "Awarded", "Popular"],
  },
  {
    id: "50036",
    title: "Anime spotlight",
    subtitle: "Dive into intense worlds, stylized action, and standout character highlights.",
    image:
      "https://occ-0-6245-2186.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABaudtqamvNh8KcHWf3cktNN-66448zDt6baD8201rPkhv8EOrFFUKMcgwCS6aMHeBTreNbJP0u9PJ6S6EpblQ2j5D0N0zzzGbsys.webp?r=a7e",
    tags: ["Anime", "Adventure", "Trending"],
  },
  {
    id: "67252",
    title: "Big-screen story focus",
    subtitle: "A cleaner mobile-first hero built around discovery, visuals, and title information.",
    image:
      "https://m.media-amazon.com/images/S/pv-target-images/51c2c75da778c109ccc33ff293ff48f0cccc60b18c3fef8a42afe2a80e07acac._SX1920_FMwebp_.jpg",
    tags: ["Epic", "Series", "Spotlight"],
  },
  {
    id: "53647",
    title: "Top picks curated for you",
    subtitle: "Start with a featured title or search for movies, anime, actors, and full details.",
    image:
      "https://occ-0-6245-2186.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABTFUb7eF66eBI9-QcgF7miSIruCKoL7yuIKoyCQzj-xMqEiH-xKY_k7XqPKKH3KN3JBuTMVt01qHpKf1XlD5hVZ4SKt-Qq1XehyQ.webp?r=178",
    tags: ["Editors Pick", "Sci-Fi", "Explore"],
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

            <div className="relative z-10 flex h-full items-end px-3 pb-5 pt-18 sm:px-5 sm:pb-8 lg:px-10 lg:pb-12">
              <div className="w-full max-w-[17rem] rounded-[22px]  p-3 backdrop-blur-md sm:max-w-[20rem] sm:p-4 lg:max-w-[24rem] lg:p-5">
                <div className="mb-2 flex flex-wrap gap-1.5 sm:mb-3 sm:gap-2">
                  {slide.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/8 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-gray-200 sm:px-3 sm:text-[10px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {slide.logos?.length ? (
                  <div className="mb-3 flex max-w-[78%] flex-col gap-2 sm:mb-4 sm:max-w-[72%]">
                    {slide.logos.map((logo) => (
                      <img
                        key={logo}
                        src={logo}
                        alt=""
                        className="max-h-8 w-fit object-contain sm:max-h-10"
                        loading="lazy"
                      />
                    ))}
                  </div>
                ) : (
                  <h2 className="max-w-[12rem] text-xl font-black uppercase leading-[0.95] tracking-tight text-white sm:max-w-[14rem] sm:text-3xl lg:max-w-[18rem] lg:text-[2.4rem]">
                    {slide.title}
                  </h2>
                )}

                <p className="mt-2 max-w-xs text-xs leading-5 text-gray-200 sm:mt-3 sm:text-sm sm:leading-6">
                  {slide.subtitle}
                </p>

                <div className="mt-4 flex items-center gap-2.5 sm:mt-5 sm:gap-3">
                  <span className="rounded-full bg-red-600 px-3 py-1.5 text-xs font-semibold text-white sm:px-4 sm:py-2 sm:text-sm">
                    Open details
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gray-300 sm:text-xs">
                    Explore title
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
