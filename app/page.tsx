// app/page.tsx
import {compareDesc} from 'date-fns'
import {allPosts} from 'contentlayer/generated'
import React from "react";
import ArticleList from "@/components/ArticleList";


export default async function Home() {
  const posts = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
  return (
    <>
      <main className={"max-w-screen-md px-4 py-3 mx-auto"}>
        <div className={"rounded-lg border border-black p-5"}>
          🚧공사중...
        </div>
        <ArticleList posts={posts} />
      </main>
    </>
  )
}
