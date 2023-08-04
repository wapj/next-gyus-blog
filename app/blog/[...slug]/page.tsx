import { format, parseISO } from 'date-fns'
import { allPosts } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import {Arima} from "next/dist/compiled/@next/font/dist/google";
import Article from "@/components/Article";


export const generateMetadata = ({ params }: { params: { slug: string[] } }) => {
  const slug = "blog/" + decodeURI(params.slug.join('/'))
  const post = allPosts.find((post) => post._raw.flattenedPath === slug)
  if (!post) throw new Error(`Post not found for slug: ${slug}`)
  return { title: post.title }
}


const PostLayout = ({ params }: { params: { slug: string[] } }) => {
  const slug = "blog/" + decodeURI(params.slug.join('/'))
  console.log(">>>>>>>>");
  console.log(slug);
  const post = allPosts.find((post) => {console.log(">>> : ", post._raw.flattenedPath, slug); return post._raw.flattenedPath === slug})
  if (!post) throw new Error(`Post not found for slug: ${slug}`)

  return (
    <>
    <Article post={post} />
    </>
  )
}

export default PostLayout