import {allDiaries} from 'contentlayer/generated'
import Article from "@/components/Article";
import siteMetadata from "@/datas/siteMetadata";


export const generateMetadata = ({ params }: { params: { slug: string[] } }) => {
  const slug = "diary/" + decodeURI(params.slug.join('/'))
  const diary = allDiaries.find((diary) => diary._raw.flattenedPath === slug)
  if (!diary) throw new Error(`Post not found for slug: ${slug}`)

  const img = diary.featured ? diary.featured : siteMetadata.banner;

  return { title: diary.title,
    description: diary._raw,
    openGraph: {
      title: diary.title,
      description: diary.summary,
      siteName: siteMetadata.title,
      locale: 'ko_KR',
      type: 'article',
      image: img,
      url: './',
    },
    twitter: {
      card: 'summary_large_image',
      title: diary.title,
      image: img,
      description: diary.summary,
    },
  }
}



const PostLayout = ({ params }: { params: { slug: string[] } }) => {
  const slug = "diary/" + decodeURI(params.slug.join('/'))
  const diary = allDiaries.find((diary) => {console.log(">>> : ", diary._raw.flattenedPath, slug); return diary._raw.flattenedPath === slug})
  if (!diary) throw new Error(`Post not found for slug: ${slug}`)

  return (
    <>
      <Article post={diary} />
    </>
  )
}

export default PostLayout