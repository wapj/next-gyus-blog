import {allPosts} from 'contentlayer/generated'
import Article from "@/components/Article";
import siteMetadata from "@/datas/siteMetadata";


export const generateMetadata = ({ params }: { params: { slug: string[] } }) => {
  const slug = "blog/" + decodeURI(params.slug.join('/'))
  const post = allPosts.find((post) => post._raw.flattenedPath === slug)
  if (!post) throw new Error(`Post not found for slug: ${slug}`)
  return { title: post.title,
    description: post._raw,
    openGraph: {
      title: post.title,
      description: post.summary,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      url: './',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
    },
  }
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