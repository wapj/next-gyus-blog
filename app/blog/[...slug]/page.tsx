import getAllFilesFrontMatter, {getFileBySlug} from "@/libs/mdx";
import {MDXLayoutRenderer} from "@/components/MDXComponents";
import {DEFAULT_LAYOUT} from "@/libs/constants";

async function getData({params}: {params: {slug:string[]}}) {
  const allPosts= await getAllFilesFrontMatter('post');
  const postIndex : number = allPosts.findIndex((post: any) => post.slug === params.slug.join("/"))
  const prev = allPosts[postIndex - 1] || null;
  const next = allPosts[postIndex + 1] || null;
  const post = await getFileBySlug('post', params.slug.join("/"))
  return {post, prev, next}
}


// TOOD https://www.npmjs.com/package/@next/mdx next의 MDX 지원을 사용하자.

export default async function Page({params}: {params: {slug:string[]}}) {
  const {post, prev, next} = await getData({params})
  const { mdxSource, toc, frontMatter }: { mdxSource: string, toc: any[], frontMatter: any } = post
  return (
    <>
      {frontMatter.draft !== true ? (
        <div>
          <MDXLayoutRenderer
            layout={frontMatter.layout || DEFAULT_LAYOUT}
            toc={toc}
            code={mdxSource}
            frontMatter={frontMatter}
            prev={prev}
            next={next}
          />
        </div>
      ): (
        <div>
          🚧 공사중
        </div>
      )}
    </>
  )

}