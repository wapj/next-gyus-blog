import './globals.css'
import Link from 'next/link'
import React from "react";
import {formatDate} from "@/libs/utils";
import RightArrow from "@/components/icons/RightArrow";
import getAllFilesFrontMatter from "@/libs/mdx";


async function getData() {
  const frontmatterList = await getAllFilesFrontMatter('posts');
  return {
    posts:frontmatterList
  }
}

export default async function Home(props : any) {
  const {posts} = await getData();
  return (
    <>
      <main className={"max-w-screen-lg px-4 py-3 mx-auto"}>
        🚧공사중...
        <div className={"mt-10 space-y-16"}>
          {posts.map(({title, slug, date, summary}: any) => (
            <article key={slug} className="relative group">
              <div className="relative">
                <h3 className="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-200 pt-8 lg:pt-0">
                  {title}
                </h3>
                <div
                  className="mt-2 mb-4 prose prose-slate prose-a:relative prose-a:z-10 dark:prose-dark line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: summary }}
                />
                {date.split("T")[0]}
              </div>
              <Link href={`/blog/${slug}`} className="flex items-center text-sm text-sky-500 font-medium">
                <span className="relative">
                  Read more<span className="sr-only">, {title}</span>
                </span>
                <RightArrow />
              </Link>
            </article>
          ))}
        </div>
      </main>
    </>
  )
}
