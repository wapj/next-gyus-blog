import '../globals.css'
import React from "react";
import getAllFilesFrontMatter from "@/libs/mdx";
import ArticleList from "@/components/ArticleList";


async function getData() {
    const allPosts = await getAllFilesFrontMatter('post');
    return {
        posts:allPosts
    }
}

export default async function Blog() {
    const {posts} = await getData();
    return (
      <>
        <ArticleList posts={posts} />
      </>
    )
}
