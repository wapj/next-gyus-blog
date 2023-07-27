import Link from "next/link";
import Image from 'next/image'
import React from "react";

export function NavItems() {
  return (
    <>
      <li>
        <Link href="/blog" className="hover:text-sky-500 dark:hover:text-sky-400">
          Dev
        </Link>
      </li>
      <li>
        <Link href="/diary" className="hover:text-sky-500 dark:hover:text-sky-400">
          Diary
        </Link>
      </li>
      <li>
        <Link href="/tags" className="hover:text-sky-500 dark:hover:text-sky-400">
          Tags
        </Link>
      </li>
      <li>
        <Link href="/about" className="hover:text-sky-500 dark:hover:text-sky-400">
          About
        </Link>
      </li>
    </>
  )
}

export default function Header() {
  return (
    <>
      <nav className="bg-white dark:bg-gray-700">
        <div className="max-w-screen-lg px-4 py-3 mx-auto">
          <div className="flex items-center">
            <a href="https://blog.gyus.me" className="flex items-center">
              <Image src="/gyus-logo.png" alt="gyus log Logo" className="dark:invert" width={100} height={24} priority/>
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">HOME</span>
            </a>
          </div>
        </div>
      </nav>
      <nav className="bg-gray-50 dark:bg-gray-700">
        <div className="max-w-screen-lg px-4 py-3 mx-auto">
          <div className="flex items-center">
            <ul className="flex flex-row font-medium mt-0 mr-6 space-x-8 text-sm">
              <NavItems/>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}