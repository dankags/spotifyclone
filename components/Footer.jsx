import Link from 'next/link'
import React from 'react'
import { FaXTwitter } from 'react-icons/fa6'
import { BiLogoFacebookCircle, BiLogoInstagram} from 'react-icons/bi'

const Footer = () => {
  return (
    <div className="py-12 bg-neutral-900 px-6">
      <div className="w-full flex items-start">
        <div className="w-3/12 flex flex-col gap-2">
          <span className="text-sm font-bold text-white">Company</span>
          <Link
            href=""
            className="text-sm font-medium text-stone-400 no-underline hover:text-stone-50"
          >
            About
          </Link>
          <Link
            href=""
            className="text-sm font-medium text-stone-400 no-underline hover:text-stone-50"
          >
            Jobs
          </Link>
          <Link
            href=""
            className="text-sm font-medium text-stone-400 no-underline hover:text-stone-50"
          >
            For The Record
          </Link>
        </div>
        <div className="w-3/12 flex flex-col gap-2">
          <span className="text-sm font-bold text-white">Communities</span>
          <Link
            href=""
            className="text-sm font-medium text-stone-400 no-underline hover:text-stone-50"
          >
            For Artist
          </Link>
          <Link
            href=""
            className="text-sm font-medium text-stone-400 no-underline hover:text-stone-50"
          >
            Developers
          </Link>
          <Link
            href=""
            className="text-sm font-medium text-stone-400 no-underline hover:text-stone-50"
          >
            Advertising
          </Link>
          <Link
            href=""
            className="text-sm font-medium text-stone-400 no-underline hover:text-stone-50"
          >
            Investors
          </Link>
          <Link
            href=""
            className="text-sm font-medium text-stone-400 no-underline hover:text-stone-50"
          >
            Vendors
          </Link>
        </div>
        <div className="w-6/12 flex justify-end gap-3">
          <button className="p-2 rounded-full text-neutral-50 bg-neutral-800 hover:bg-neutral-700 cursor-pointer">
            <BiLogoInstagram size={25} />
          </button>
          <button className="p-2 rounded-full text-neutral-50 bg-neutral-800 hover:bg-neutral-700 cursor-pointer">
            <FaXTwitter size={23} />
          </button>
          <button className="p-2 rounded-full text-neutral-50 bg-neutral-800 hover:bg-neutral-700 cursor-pointer">
            <BiLogoFacebookCircle size={25} />
          </button>
        </div>
      </div>
      <div>
        <div className="flex flex-col mt-6 gap-2">
          <span className="text-sm font-bold text-white">Useful links</span>
          <Link
            href=""
            className="text-sm font-medium text-stone-400 no-underline hover:text-stone-50"
          >
            Support
          </Link>
          <Link
            href=""
            className="text-sm font-medium text-stone-400 no-underline hover:text-stone-50"
          >
            Free Mobile App
          </Link>
        </div>
        <hr className="border-neutral-600 my-6" />
        <div className="flex items-center">
          <div className="w-9/12">
            <Link
              href=""
              className="text-xs mr-2 font-normal text-stone-400 no-underline hover:text-stone-50"
            >
              Legacy
            </Link>
            <Link
              href=""
              className="text-xs mr-2 font-normal text-stone-400 no-underline hover:text-stone-50"
            >
              Privacy Center
            </Link>
            <Link
              href=""
              className="text-xs mr-2 font-normal text-stone-400 no-underline hover:text-stone-50"
            >
              Privacy Policy
            </Link>
            <Link
              href=""
              className="text-xs mr-2 font-normal text-stone-400 no-underline hover:text-stone-50"
            >
              Cookies
            </Link>
            <Link
              href=""
              className="text-xs mr-2 font-normal text-stone-400 no-underline hover:text-stone-50"
            >
              About Ads
            </Link>
            <Link
              href=""
              className="text-xs font-normal text-stone-400 no-underline hover:text-stone-50"
            >
              Accessibility
            </Link>
          </div>
          <span className="w-3/12 text-end text-sm text-stone-400">
            @ 2023 Spotify AB
          </span>
        </div>
      </div>
    </div>
  );
}

export default Footer