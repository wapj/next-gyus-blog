import { format, parseISO } from 'date-fns'
import { allDiaries } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import {Arima} from "next/dist/compiled/@next/font/dist/google";
import Article from "@/components/Article";


export const generateMetadata = ({ params }: { params: { slug: string[] } }) => {
  const slug = "diary/" + decodeURI(params.slug.join('/'))
  const diary = allDiaries.find((diary) => diary._raw.flattenedPath === slug)
  if (!diary) throw new Error(`Post not found for slug: ${slug}`)
  return { title: diary.title }
}


const PostLayout = ({ params }: { params: { slug: string[] } }) => {
  const slug = "diary/" + decodeURI(params.slug.join('/'))
  console.log(">>>>>>>>");
  console.log(slug);
  const diary = allDiaries.find((diary) => {console.log(">>> : ", diary._raw.flattenedPath, slug); return diary._raw.flattenedPath === slug})
  if (!diary) throw new Error(`Post not found for slug: ${slug}`)

  return (
    <>
      <Article post={diary} />
    </>
  )
}

export default PostLayout