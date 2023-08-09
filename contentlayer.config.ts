// contentlayer.config.ts
import {defineDocumentType, makeSource} from 'contentlayer/source-files'

import remarkGfm from 'remark-gfm';
import rehypePrismPlus from "rehype-prism-plus"
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import {slug} from 'github-slugger'
import {writeFileSync} from "fs";

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `blog/**/*.md`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true},
    date: { type: 'date', required: true},
    tags: { type: 'list', of: {type: 'string'}},
    category: {type: 'string'},
    summary: {type: 'string'},
    published: {type: 'boolean'},
    featured: {type: 'string'},
  },
  computedFields: {
    url: {type: 'string', resolve: (post) => `/blog/${post._raw.flattenedPath}`},
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, "")
    },
  },
}))


export const Diary = defineDocumentType(() => ({
  name: 'Diary',
  filePathPattern: `diary/**/*.md`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true},
    date: { type: 'date', required: true},
    tags: { type: 'list', of: {type: 'string'}},
    category: {type: 'string'},
    summary: {type: 'string'},
    published: {type: 'boolean'},
    featured: {type: 'string'},
  },
  computedFields: {
    url: {type: 'string', resolve: (post) => `/diary/${post._raw.flattenedPath}`},
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, "")
    },
  },
}))


export default makeSource({
  contentDirPath: 'datas',
  documentTypes: [Post, Diary],
  mdx: {
    cwd: process.cwd(),
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,
      [rehypePrismPlus, { defaultLanguage: 'js', ignoreMissing: true }],
    ],
  },
  onSuccess: async (importData) => {
    const {allPosts} = await importData()
    const tags: Record<string, number> = {}

    allPosts.forEach((post) => {
      // console.log(post.type, post.title)
      if (post.tags && post.published) {
        post.tags.forEach((tag) => {
          const slugifyTag = slug(tag);
          if (slugifyTag in tags) {
            tags[slugifyTag] += 1
          } else {
            tags[slugifyTag] = 1
          }
        })
      }
    })
    writeFileSync('./app/tag-data.json', JSON.stringify(tags))
  }
})