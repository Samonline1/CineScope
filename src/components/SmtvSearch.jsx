import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { IoIosHeart } from "react-icons/io";
import { addFav, deleteFav } from "../redux/featureSlice";
import SearchHero from "./SearchHero";

const fallbackPoster =
  "https://yt3.googleusercontent.com/Z1scaDhrH194d4AygOpJhFzM-ViGyvGLXfB5hGsNNlBRerrx98x9Knszx9-VWizx5lMZPlECOrE=s120-c-k-c0x00ffffff-no-rj";

const SectionSkeletonHeading = () => (
  <div className="flex items-center gap-3">
    <div className="h-px flex-1 bg-red-700" />
    <div className="h-10 w-32 rounded-xl border border-red-700 bg-white/5 animate-pulse" />
    <div className="h-px flex-1 bg-red-700" />
  </div>
);

const SmtvSearch = () => {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [actors, setActors] = useState([]);
  const [animes, setAnime] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

  const { username, keyword } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const movieRef = useRef(null);
  const actorRef = useRef(null);
  const animeRef = useRef(null);
  const userInfo = useSelector((state) => state.note.users);
  const loggedInUser = userInfo.find((user) => user.username === username);
  const favorites = loggedInUser?.favorites || [];
  const searchType = searchParams.get("type") || "All";
  const hasResults = movies.length > 0 || actors.length > 0 || animes.length > 0;
  const showHeroHome = !search.trim() && !hasResults && !errorMsg;

  useEffect(() => {
    if (keyword && keyword.trim() !== "") {
      setSearch(keyword);
    }
  }, [keyword]);

  useEffect(() => {
    if (!keyword || keyword.trim() === "") {
      return;
    }

    searchMovies(keyword);
  }, [keyword, searchType]);

  const scrollToSection = (sectionRef) => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const resetResults = () => {
    setMovies([]);
    setActors([]);
    setAnime([]);
  };

  const searchMovies = async (forcedSearch) => {
    const activeSearch = (forcedSearch ?? search).trim();

    try {
      setLoading(true);
      if (!activeSearch) {
        resetResults();
        setErrorMsg(false);
        return;
      }

      setErrorMsg(false);

      if (searchType === "All") {
        const showResponse = await fetch(`https://api.tvmaze.com/search/shows?q=${activeSearch}`);
        const showData = await showResponse.json();

        const actorResponse = await fetch(`https://api.tvmaze.com/search/people?q=${activeSearch}`);
        const actorData = await actorResponse.json();

        const animeResponse = await fetch(`https://api.jikan.moe/v4/anime?q=${activeSearch}`);
        const animeData = await animeResponse.json();

        if (showData.length || actorData.length || animeData?.data?.length) {
          setMovies(showData || []);
          setActors(actorData || []);
          setAnime(animeData.data || []);
          toast.success("Search results loaded!", { autoClose: 1000 });
        } else {
          resetResults();
          setErrorMsg(true);
          toast.error(`No results found for "${activeSearch}"`);
        }
      } else if (searchType === "Content") {
        const response = await fetch(`https://api.tvmaze.com/search/shows?q=${activeSearch}`);
        const data = await response.json();
        setMovies(data || []);
        setActors([]);
        setAnime([]);
        setErrorMsg(!data.length);
        if (data.length) {
          toast.success("Content found!", { autoClose: 1000 });
        }
      } else if (searchType === "Actors") {
        const response = await fetch(`https://api.tvmaze.com/search/people?q=${activeSearch}`);
        const data = await response.json();
        setMovies([]);
        setActors(data || []);
        setAnime([]);
        setErrorMsg(!data.length);
        if (data.length) {
          toast.success("Actors found!", { autoClose: 1000 });
        }
      } else if (searchType === "Anime") {
        const response = await fetch(`https://api.jikan.moe/v4/anime?q=${activeSearch}`);
        const data = await response.json();
        setMovies([]);
        setActors([]);
        setAnime(data.data || []);
        setErrorMsg(!data?.data?.length);
        if (data?.data?.length) {
          toast.success("Anime found!", { autoClose: 1000 });
        }
      }
    } catch (error) {
      toast.error("Failed to fetch search results. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const openMovieDetails = (movieId) => {
    navigate(`/details/${username}/${movieId}`);
    resetResults();
  };

  const openActorDetails = (actorId) => {
    navigate(`/actor/${username}/${actorId}`);
    resetResults();
  };

  const openAnimeDetails = (animeId) => {
    navigate(`/anime/${username}/${animeId}`);
    resetResults();
  };

  const setFavorite = (favoriteId) => {
    const existingFavorite = favorites.findIndex((item) => item.id === favoriteId);

    if (existingFavorite >= 0) {
      dispatch(deleteFav({ username, favId: favoriteId }));
      toast.info("Removed from favorites", { autoClose: 1000 });
      return;
    }

    const addFavorite = async () => {
      try {
        const favoriteResponse = await fetch(`https://api.tvmaze.com/shows/${favoriteId}`);
        const favoriteData = await favoriteResponse.json();

        const favoriteItem = {
          id: favoriteData.id,
          name: favoriteData.name,
          img: favoriteData.image?.medium,
          type: favoriteData.type,
          genres: favoriteData.genres.join(", "),
          rating: favoriteData.rating?.average || "N/A",
          year: favoriteData.premiered,
        };

        dispatch(addFav({ username, favorite: favoriteItem }));
        toast.success("Added to favorites!", { autoClose: 1000 });
      } catch (error) {
        toast.error("Failed to add to favorites");
      }
    };

    addFavorite();
  };

  if (loading) {
    return (
      <div className="w-full bg-black text-white">
        <div className="sticky top-[-5px] border-y border-white/10 bg-black/80 px-4 py-3 backdrop-blur-md">
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500 sm:gap-8">
            <div className="h-4 w-16 animate-pulse rounded bg-white/10" />
            <div className="h-4 w-14 animate-pulse rounded bg-white/10" />
            <div className="h-4 w-14 animate-pulse rounded bg-white/10" />
          </div>
        </div>

        <section className="mx-auto mt-5 w-full max-w-7xl px-4 sm:px-5 lg:px-8">
          {(searchType === "All" || searchType === "Content") && (
            <>
              <SectionSkeletonHeading />
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5">
                {Array.from({ length: 10 }).map((_, index) => (
                  <div key={`movie-skeleton-${index}`} className="flex flex-col overflow-hidden">
                    <div className="h-60 cursor-pointer rounded-xl bg-white/8 animate-pulse sm:h-72 lg:h-80" />

                    <div className="mt-3 flex flex-col gap-2">
                      <div className="h-5 w-4/5 rounded bg-white/10 animate-pulse" />
                      <div className="flex items-center justify-between gap-3 text-sm text-gray-400">
                        <div className="h-4 w-14 rounded bg-white/10 animate-pulse" />
                        <div className="h-4 w-16 rounded bg-white/10 animate-pulse" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {(searchType === "All" || searchType === "Anime") && (
            <div className={searchType === "All" ? "mt-16" : ""}>
              <SectionSkeletonHeading />
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5">
                {Array.from({ length: 10 }).map((_, index) => (
                  <div key={`anime-skeleton-${index}`} className="flex flex-col overflow-hidden">
                    <div className="h-60 rounded-xl bg-white/8 animate-pulse sm:h-72 lg:h-80" />

                    <div className="mt-3 flex flex-col gap-2">
                      <div className="h-5 w-4/5 rounded bg-white/10 animate-pulse" />
                      <div className="flex items-center justify-between gap-3 text-sm text-gray-400">
                        <div className="h-4 w-14 rounded bg-white/10 animate-pulse" />
                        <div className="h-4 w-16 rounded bg-white/10 animate-pulse" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(searchType === "All" || searchType === "Actors") && (
            <div className={searchType === "All" ? "mt-16" : ""}>
              <SectionSkeletonHeading />
              <div className="mt-8 grid gap-4 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={`actor-skeleton-${index}`}
                    className="flex gap-4 rounded-2xl border border-red-700/50 bg-white/[0.03] p-3"
                  >
                    <div className="h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-white/8 animate-pulse sm:h-32 sm:w-28" />

                    <div className="flex flex-col justify-center">
                      <div className="h-6 w-32 rounded bg-white/10 animate-pulse sm:h-7 sm:w-40" />
                      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                        <div className="h-4 w-16 rounded bg-white/10 animate-pulse" />
                        <div className="h-4 w-20 rounded bg-white/10 animate-pulse" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden bg-black text-white">
      <ToastContainer position="top-right" />

      {hasResults && (
        <div className="sticky top-[-5px] border-y border-white/10 bg-black/80 px-4 py-3 backdrop-blur-md">
          <div className=" flex max-w-5xl items-center justify-center gap-4 text-sm text-gray-300 sm:gap-8">
            {movies.length > 0 && <button onClick={() => scrollToSection(movieRef)}>Movies</button>}
            {animes.length > 0 && <button onClick={() => scrollToSection(animeRef)}>Anime</button>}
            {actors.length > 0 && <button onClick={() => scrollToSection(actorRef)}>Actors</button>}
          </div>
        </div>
      )}

      {showHeroHome && <SearchHero onOpenDetails={openMovieDetails} />}

      

      {movies.length > 0 && (
        <section ref={movieRef} className="mx-auto w-full mt-5 max-w-7xl px-4 sm:px-5 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-red-700" />
            <p className="rounded-xl border border-red-700 bg-black px-4 py-1 text-lg font-bold sm:text-2xl">
              Movies
            </p>
            <div className="h-px flex-1 bg-red-700" />
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5">
            {movies.map((movie) => (
              <div key={movie.show?.id} className="flex flex-col overflow-hidden">
                <div className="h-60 cursor-pointer sm:h-72 lg:h-80">
                  <img
                    onClick={() => openMovieDetails(movie.show?.id)}
                    className="h-full w-full rounded-xl object-cover"
                    src={movie.show?.image?.medium || fallbackPoster}
                    alt={movie.show?.name || "Movie"}
                    loading="lazy"
                  />
                </div>

                <div className="mt-3 flex flex-col gap-2">
                  <p className="font-semibold">{movie.show?.name}</p>
                  <div className="flex items-center justify-between gap-3 text-sm text-gray-400">
                    <p>{movie.show?.premiered ? new Date(movie.show.premiered).getFullYear() : "N/A"}</p>
                    <div className="flex items-center gap-3">
                      <p>{movie.show?.rating?.average || "N/A"} star</p>
                      <button
                        type="button"
                        className={favorites.some((item) => item.id === movie.show?.id) ? "text-xl text-red-500" : "text-2xl"}
                        onClick={(event) => {
                          event.stopPropagation();
                          setFavorite(movie.show?.id);
                        }}
                      >
                        {favorites.some((item) => item.id === movie.show?.id) ? <IoIosHeart /> : "♡"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {animes.length > 0 && (
        <section ref={animeRef} className="mx-auto mt-16 w-full max-w-7xl px-4 sm:px-5 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-red-700" />
            <p className="rounded-xl border border-red-700 bg-black px-4 py-1 text-lg font-bold sm:text-2xl">
              Anime
            </p>
            <div className="h-px flex-1 bg-red-700" />
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5">
            {animes.map((anime) => (
              <div
                key={anime.mal_id}
                onClick={() => openAnimeDetails(anime.mal_id)}
                className="flex cursor-pointer flex-col overflow-hidden"
              >
                <div className="h-60 sm:h-72 lg:h-80">
                  <img
                    className="h-full w-full rounded-xl object-cover"
                    src={anime.images?.jpg?.image_url || fallbackPoster}
                    alt={anime.title || "Anime"}
                    loading="lazy"
                  />
                </div>

                <div className="mt-3 flex flex-col gap-2">
                  <p className="font-semibold">{anime.title}</p>
                  <div className="flex items-center justify-between gap-3 text-sm text-gray-400">
                    <p>{anime.aired?.from ? new Date(anime.aired.from).getFullYear() : "N/A"}</p>
                    <div className="flex items-center gap-3">
                      <p>{anime.score || "N/A"} star</p>
                      <button
                        type="button"
                        className={favorites.some((item) => item.id === anime.mal_id) ? "text-xl text-red-500" : "text-2xl"}
                        onClick={(event) => {
                          event.stopPropagation();
                          setFavorite(anime.mal_id);
                        }}
                      >
                        {favorites.some((item) => item.id === anime.mal_id) ? <IoIosHeart /> : "♡"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {actors.length > 0 && (
        <section ref={actorRef} className="mx-auto mt-16 w-full max-w-7xl px-4 pb-10 sm:px-5 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-red-700" />
            <p className="rounded-xl border border-red-700 bg-black px-4 py-1 text-lg font-bold sm:text-2xl">
              Actors
            </p>
            <div className="h-px flex-1 bg-red-700" />
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {actors.map((actor) => (
              <div
                key={actor.person?.id}
                onClick={() => openActorDetails(actor.person?.id)}
                className="flex cursor-pointer gap-4 rounded-2xl border border-red-700/50 bg-white/[0.03] p-3"
              >
                <div className="h-28 w-24 shrink-0 overflow-hidden rounded-xl sm:h-32 sm:w-28">
                  <img
                    className="h-full w-full object-cover object-top"
                    src={actor.person?.image?.medium || fallbackPoster}
                    alt={actor.person?.name || "Actor"}
                    loading="lazy"
                  />
                </div>

                <div className="flex flex-col justify-center">
                  <p className="text-xl font-bold sm:text-2xl">{actor.person?.name}</p>
                  <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm text-gray-400 sm:text-base">
                    <p>{actor.person?.gender || "N/A"}</p>
                    <p>{actor.person?.birthday || "N/A"}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {errorMsg && !hasResults && (
        <div className="mx-auto flex w-full max-w-xl flex-col items-center px-4 pb-14 pt-10 text-center">
          <div className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-8 shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-red-500">
              No Match
            </p>
            <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl">
              Nothing found for "{search}"
            </h3>
            <p className="mt-2 text-sm text-gray-400 sm:text-base">
              Try another title, change the type, or search with fewer words.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmtvSearch;
