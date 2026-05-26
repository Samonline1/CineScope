import React from "react";

const footerLinks = [
  "FAQ",
  "Help Centre",
  "Account",
  "Media Centre",
  "Investor Relations",
  "Jobs",
  "Ways to Watch",
  "Terms of Use",
  "Privacy",
  "Cookie Preferences",
  "Corporate Information",
  "Contact Us",
  "Speed Test",
  "Legal Notices",
  "Only on CineScope",
];

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[linear-gradient(180deg,rgba(0,0,0,0.96),rgba(12,12,12,1))] text-gray-400">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 sm:px-5 sm:py-12 lg:px-8 lg:py-14">
        <div className="flex flex-col gap-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-red-500">
            Support
          </p>
          <p className="text-lg font-semibold text-white sm:text-xl">
            Questions? Call 000-800-919-1743
          </p>
          <p className="max-w-2xl text-sm text-gray-400 sm:text-base">
            Browse help links, account information, and streaming support in a layout
            optimized for smaller screens first.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm sm:grid-cols-3 sm:text-base lg:grid-cols-4">
          {footerLinks.map((link) => (
            <button
              key={link}
              type="button"
              className="text-left text-gray-400 transition hover:text-white"
            >
              {link}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-5 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-full max-w-[11rem] items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-3 py-2 text-white">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.7668 5.33333L10.5038 5.99715L9.33974 8.9355L8.76866 10.377L7.33333 14H9.10751L9.83505 12.0326H13.4217L14.162 14H16L12.5665 5.33333H10.8278H10.7668ZM10.6186 9.93479L10.3839 10.5632H11.1036H12.8856L11.6348 7.2136L10.6186 9.93479ZM9.52722 4.84224C9.55393 4.77481 9.58574 4.71045 9.62211 4.64954H6.41909V2H4.926V4.64954H0.540802V5.99715H4.31466C3.35062 7.79015 1.75173 9.51463 0 10.4283C0.329184 10.7138 0.811203 11.2391 1.04633 11.5931C2.55118 10.6795 3.90318 9.22912 4.926 7.57316V12.6667H6.41909V7.51606C6.81951 8.15256 7.26748 8.76169 7.7521 9.32292L8.31996 7.88955C7.80191 7.29052 7.34631 6.64699 6.9834 5.99715H9.06968L9.52722 4.84224Z"
                fill="currentColor"
              />
            </svg>

            <select className="w-full bg-transparent text-sm text-white outline-none">
              <option className="bg-black text-white" value="english">
                English
              </option>
              <option className="bg-black text-white" value="hindi">
                Hindi
              </option>
            </select>
          </div>

          <div className="flex flex-col gap-2 text-sm text-gray-500 sm:items-end">
            <p className="text-gray-300">CineScope India</p>
            <p className="max-w-md">
              This page is protected by Google reCAPTCHA to ensure you&apos;re not a bot.
              Learn more.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
