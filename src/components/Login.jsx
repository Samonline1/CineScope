import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { registerUser } from '../redux/featureSlice';

import { toast } from 'react-toastify'


const Login = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();


    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [searchParams] = useSearchParams();
    const action = searchParams.get("action");

    const UserData = useSelector((state) => state.note.users)
    // console.log(UserData);





    function submitNow(e) {
        console.log("S1");
        
        e.preventDefault() // details will stay cause page will not reload 

        if (!password || password.length < 8) {
            toast.error("Password too short — minimum 8 characters")
            return
        }

     console.log("S2");


        // Check for uppercase
        if (!/[A-Z]/.test(password)) {
            toast.error("Include at least one uppercase letter (A-Z)")
            return
        }

        // Check for lowercase
        if (!/[a-z]/.test(password)) {
            toast.error("Include at least one lowercase letter (a-z)")
            return
        }

        // Check for number
        if (!/[0-9]/.test(password)) {
            toast.error("Include at least one number (0-9)")
            return
        }

        // Check for special character
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            toast.error("Include at least one special character (!, @, #, etc.)")
            return
        }



        if (action === "signup") {
                 console.log("S3-signup");

            const registerUserData = {
                name: name,
                email: email,
                password: password,
                username: `${name || "guest"}SMTV${Date.now().toString(36)}`,
                favorites: []

            }
            dispatch(registerUser(registerUserData));
            navigate(`/search/${registerUserData.username}`)
        } else {
                 console.log("S3-login");


            const registerUserData = {
                email: email,
                password: password,
            }
            const emailExist = UserData.find((U) =>
                U?.email?.toLowerCase().includes(registerUserData.email.toLowerCase()))
            console.log(emailExist);

            const passMatch = UserData.some((U) =>
                U?.password?.toLowerCase().includes(registerUserData.password.toLowerCase()))


            if (emailExist && passMatch) {
                toast.success(`Welcome back ${emailExist.username}`, { autoClose: 1000 })
                navigate(`/search/${emailExist.username}`)
                console.log("hello bhai !");

            } else {
                toast.error('Invalid email or password')
            }
        }

        console.log("")



    }

    return (
        <div className=' w-screen h-full text-white'>
            <div className='relative w-full h-full p-5
        bg-cover bg-center bg-[url("https://assets.nflxext.com/ffe/siteui/vlv3/dc1cf82d-97c9-409f-b7c8-6ac1718946d6/14a8fe85-b6f4-4c06-8eaf-eccf3276d557/IN-en-20230911-popsignuptwoweeks-perspective_alpha_website_small.jpg"))] 
