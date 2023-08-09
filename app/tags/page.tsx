import React from "react";
import tagData from 'app/tag-data.json'
import Link from "next/link";
import {slug} from "github-slugger";
import Tag from "@/components/Tag";
export default  async function Tags() {
  const tagMap = tagData as Record<string, number>
  const tagKeys = Object.keys(tagMap);
  const tags = tagKeys.sort((tag1, tag2) => tagMap[tag2] - tagMap[tag1])

  return (
    <div className={"rounded-lg border border-black p-5 m-5"}>
      <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-5 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
        <div className="space-x-2 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14">
            Tags
          </h1>
        </div>
        <div className="flex max-w-lg flex-wrap">
          {tagKeys.length === 0 && 'No tags found.'}
          {tags.map((t) => {
            return (
              <div key={t} className="mb-2 mr-5 mt-2">
                <Tag text={t} />
                <Link
                  href={`/tags/${slug(t)}`}
                  className="-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300"
                  aria-label={`View posts tagged ${t}`}
                >
                  {` (${tagMap[t]})`}
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}