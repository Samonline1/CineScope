import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import DefaultHome from './DefaultHome';
import Footer from './footer';
import Icon from '/src/assets/user.png'
import Sicon from '/src/assets/search.png'


const SmtvHome = () => {

  const [LoggedUser, setLoggedUser] = useState()
  const { username } = useParams();
  // const [searchBar, setSearchBar] = useState(false)
  // console.log(searchBar);

  // const [input, setInput] = useState()

  const UserInfo = useSelector((state) => state.note.users)

  useEffect(() => {
    const Userdetails = UserInfo.find((U) => U?.username?.includes(username))

    if (Userdetails) {
      setLoggedUser(Userdetails.name)
      console.log(Userdetails);

    }

  }, [UserInfo])

  const navigate = useNavigate();


  return (
    <div className='w-full h-full '>
      <div className='w-full h-full relative'>

        <div className='absolute flex w-full h-20 justify-between items-center px-10 lg:py-20 lg:px-30 sm:px-10 py-1 z-10 md:py-6 bg-gradient-to-b from-black to-transparent p-3 backdrop-blur-[1px] bg-gradient-to-b from-black/5 to-transparent '>



          <div>
            <img className="h-10 lg:h-[55px] lg:hidden" src="https://upload.wikimedia.org/wikipedia/commons/1/18/Netflix_2016_N_logo.svg" alt="" srcset="" />
            <svg
              className="h-7 lg:h-[35px] hidden lg:block"
              viewBox="0 0 111 30"
              height={"25px"}
              data-uia="netflix-logo"
              aria-hidden="true"
              focusable="false"
              fill="rgb(229,9,20)"
            >
              <g id="netflix-logo">
                <path
                  d="M105.06233,14.2806261 L110.999156,30 C109.249227,29.7497422 107.500234,29.4366857 105.718437,29.1554972 L102.374168,20.4686475 L98.9371075,28.4375293 C97.2499766,28.1563408 95.5928391,28.061674 93.9057081,27.8432843 L99.9372012,14.0931671 L94.4680851,-5.68434189e-14 L99.5313525,-5.68434189e-14 L102.593495,7.87421502 L105.874965,-5.68434189e-14 L110.999156,-5.68434189e-14 L105.06233,14.2806261 Z M90.4686475,-5.68434189e-14 L85.8749649,-5.68434189e-14 L85.8749649,27.2499766 C87.3746368,27.3437061 88.9371075,27.4055675 90.4686475,27.5930265 L90.4686475,-5.68434189e-14 Z M81.9055207,26.93692 C77.7186241,26.6557316 73.5307901,26.4064111 69.250164,26.3117443 L69.250164,-5.68434189e-14 L73.9366389,-5.68434189e-14 L73.9366389,21.8745899 C76.6248008,21.9373887 79.3120255,22.1557784 81.9055207,22.2804387 L81.9055207,26.93692 Z M64.2496954,10.6561065 L64.2496954,15.3435186 L57.8442216,15.3435186 L57.8442216,25.9996251 L53.2186709,25.9996251 L53.2186709,-5.68434189e-14 L66.3436123,-5.68434189e-14 L66.3436123,4.68741213 L57.8442216,4.68741213 L57.8442216,10.6561065 L64.2496954,10.6561065 Z M45.3435186,4.68741213 L45.3435186,26.2498828 C43.7810479,26.2498828 42.1876465,26.2498828 40.6561065,26.3117443 L40.6561065,4.68741213 L35.8121661,4.68741213 L35.8121661,-5.68434189e-14 L50.2183897,-5.68434189e-14 L50.2183897,4.68741213 L45.3435186,4.68741213 Z M30.749836,15.5928391 C28.687787,15.5928391 26.2498828,15.5928391 24.4999531,15.6875059 L24.4999531,22.6562939 C27.2499766,22.4678976 30,22.2495079 32.7809542,22.1557784 L32.7809542,26.6557316 L19.812541,27.6876933 L19.812541,-5.68434189e-14 L32.7809542,-5.68434189e-14 L32.7809542,4.68741213 L24.4999531,4.68741213 L24.4999531,10.9991564 C26.3126816,10.9991564 29.0936358,10.9054269 30.749836,10.9054269 L30.749836,15.5928391 Z M4.78114163,12.9684132 L4.78114163,29.3429562 C3.09401069,29.5313525 1.59340144,29.7497422 0,30 L0,-5.68434189e-14 L4.4690224,-5.68434189e-14 L10.562377,17.0315868 L10.562377,-5.68434189e-14 L15.2497891,-5.68434189e-14 L15.2497891,28.061674 C13.5935889,28.3437998 11.906458,28.4375293 10.1246602,28.6868498 L4.78114163,12.9684132 Z"
                  id="Fill-14"
                ></path>
              </g>
            </svg>
          </div>

          <div className='flex  justify-between w-[35%] items-center gap-2 '>

            {/* <button 
class="homebutton hidden sm:flex"
 onClick={()=> navigate(`/Smtv/${username}`)}>Home</button>

<button
class="homebutton hidden sm:flex "
onClick={()=> navigate(`/Smtv/${username}/search`)}>Search</button>

<button
class="homebutton hidden sm:flex"
 onClick={()=> navigate(`/Smtv/${username}/favorite`)}>Fav</button> */}

          </div>

          <div className="flex ml-4 gap-5 text-md items-center">
            <p className='text-xl text-gray-200 cursor-pointer'
              // onClick={()=> setSearchBar(true)}
              onClick={() => navigate(`/search/${username}`)}

            ><img className='h-8 w-8 rounded-[50%] bg-red-800' src={Sicon} alt="" srcset="" /></p>
            <div className='flex gap-2 items-center'
              onClick={() => navigate(`/search/${username}`)}
            >
              <p className='hidden sm:flex'
              >Hello, {LoggedUser}</p>
              <img className='h-8 w-8 rounded-[50%] bg-red-800' src={Icon} alt="" />

            </div>
            
          </div>
        </div>



        {/* <div className='flex overflow-x-auto scrollbar-hide '> */}
        <div class="w-screen h-full overflow-hidden ">


          {/* {searchBar && (
  
          <div className='flex justify-center items-center  absolute z-10 h-13 w-full mt-30 '>
            <div className='flex justify-start items-center w-[50%] gap-2 border border-[0.5px] border-gray-900 rounded-xl backdrop-blur-sm bg-black/2 rounded-xl'>
            <input className=' w-full outline-none focus:ring-0 h-full rounded-xl p-3 text-gray-200' type="text" placeholder='Search Movies, Shows, Anime and Actors' value={input} onChange={(e)=> setInput(e.target.value)} />
            <button className='flex w-14 items-center justify-center p-2 px-3 text-xl outline-none focus:ring-0' onClick={()=> navigate(`/search/${username}/${input}`)}>🔍︎</button>
          </div>
          </div>)
          } */}


          {/* <div class="scroll-animation flex w-screen gap-0  ">

            <img className="h-[702px] w-screen flex-shrink-0 object-cover block" src="https://occ-0-6245-2164.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABXxsD1pl2iFLCR_wYq31-s1nCmjtG0247mfCf5wrOhTJJBCHKitOzHntERYOE76-i-omH4g2bupItBiT5RrxcyjI3G1Jqqz_Sk2S.webp?r=f5f" />
           
            <img className="relative h-full w-full flex-shrink-0 object-cover block" src="https://occ-0-6245-2186.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABRbCg2vsb-hjON4OBvJRJQY1zn7M_dkQGnxK8zz1OJ01KVxQgge_CtM5eZ-H04evU9RxkYXqmPa7H0-xqtQKrdGhXjWvfCAwKz-t.webp?r=0dc" />

            <img className="h-[702px] w-full flex-shrink-0 object-cover" src="https://occ-0-6245-2186.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABaudtqamvNh8KcHWf3cktNN-66448zDt6baD8201rPkhv8EOrFFUKMcgwCS6aMHeBTreNbJP0u9PJ6S6EpblQ2j5D0N0zzzGbsys.webp?r=a7e" />

            <img className="h-[702px] w-full flex-shrink-0 object-cover" src="https://occ-0-6245-2186.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABfawhjCJoD-qEOq9OMqXz382-vPwuW3Hy6CUUPQuKqfUfZq4z_50jBnz7NwWVHFYLGVjSqbuw8MPoh2z6VfJyxtGHoJMoH6LzD_r.webp?r=4fd" />

            <img className="h-[702px] w-full flex-shrink-0 object-cover" src="https://occ-0-6245-2186.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABTFUb7eF66eBI9-QcgF7miSIruCKoL7yuIKoyCQzj-xMqEiH-xKY_k7XqPKKH3KN3JBuTMVt01qHpKf1XlD5hVZ4SKt-Qq1XehyQ.webp?r=178" />

           starsnger things  

        </div> */}



          <div class="scroll-animation flex w-screen gap-0">

            <div class="relative h-130 items-end sm:h-screen lg:h-[702px] w-screen flex-shrink-0"
              onClick={() => navigate(`/details/${username}/87140`)}

            >
              <img class="h-full w-full object-cover block" src="https://occ-0-6245-2164.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABXxsD1pl2iFLCR_wYq31-s1nCmjtG0247mfCf5wrOhTJJBCHKitOzHntERYOE76-i-omH4g2bupItBiT5RrxcyjI3G1Jqqz_Sk2S.webp?r=f5f" />
              <div class="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>

            <div class="relative h-130 sm:h-screen lg:h-[702px] w-screen flex-shrink-0"
              onClick={() => navigate(`/details/${username}/2993`)}>
              <img class="h-full w-full object-cover block" src="https://occ-0-6245-2186.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABXqhmOK-KBUzjOrk0iJ5gWgxMBnDHXjEiChZUCMhRxfsq-CBzrzlm4zjco7lRKJpuuMhL3i5mkSaZdwdjXpTgrllHr9Y1Pry8oXl.webp?r=608" />
              <div class="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>

            <div class="relative h-130 sm:h-screen lg:h-[702px] w-screen flex-shrink-0"
              onClick={() => navigate(`/details/${username}/50036`)}>
              <img class="h-full w-full object-cover" src="https://occ-0-6245-2186.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABaudtqamvNh8KcHWf3cktNN-66448zDt6baD8201rPkhv8EOrFFUKMcgwCS6aMHeBTreNbJP0u9PJ6S6EpblQ2j5D0N0zzzGbsys.webp?r=a7e" />
              <div class="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>

            <div class="relative h-130 sm:h-screen lg:h-[702px] w-screen flex-shrink-0"
              onClick={() => navigate(`/details/${username}/67252`)}>
              <img class="h-full w-full object-cover" src="https://m.media-amazon.com/images/S/pv-target-images/51c2c75da778c109ccc33ff293ff48f0cccc60b18c3fef8a42afe2a80e07acac._SX1920_FMwebp_.jpg" />
              <div class="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>

            <div class="relative h-130 sm:h-screen lg:h-[702px] w-screen flex-shrink-0"
              onClick={() => navigate(`/details/${username}/53647`)}>
              <img class="h-full w-full object-cover" src="https://occ-0-6245-2186.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABTFUb7eF66eBI9-QcgF7miSIruCKoL7yuIKoyCQzj-xMqEiH-xKY_k7XqPKKH3KN3JBuTMVt01qHpKf1XlD5hVZ4SKt-Qq1XehyQ.webp?r=178" />
              <div class="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-black/70 to-transparent">
                <img src="https://occ-0-6245-2186.1.nflxso.net/dnm/api/v6/S4oi7EPZbv2UEPaukW54OORa0S8/AAAABZyOthTbqP0lKDk4RMY_d_osHdCvHVA61Xt7-hBWI4TkHsbptPli42zFj8yRdJOHxcWwyHuHNd-xjPyKyjeUV5j30LHGsjuj.webp?r=5ff" alt="" srcSet="" />
                <img src="https://occ-0-6245-2186.1.nflxso.net/dnm/api/v6/S4oi7EPZbv2UEPaukW54OORa0S8/AAAABXG5gmlIhSDh9F5SdDQdBne7h4_X54BQqzS_bAwMmlgTD9uZTKR9pEl7h7UkRvMhwJ0_HwqYNaKLXgBh2g5sxbWzIp3Tn597sA.webp?r=d59" alt="" srcSet="" />    </div>
            </div>

          </div>



          {/* <div className='h-full w-screen'>
  <div className='flex w-full snap-x snap-mandatory '>
    <div className='h-screen w-screen bg-red-700 flex-shrink-0 snap-center box-ani   '>
        <img className="h-full w-full flex-shrink-0 object-cover" src="https://occ-0-6245-2164.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABXxsD1pl2iFLCR_wYq31-s1nCmjtG0247mfCf5wrOhTJJBCHKitOzHntERYOE76-i-omH4g2bupItBiT5RrxcyjI3G1Jqqz_Sk2S.webp?r=f5f"/> 
    </div>
    <div className='h-170 w-full bg-green-700 flex-shrink-0 box-ani '></div>
    <div className='h-170 w-full bg-blue-700 flex-shrink-0 box-ani '></div>
    <div className='h-170 w-full bg-yellow-700 flex-shrink-0 box-ani '></div>
  </div>
</div> */}

        </div>
      </div>

      {/* <DefaultHome />

      <Footer /> */}
    </div>
  )
}

export default SmtvHome





