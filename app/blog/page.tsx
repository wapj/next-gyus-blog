import '../globals.css'
import Link from 'next/link'
import React from "react";
import RightArrow from "@/components/icons/RightArrow";
import getAllFilesFrontMatter from "@/libs/mdx";
import Tag from "@/components/Tag";


async function getData() {
    const frontmatterList = await getAllFilesFrontMatter('post');
    return {
        posts:frontmatterList
    }
}

export default async function Blog() {
    const {posts} = await getData();
    return (
      <>
          <main className={"max-w-screen-lg px-4 py-3 mx-auto"}>
              🚧공사중...
              <div className={"mt-5 space-y-8"}>
                  {posts.map(({title, slug, date, summary, tags}: any) => (
                    <article key={slug} className="relative group">
                        <div className="relative">
                            <h3 className="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-200 pt-8 lg:pt-0">
                                {title}
                            </h3>
                            {date.split("T")[0]}
                            {summary && (
                              <div
                                className="mt-2 mb-4 prose prose-slate prose-a:relative prose-a:z-10 dark:prose-dark line-clamp-2"
                                dangerouslySetInnerHTML={{ __html: summary }}
                              />
                            )}
                            <br />
                            {tags && tags.map((tag: string) => (
                              <Tag tag={tag} />
                            ))}
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
