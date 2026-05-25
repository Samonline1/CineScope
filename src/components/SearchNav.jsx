import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { FaHeart, FaSearch } from "react-icons/fa";
import { RiClapperboardAiFill } from "react-icons/ri";

import Icon from "/src/assets/user.png";

const SearchNav = () => {
  const [input, setInput] = useState("");
  const [loggedUser, setLoggedUser] = useState("");
  const [searchType, setSearchType] = useState("All");

  const navigate = useNavigate();
  const { username, keyword } = useParams();
  const [searchParams] = useSearchParams();
  const userInfo = useSelector((state) => state.note.users);

  useEffect(() => {
    const userDetails = userInfo.find((user) =>
      user?.username?.includes(username),
    );
    if (userDetails) {
      setLoggedUser(userDetails.name);
    }
  }, [userInfo, username]);

  useEffect(() => {
    setInput(keyword || "");
  }, [keyword]);

  useEffect(() => {
    setSearchType(searchParams.get("type") || "All");
  }, [searchParams]);

  const handleSearch = (event) => {
    event.preventDefault();

    const trimmedInput = input.trim();
    if (!trimmedInput) {
      navigate(`/search/${username}`);
      return;
    }

    const params = new URLSearchParams();
    if (searchType && searchType !== "All") {
      params.set("type", searchType);
    }

    const queryString = params.toString();
    navigate(
      `/search/${username}/${trimmedInput}${queryString ? `?${queryString}` : ""}`,
    );
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/88 backdrop-blur-xl p-2">
      <div className=" mx-auto flex w-full max-w-7xl items-center gap-2 px-3 py-2 sm:gap-3 sm:px-4 lg:px-8">
        <button
          type="button"
          onClick={() => navigate(`/search/${username}`)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-red-500 transition hover:scale-[1.03] hover:text-red-400 sm:h-11 sm:w-11"
          aria-label="Go to search home"
        >
          <RiClapperboardAiFill className="text-[2.35rem]" />

        </button>

        <form
          onSubmit={handleSearch}
          className="flex min-w-0 flex-1 items-center gap-2 rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.24)]"
        >
          <select
            value={searchType}
            onChange={(event) => setSearchType(event.target.value)}
            className="hidden h-10 w-[5.5rem] shrink-0 rounded-xl border border-white/10 bg-black/45 px-2.5 text-sm font-medium text-white outline-none sm:block"
          >
            <option className="bg-black" value="All">
              All
            </option>
            <option className="bg-black" value="Anime">
              Anime
            </option>
            <option className="bg-black" value="Content">
              Movie
            </option>
            <option className="bg-black" value="Actors">
              Actor
            </option>
          </select>

          <div className="flex h-10 min-w-0 flex-1 items-center rounded-xl border border-white/8 bg-black/35 px-3">
            <input
              className="h-full w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
              type="text"
              placeholder="Search"
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
          </div>

          <button
            type="submit"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-500/30 bg-red-600 text-white transition hover:bg-red-500"
            aria-label="Search"
          >
            <FaSearch />
          </button>
        </form>

        <button
          type="button"
          onClick={() => navigate(`/favorites/${username}`)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] p-2 text-sm text-white transition hover:bg-white/[0.1]"
          aria-label="Open favorites"
        >
          <FaHeart />
        </button>

        <button
          type="button"
          onClick={() => navigate(`/profile/${username}`)}
          className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.05] p-[2px] transition hover:bg-white/[0.1]"
          aria-label={
            loggedUser ? `Open ${loggedUser} profile` : "Open profile"
          }
        >
          <img
            className="h-full w-full rounded-[10px] object-cover"
            src={Icon}
            alt={`${loggedUser || username} profile`}
            loading="lazy"
          />
        </button>
      </div>
    </header>
  );
};

export default SearchNav;
