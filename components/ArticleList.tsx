import Tag from "@/components/Tag";
import Link from "next/link";
import RightArrow from "@/components/icons/RightArrow";
import React from "react";

export default function ArticleList({posts, type = "blog"}: {posts:any[], type?: string}) {
  return (
    <main className={"max-w-screen-md px-4 py-3 mx-auto"}>
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
            <Link href={`/${type}/${slug}`} className="flex items-center text-sm text-sky-500 font-medium">
                <span className="relative">
                  Read more<span className="sr-only">, {title}</span>
                </span>
              <RightArrow />
            </Link>
          </article>
        ))}
      </div>
    </main>
  )
}