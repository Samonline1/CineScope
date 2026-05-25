import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const movies = [
  {
    id: 46562,
    name: "The Last of Us",
    image: "https://static.tvmaze.com/uploads/images/medium_portrait/563/1409008.jpg",
    premiered: "2023-01-15",
    tag: "Survival drama",
  },
  {
    id: 82,
    name: "Game of Thrones",
    image: "https://static.tvmaze.com/uploads/images/medium_portrait/498/1245274.jpg",
    premiered: "2011-04-17",
    tag: "Fantasy epic",
  },
  {
    id: 2993,
    name: "Stranger Things",
    image: "https://static.tvmaze.com/uploads/images/medium_portrait/200/501942.jpg",
    premiered: "2016-07-15",
    tag: "Sci-fi mystery",
  },
  {
    id: 169,
    name: "Breaking Bad",
    image: "https://static.tvmaze.com/uploads/images/medium_portrait/0/2400.jpg",
    premiered: "2008-01-20",
    tag: "Crime classic",
  },
  {
    id: 44778,
    name: "House of the Dragon",
    image: "https://static.tvmaze.com/uploads/images/medium_portrait/530/1325279.jpg",
    premiered: "2022-08-21",
    tag: "Power struggle",
  },
  {
    id: 168,
    name: "Dexter",
    image: "https://static.tvmaze.com/uploads/images/medium_portrait/0/2147.jpg",
    premiered: "2006-10-01",
    tag: "Dark thriller",
  },
];

const actors = [
  {
    id: 49567,
    name: "Robert Downey Jr.",
    image: "https://static.tvmaze.com/uploads/images/medium_portrait/5/13304.jpg",
    dob: "1965-04-04",
    tag: "Screen icon",
  },
  {
    id: 26971,
    name: "Jenna Ortega",
    image: "https://static.tvmaze.com/uploads/images/medium_portrait/432/1081921.jpg",
    dob: "2002-09-27",
    tag: "Modern favorite",
  },
  {
    id: 47332,
    name: "Dwayne Johnson",
    image: "https://static.tvmaze.com/uploads/images/medium_portrait/11/29580.jpg",
    dob: "1972-05-02",
    tag: "Action star",
  },
  {
    id: 71223,
    name: "Chris Hemsworth",
    image: "https://static.tvmaze.com/uploads/images/medium_portrait/425/1062571.jpg",
    dob: "1983-08-11",
    tag: "Blockbuster lead",
  },
  {
    id: 70077,
    name: "Leonardo DiCaprio",
    image: "https://static.tvmaze.com/uploads/images/medium_portrait/269/672763.jpg",
    dob: "1974-11-11",
    tag: "Award winner",
  },
  {
    id: 68357,
    name: "Gal Gadot",
    image: "https://static.tvmaze.com/uploads/images/medium_portrait/118/295685.jpg",
    dob: "1985-04-30",
    tag: "Global star",
  },
];

const fallbackPoster =
  "https://yt3.googleusercontent.com/Z1scaDhrH194d4AygOpJhFzM-ViGyvGLXfB5hGsNNlBRerrx98x9Knszx9-VWizx5lMZPlECOrE=s120-c-k-c0x00ffffff-no-rj";

const SectionHeader = ({ eyebrow, title, copy }) => (
  <div className="mb-5 flex flex-col gap-2 sm:mb-6">
    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-red-500">
      {eyebrow}
    </p>
    <h3 className="text-2xl font-bold text-white sm:text-3xl">{title}</h3>
    <p className="max-w-2xl text-sm text-gray-400 sm:text-base">{copy}</p>
  </div>
);

const DefaultHome = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const [animes, setAnimes] = useState([]);

  useEffect(() => {
    const searchAnime = async () => {
      try {
        const animeResponse = await fetch("https://api.jikan.moe/v4/top/anime");
        const topAnime = await animeResponse.json();
        setAnimes(topAnime.data || []);
      } catch (error) {
        setAnimes([]);
      }
    };

    searchAnime();
  }, []);

  const rails = [
    {
      key: "popular",
      eyebrow: "Binge now",
      title: "Popular series to start with",
      copy: "A fast, scrollable lineup designed for thumbs first and still comfortable on larger screens.",
      items: movies,
      onClick: (item) => navigate(`/details/${username}/${item.id}`),
      getImage: (item) => item.image,
      getTitle: (item) => item.name,
      getMeta: (item) => item.premiered,
      getTag: (item) => item.tag,
    },
    {
      key: "anime",
      eyebrow: "Top anime",
      title: "Popular anime worth opening next",
      copy: "Featured titles with strong cover art and quick details access from the home experience.",
      items: animes.slice(0, 12),
      onClick: (item) => navigate(`/anime/${username}/${item.mal_id}`),
      getImage: (item) => item.images?.jpg?.large_image_url,
      getTitle: (item) => item.title,
      getMeta: (item) => item.aired?.string?.split(" to ")[0] || "Ongoing",
      getTag: (item) => item.score ? `${item.score} score` : "Fan favorite",
    },
    {
      key: "actors",
      eyebrow: "Faces to know",
      title: "Actors trending with viewers",
      copy: "A cleaner people rail with more readable cards and better mobile sizing.",
      items: actors,
      onClick: (item) => navigate(`/actor/${username}/${item.id}`),
      getImage: (item) => item.image,
      getTitle: (item) => item.name,
      getMeta: (item) => item.dob,
      getTag: (item) => item.tag,
    },
  ];

  return (
    <div className="relative w-screen bg-black">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 py-10 sm:px-5 sm:py-12 lg:gap-16 lg:px-8 lg:py-16">
        {rails.map((section) => (
          <section key={section.key}>
            <SectionHeader
              eyebrow={section.eyebrow}
              title={section.title}
              copy={section.copy}
            />

            <div className="flex gap-3 overflow-x-auto pb-2 sm:gap-4">
              {section.items.map((item) => (
                <article
                  key={item.id || item.mal_id}
                  onClick={() => section.onClick(item)}
                  className="group flex w-[11.5rem] shrink-0 cursor-pointer flex-col rounded-[24px] border border-white/8 bg-white/[0.03] p-2.5 transition hover:border-white/15 hover:bg-white/[0.05] sm:w-[13rem] lg:w-[15rem]"
                >
                  <div className="relative overflow-hidden rounded-[20px]">
                    <img
                      className="h-60 w-full object-cover transition duration-300 group-hover:scale-[1.03] sm:h-72 lg:h-80"
                      src={section.getImage(item) || fallbackPoster}
                      alt={section.getTitle(item)}
                      loading="lazy"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/85 to-transparent" />
                    <span className="absolute left-3 top-3 rounded-full bg-black/65 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                      {section.getTag(item)}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col gap-2 px-1 pb-1 pt-3">
                    <h4 className="line-clamp-2 text-base font-semibold text-white sm:text-lg">
                      {section.getTitle(item)}
                    </h4>
                    <p className="text-sm text-gray-400">{section.getMeta(item)}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default DefaultHome;
