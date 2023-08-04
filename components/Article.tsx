import {format, parseISO} from "date-fns";
import {MDXLayoutRenderer} from "pliny/mdx-components";
import {Diary, Post} from "contentlayer/generated";
import IFrame from "@/components/IFrame";
import {MDXComponents} from "mdx/types";


export const components: MDXComponents = {
  IFrame
}


export default function Article({post}: {post:Post|Diary}) {
  return (
    <article className="mx-auto max-w-screen-md py-8">
      <div className="mb-8 text-center">
        <time dateTime={post.date} className="mb-1 text-xs text-gray-600">
          {format(parseISO(post.date), 'LLLL d, yyyy')}
        </time>
        <h1 className="text-3xl font-bold">{post.title}</h1>
      </div>
      <div className="max-w-8xl mx-auto mb-8">
        <div className="flex "><a
          className="group flex font-semibold text-sm leading-6 text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white"
          href="/">
          <svg viewBox="0 -9 3 24"
               className="overflow-visible mr-3 text-slate-400 w-auto h-6 group-hover:text-slate-600 dark:group-hover:text-slate-300">
            <path d="M3 0L0 3L3 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round"></path>
          </svg>
          뒤로</a>
        </div>
      </div>
      <MDXLayoutRenderer code={post.body.code} components={components} />
    </article>
  )
}