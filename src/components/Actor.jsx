import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Footer from './footer';
import { toast, ToastContainer } from 'react-toastify';



const Actor = () => {

  const [actor, setActor] = useState();

  const { id, username } = useParams();
  console.log(id);
  
  const navigate = useNavigate();

  useEffect(() => {
    async function showActor() {

      try {
        
        const res = await fetch(`https://api.tvmaze.com/people/${id}`)
        const data = await res.json()
        // console.log(data.image.medium)
        console.log(data)

        // const name = data.name.charAt(0);
        const name = data.name?.split(" ")[0] ;

        const URL = await fetch(
          `https://api.tvmaze.com/search/people?q=${name}`
        );
        const SimilarActors = await URL.json();
        console.log(SimilarActors);


        const casto = await fetch(`https://api.tvmaze.com/people/${id}/castcredits?embed=show`)
        const castores = await casto.json()
        // console.log(castores[0]._links.show || "hgh")
        // console.log(castores[0]._embedded.show)

        const crew = await fetch(`https://api.tvmaze.com/people/${id}/crewcredits?embed=show`)
        const crewData = await crew.json()
        console.log(crewData || "hhthtfh");


        //  const guestCredits = await fetch(`https://api.tvmaze.com/people/${id}/guestcastcredits?embed=show`)
        //  const guestData = await guestCredits.json()


        setActor({
          data: data || null,
          similiar: SimilarActors || null,
          cast: castores.length > 0 ? castores[0]._embedded.show : null,
          crew: crewData || null,
          //  guest: guestData || null,

        })

      } catch (error) {
        console.log("Error fetching details...")
        setActor("kodjiedj")
      }
    }

    showActor()



  }, [id])

  if (!actor) return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      <div className="flex flex-col px-5 py-8 lg:gap-10 lg:px-20 lg:py-12">
        <div className="flex h-full w-full rounded-xl pt-10 lg:h-90">
          <div className="h-60 w-70 rounded-xl bg-white/8 animate-pulse lg:h-full lg:w-60" />
          <div className="flex w-full flex-col justify-end gap-3 p-5">
            <div className="h-10 w-48 rounded bg-white/10 animate-pulse lg:h-20 lg:w-96" />
            <div className="h-6 w-32 rounded bg-white/10 animate-pulse lg:h-8 lg:w-48" />
            <div className="h-6 w-24 rounded bg-white/10 animate-pulse lg:h-8 lg:w-36" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 px-10 py-10 lg:px-20">
        <div className="flex h-15 w-full items-center">
          <div className="h-15 w-2 bg-red-700" />
          <div className="ml-5 h-8 w-28 rounded bg-white/10 animate-pulse" />
        </div>

        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={`actor-overview-skeleton-${index}`}
              className="h-7 rounded bg-white/10 animate-pulse"
              style={{ width: index % 2 === 0 ? "14rem" : "12rem" }}
            />
          ))}
        </div>
      </div>

      <div className="flex h-full w-full justify-center gap-5 px-10 py-10 lg:px-20">
        <div className="flex w-full gap-5 overflow-hidden">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={`similar-actor-skeleton-${index}`} className="w-50 shrink-0 lg:w-60">
              <div className="h-60 w-40 rounded-xl bg-white/8 animate-pulse lg:h-80 lg:w-60" />
              <div className="mt-3 h-5 w-28 rounded bg-white/10 animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )

  // Only log if similiar exists and has at least one item
  if (actor?.similiar && Array.isArray(actor.similiar) && actor.similiar.length > 0 && actor.similiar[0]?.person?.name) {
    console.log(actor.similiar[0].person.name);
  }

  return (
    <div className='relative h-full w-screen bg-black'>
      <ToastContainer position="top-right" />

      <div className='flex flex-col px-5 py-8 lg:gap-10 lg:px-20 lg:py-12'>

        <div className='flex h-full lg:h-90 w-full rounded-xl pt-10'>
          <div key={actor?.data?.id || 'no-id'} className='flex lg:w-80 w-70 lg:h-full h-60 lg:w-60 rounded-xl'>
            <img
              className='flex object-cover object-top items-center w-full rounded-xl'
              src={actor?.data?.image?.medium || actor?.data?.image?.original || "https://yt3.googleusercontent.com/Z1scaDhrH194d4AygOpJhFzM-ViGyvGLXfB5hGsNNlBRerrx98x9Knszx9-VWizx5lMZPlECOrE=s120-c-k-c0x00ffffff-no-rj"}
              alt={actor?.data?.name || "No image"}
              loading="lazy"
            />
          </div>
          <div className='flex flex-col p-5 w-full justify-end gap-1'>
            <p className='font-bold text-3xl lg:text-[80px]'>{actor?.data?.name || "Unknown"}</p>
            <div className='text-xl lg:text-2xl text-gray-400'>
              <p>{actor?.cast?.name || "N/A"}</p>
              <p>{actor?.data?.gender || "N/A"}</p>
            </div>
          </div>
        </div>

      </div>

      <div className='flex flex-col px-10 lg:px-20 py-10 gap-5'>
        <div className='h-full w-full'>
          <div className='flex bg-red-700 w-2 h-15 '> <h1 className=' flex items-center p-2 ml-5 font-bold'>Overview</h1></div>
        </div>

        <div className='text-2xl space-y-2'>
          <p> <b>Born </b>: {actor.data?.birthday || "N/A"}</p>
          <p><b>Country</b> : {actor.data?.country?.name || "N/A"}</p>
          <p> <b>Death Day </b>: {actor.data?.deathday || "N/A"}</p>
          <p> <b>Gender </b>: {actor.data?.gender || "N/A"}</p>
        </div>
      </div>

      <div className='flex justify-center h-full w-full px-10 lg:px-20 py-10 gap-5'>
        <div className='flex w-full h-full gap-5 overflow-x-auto overflow-y-hidden scrollbar-hide'>
          {actor?.similiar && Array.isArray(actor.similiar) && actor.similiar.length > 1 ? (
            actor.similiar.slice(1).map((a, idx) => {
              const imgSrc = a?.person?.image?.medium || a?.person?.image?.original || "https://yt3.googleusercontent.com/Z1scaDhrH194d4AygOpJhFzM-ViGyvGLXfB5hGsNNlBRerrx98x9Knszx9-VWizx5lMZPlECOrE=s120-c-k-c0x00ffffff-no-rj";
              return (
                <div
                  onClick={() => {
                    toast.error("Loading actor details...", { autoClose: 1000 });
                    navigate(`/actor/${username}/${a?.person?.id}`);
                  }}
                  className='h-full w-50 lg:w-60' key={a?.person?.id || idx}>
                  <div className="relative h-60 w-40 lg:h-80 lg:w-60 items-center justify-center">
                    <img className="object-cover object-top w-full h-full rounded-xl h-full"
                      src={imgSrc}
                      alt={a?.person?.name || "No image"}
                      loading="lazy" />
                    <div className="absolute bottom-0 w-full h-25 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                      <p className='font-bold absolute bottom-4 left-4'>{a?.person?.name || "Unknown"}</p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : <div className='text-center w-full py-10 text-gray-400'>Not available</div>}
        </div>

      </div>

      <Footer />
    </div>

  )
}

export default Actor
