import Link from "next/link";
import Image from 'next/image'
import React from "react";

export function NavItems() {
  return (
    <>
      <li className={"list-none"}>
        <Link href="/blog" className="hover:text-sky-500">
          Dev
        </Link>
      </li>
      <li className={"list-none"}>
        <Link href="/diary" className="hover:text-sky-500">
          Diary
        </Link>
      </li>
      <li className={"list-none"}>
        <Link href="/tags" className="hover:text-sky-500">
          Tags
        </Link>
      </li>
      <li className={"list-none"}>
        <Link href="/about" className="hover:text-sky-500">
          About
        </Link>
      </li>
    </>
  )
}

export default function Header() {
  return (
    <>
      <nav className="bg-white">
        <div className="max-w-screen-md px-4 py-3 mx-auto">
          <div className="flex items-center">
            <a href="https://blog.gyus.me" className="flex items-center">
              <Image src="/gyus-logo.png" alt="gyus log Logo" width={100} height={24} priority/>
              <span className="self-center text-2xl font-semibold whitespace-nowrap">HOME</span>
            </a>
          </div>
        </div>
      </nav>
      <nav className="bg-gray-50">
        <div className="max-w-screen-md px-4 py-3 mx-auto">
          <div className="flex items-center">
            <ul className="flex flex-row font-medium mt-4 mr-6 space-x-8 text-sm">
              <NavItems/>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}