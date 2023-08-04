import {compareDesc} from 'date-fns'
import {allPosts} from 'contentlayer/generated'
import ArticleList from "@/components/ArticleList";


export default async function Blog() {
    const posts = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    return (
      <>
          <ArticleList posts={posts} />
      </>
    )
}
