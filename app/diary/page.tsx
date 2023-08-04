import {compareDesc} from 'date-fns'
import {allDiaries} from 'contentlayer/generated'
import ArticleList from "@/components/ArticleList";


export default async function Diary() {
  const posts = allDiaries.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
  return (
    <>
      <ArticleList posts={posts} type={"diary"} />
    </>
  )
}