'>
                <div className="absolute inset-0 z-0 bg-[linear-gradient(160deg,rgba(0,0,0,0.9)_16%,rgba(0,0,0,0.89)_10.83%,rgba(0,0,0,0.8861)_5.67%,rgba(0,0,0,0.8688)_10.5%,rgba(0,0,0,0.8444)_15.33%,rgba(0,0,0,0.8132)_15.17%,rgba(0,0,0,0.775)_10%,rgba(0,0,0,0.7368)_10.83%,rgba(0,0,0,0.7056)_16.67%,rgba(0,0,0,0.6812)_19.5%,rgba(0,0,0,0.6639)_24.33%,rgba(0,0,0,0.6535)_19.17%,rgba(0,0,0,0.65)_10%)]"
                ></div>

                <div className='relative sm:px-10 lg:px-30 py-5'>


                    <svg className='lg:h-[40px]'
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





                <div className=' flex relative justify-center py-10  '>

                    <div className='h-full w-120 p-15 space-y-2 bg-black'>
                        <h2 className='text-3xl font-bold'>
                            {action?.toLowerCase() === "login" ? "Sign In" : "Sign Up"}
                        </h2>

                        {/* <div>{user.map((u, index)=>
                        <div key={index}>
                            <p>{u.name}</p>
                            <p>{u.email}</p>
                            <p>{u.username}</p>
                        </div>
                        )}</div> */}


                        <form onSubmit={(e) => {
                            submitNow(e)
                        }} className='flex flex-col text-center justify-center mt-5 gap-5 w-[96%]  '
                            action="">
                            {action?.toLowerCase() === "signup" && (
                                <input className='p-4 rounded'
                                    type="name" name="" id="1" placeholder='Enter your name'
                                    value={name} onChange={(e) => (setName(e.target.value))} />)}
                            <input className='p-4 rounded'
                                type="email" name="" id="2" placeholder='Enter your email'
                                value={email} onChange={(e) => (setEmail(e.target.value))} />
                            <input className='p-4 rounded'
                                type="password" name="" id="3" placeholder='Enter your password'
                                value={password} onChange={(e) => (setPassword(e.target.value))} />
                            <button className='p-2 rounded bg-red-600'>{action?.toLowerCase() === "login" ? "Sign In" : "Sign Up"}</button>
                            <p>OR</p>
                            <button className='p-2 rounded ' style={{ backgroundColor: 'rgba(128, 128, 128, 0.4)' }}>Use a sign-in-code</button>

                            <a href='google.com'> Forgot password? </a>

                            <div className='flex gap-4 '>
                                <input type="checkbox" name="" id="" placeholder='' />
                                <p>Remember me</p>
                            </div>

                            <div className='flex flex-col py-3 relative justify-start items-start text-left text-gray-500  '>
                                <a href='http://netflix.in'> <span className='text-gray-500 '> New to Netflix? </span>Sign up now. </a>

                                <p className='mt-4' >This page is protected by Google reCAPTCHA to ensure you're not a bot.</p>
                                <a href="http://www.netflix.com"> Learn more</a>
                            </div>
                        </form>
                    </div>
                </div>






            </div>


            <footer className='relative flex flex-col lg:px-30 sm:px-15 py-10 w-full h-full mt-5 text-gray-400 p-5 '>
                <p className='font-bold mb-3'>Questions? Call 000-800-919-1743</p>

                <ul className=" font-bold sm:mt-5 lg:mt-10 grid grid-cols-2 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1  sm:gap-2 lg:gap-3 ">
                    <li>FAQ</li>
                    <li>Help Centre</li>
                    <li>Account</li>
                    <li>Media Centre</li>
                    <li>Investor Relations</li>
                    <li>Jobs</li>
                    <li>Ways to Watch</li>
                    <li>Terms of Use</li>
                    <li>Privacy</li>
                    <li>Cookie Preferences</li>
                    <li>Corporate Information</li>
                    <li>Contact Us</li>
                    <li>Speed Test</li>
                    <li>Legal Notices</li>
                    <li>Only on Netflix</li>
                </ul>


                <div className='flex border border-gray-500 rounded mt-10 mb-5 py-1 items-center justify-center font-bold gap-1 w-[25%] text-white'>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" data-name="Languages" aria-hidden="true">
                        <path fillRule="evenodd" clipRule="evenodd" d="M10.7668 5.33333L10.5038 5.99715L9.33974 8.9355L8.76866 10.377L7.33333 14H9.10751L9.83505 12.0326H13.4217L14.162 14H16L12.5665 5.33333H10.8278H10.7668ZM10.6186 9.93479L10.3839 10.5632H11.1036H12.8856L11.6348 7.2136L10.6186 9.93479ZM9.52722 4.84224C9.55393 4.77481 9.58574 4.71045 9.62211 4.64954H6.41909V2H4.926V4.64954H0.540802V5.99715H4.31466C3.35062 7.79015 1.75173 9.51463 0 10.4283C0.329184 10.7138 0.811203 11.2391 1.04633 11.5931C2.55118 10.6795 3.90318 9.22912 4.926 7.57316V12.6667H6.41909V7.51606C6.81951 8.15256 7.26748 8.76169 7.7521 9.32292L8.31996 7.88955C7.80191 7.29052 7.34631 6.64699 6.9834 5.99715H9.06968L9.52722 4.84224Z" fill="currentColor"></path>
                    </svg>
                    <select className="">
                        <option className="bg-black text-white border-none" value=""> English</option>
                        <option className="bg-black text-white border-none" value="">Hindi</option>
                    </select>
                </div>

                <p className='text-gray-400 py-5'>Netflix India</p>

                <p className='text-gray-600 text-sm '> This page is protected by Google reCAPTCHA to ensure you're not a bot. Learn more.</p>

            </footer>
        </div>
    )
}

export default Login

// layout check in inspect best

// form, setup form on submit prevent default
// two way binding - stor evalue in usestate and display using value in the box, after submit - clear boxes
// required, and error usestate if else
// test if password contains !/[837739389483!***!@#$%%^]/ : if true then set error
