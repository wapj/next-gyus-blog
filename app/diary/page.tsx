import '../globals.css'
import React from "react";
import getAllFilesFrontMatter from "@/libs/mdx";
import ArticleList from "@/components/ArticleList";


async function getData() {
  const frontmatterList = await getAllFilesFrontMatter('diary');
  return {
    posts:frontmatterList
  }
}

export default async function Diary() {
  const {posts} = await getData();
  return (
    <>
      <ArticleList posts={posts} />
    </>
  )
}
