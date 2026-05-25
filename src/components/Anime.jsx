import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Anime = () => {
    const { id, username } = useParams();
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [Cast, setCast] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null); // ✅ fixed hover state

    const navigate = useNavigate();

    const Videos = [
        { id: "87140", VideoId: "J-0f7teDD2I" },
        { id: "2993", VideoId: "l5OAxkuq850" },
        { id: "50036", VideoId: "_8p6YkEPVco" },
        { id: "67252", VideoId: "LOJCCsBdtVs" },
        { id: "53647", VideoId: "03u4xyj0TH4" },
        { id: "169", VideoId: "2gTC4uWP3_Y" },
        { id: "44778", VideoId: "YN2H_sKcmGw" },
    ];

    const checkVid = Videos.find((vid) => vid.id === id);

    useEffect(() => {
        async function showDetails() {
            try {
                // Anime Details
                const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
                const data = await res.json();
                setDetails(data.data || null);

                // Cast Info
                const castRes = await fetch(
                    `https://api.jikan.moe/v4/anime/${id}/characters`
                );
                const castData = await castRes.json();

                const parsedCast = castData.data.map((item) => ({
                    character: item.character,
                    actor:
                        item.voice_actors?.find((va) => va.language === "Japanese") ||
                        item.voice_actors[0],
                }));

                setCast(parsedCast);
            } catch (error) {
                console.error("Error loading anime:", error);
            } finally {
                setLoading(false);
            }
        }

        showDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
                <div className="absolute inset-0 bg-white/[0.04] animate-pulse" />

                <div className="relative flex min-h-screen flex-col justify-center gap-5 space-y-3 bg-black/60 p-5 backdrop-blur-[2px] lg:gap-6 lg:p-15">
                    <div className="h-53 w-40 rounded bg-white/8 animate-pulse lg:h-80 lg:w-55" />

                    <div className="h-10 w-56 rounded bg-white/10 animate-pulse lg:w-80" />
                    <div className="h-5 w-36 rounded bg-white/10 animate-pulse lg:w-52" />

                    <div className="grid w-full grid-cols-2 gap-3 border-b border-gray-500 pb-5 lg:flex lg:flex-wrap lg:gap-5 lg:border-none">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div
                                key={`anime-meta-skeleton-${index}`}
                                className="h-5 rounded bg-white/10 animate-pulse"
                                style={{ width: index % 2 === 0 ? "5.5rem" : "7.5rem" }}
                            />
                        ))}
                    </div>

                    <div className="flex max-w-5xl flex-col gap-3">
                        <div className="h-4 w-full rounded bg-white/10 animate-pulse" />
                        <div className="h-4 w-full rounded bg-white/10 animate-pulse" />
                        <div className="h-4 w-4/5 rounded bg-white/10 animate-pulse" />
                    </div>

                    <div className="relative h-full w-full">
                        <div className="mb-5 h-8 w-24 rounded bg-white/10 animate-pulse" />

                        <div className="flex w-full gap-5 overflow-hidden">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <div
                                    key={`anime-cast-skeleton-${index}`}
                                    className="flex h-60 w-50 shrink-0 flex-col items-center gap-2"
                                >
                                    <div className="h-30 w-30 rounded-full bg-white/8 animate-pulse lg:h-40 lg:w-40" />
                                    <div className="h-4 w-24 rounded bg-white/10 animate-pulse lg:h-5 lg:w-32" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!details) {
        return (
            <p className="flex justify-center items-center w-screen h-screen bg-black text-white">
                Anime not found!
            </p>
        );
    }

    return (
        <div className="relative h-full w-screen bg-black">
            <div className="h-full w-full">
                {checkVid ? (
                    <iframe
                        className="absolute top-1/2 left-1/2 w-[190.78%] h-[177.78%] sm:h-[150%] sm:w-[500%] -translate-x-1/2 -translate-y-1/2"
                        src={`https://www.youtube.com/embed/${details.trailer.youtube_id}?autoplay=1&mute=1&loop=1&playlist=${details.trailer.youtube_id}&controls=0&modestbranding=1&showinfo=0`}
                        allow="autoplay; fullscreen; encrypted-media"
                        title="Anime Trailer"
                    />
                ) : (
                    <img
                        className="absolute h-full w-400 object-cover inset-0 object-center"
                        src={details.images?.webp?.large_image_url}
                        alt="Anime Background"
                    />
                )}
            </div>

            <div className="relative flex flex-col justify-center z-10 gap-5 space-y-3 h-full w-screen text-white bg-black/60 p-5 lg:p-15 backdrop-blur-[2px]">

                <div className="lg:h-80 lg:w-55 w-40 h-53 bg-red-700">
                    <img
                        className="h-full w-full justify-end object-cover"
                        src={details.images?.jpg?.large_image_url}
                        alt={details.title}
                        loading="lazy"
                    />
                </div>

                <h1 className="text-3xl lg:text-4xl font-bold">{details.title}</h1>
                <p>
                    {details.type || "Type N/A"} {details.rating}
                </p>

                <div className="lg:flex grid grid-cols-4 gap-3 lg:gap-5 w-full lg:border-none border-b pb-5 border-gray-500">
                    <p>★ {details.score || "Not rated"}</p>
                    <p>{details.genres?.[1]?.name}</p>
                    <p>{details.studios?.[0]?.name || "Studio: N/A"}</p>
                    <p>{details.duration || "Runtime: N/A"}</p>
                    <p>{details.status}</p>
                    <p>{details.aired?.prop?.from?.year || "Premiered: N/A"}</p>
                </div>

                <div className="text-sm max-w-5xl">{details.synopsis}</div>

                <div className="items-start h-full w-full relative">
                    <p className="font-bold text-2xl mb-5">Cast</p>

                    <div className="flex items-start w-screen gap-5 overflow-x-auto overflow-y-hidden scrollbar-hide">
                        {Cast.map((cast, index) => (
                            <div
                                key={`${cast.character.mal_id}-${index}`}
                                className="flex flex-col items-center gap-2 h-60 w-50"
                            >
                                <div className="lg:h-40 lg:w-40 h-30 w-30">
                                    <img
                                        className="w-full h-full object-cover object-top rounded-[50%] bg-red-700"
                                        src={
                                            hoveredIndex === index
                                                ? cast.character?.images?.jpg?.image_url
                                                : cast.actor?.person?.images?.jpg?.image_url
                                        }
                                        alt="Character / Actor"
                                        loading="lazy"
                                        onMouseEnter={() => setHoveredIndex(index)}
                                        onMouseLeave={() => setHoveredIndex(null)}
                                    />
                                </div>

                                <p
                                    className="font-bold text-sm lg:text-lg"
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    {hoveredIndex === index
                                        ? cast.character?.name
                                        : cast.actor?.person?.name || "N/A"}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Anime;
