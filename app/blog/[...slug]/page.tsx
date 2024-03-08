import {allPosts} from 'contentlayer/generated'
import Article from "@/components/Article";
import Comment from "@/components/Comment";
import siteMetadata from "@/datas/siteMetadata";



export const generateMetadata = ({ params }: { params: { slug: string[] } }) => {
  const slug = "blog/" + decodeURI(params.slug.join('/'))
  const post = allPosts.find((post) => post._raw.flattenedPath === slug)
  if (!post) throw new Error(`Post not found for slug: ${slug}`)
  const img = post.featured ? post.featured : siteMetadata.banner;
  return { title: post.title,
    description: post._raw,
    openGraph: {
      title: post.title,
      description: post.summary,
      siteName: siteMetadata.title,
      locale: 'ko_KR',
      type: 'article',
      images: [img],
      url: './',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: [img],
    },
  }
}

const PostLayout = ({ params }: { params: { slug: string[] } }) => {
  const slug = "blog/" + decodeURI(params.slug.join('/'))
  const post = allPosts.find((post) => post._raw.flattenedPath === slug)
  if (!post) throw new Error(`Post not found for slug: ${slug}`)

  return (
    <>
      <main className={"max-w-screen-md px-4 py-3 mx-auto"}>
        <Article post={post} />
      </main>
      <div className="mx-auto max-w-screen-md py-8">
        <Comment />
      </div>

    </>
  )
}

export default PostLayout