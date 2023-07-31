import fs from "fs";
import path from "path";
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { bundleMDX } from 'mdx-bundler'
import getAllFilesRecursively from "@/libs/files";
import {ROOT_PATH, DATA_PATH} from "@/libs/constants";

// remark packages
import remarkExtractFrontmatter, {remarkCodeTitles, remarkImgToJsx, remarkTocHeadings} from './remark-utils'
import remarkGfm from 'remark-gfm'
import remarkFootnotes from 'remark-footnotes'
import remarkMath from 'remark-math'

// rehype packages
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'

const root = process.cwd()

export function getFiles(dir: string = 'posts') {
  const filePath = path.join(ROOT_PATH, DATA_PATH, dir)
  const files = getAllFilesRecursively(filePath)
  return files.map((file: string) => file.slice(filePath.length + 1).replace(/\\/g, '/'))
}

export function formatSlug(slug: string) {
  return slug.replace(/\.(mdx|md)/, '')
}


export default async function getAllFilesFrontMatter(dir: string) {
  const filePath = path.join(ROOT_PATH, DATA_PATH, dir)
  const fileNameList = getAllFilesRecursively(filePath)
  const frontMatterList: any[] = []

  fileNameList.forEach((f: string) => {
    const fileName = f.slice(filePath.length + 1).replace(/\\/g, '/')

    // 파일 확장자가 md, mdx가 아니면 무시 (대소문자 구분)
    if (!/\.mdx?$/i.test(fileName)) {
      return
    }

    // 파일의 소스를 읽어온다.
    const source = fs.readFileSync(f, 'utf8')
    const {data: frontmatter} = matter(source)

    if (!frontmatter.draft) {
      frontMatterList.push({
        ...frontmatter,
        slug: formatSlug(fileName),
        summary: frontmatter.summary ? frontmatter.summary : '',
        date: frontmatter.date ? new Date(frontmatter.date).toISOString() : null,
      })
    }
  })

  return frontMatterList.sort((a, b) => dateSortDesc(a.date, b.date))
}

// 역순으로 정렬
export function dateSortDesc(a: number, b: number) {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}


export async function getFileBySlug(dir: string, slug: string) {
  const mdxPath = path.join(ROOT_PATH, DATA_PATH, dir, `${slug}.mdx`)
  const mdPath = path.join(ROOT_PATH, DATA_PATH, dir, `${slug}.md`)
  const source = fs.existsSync(mdxPath)
    ? fs.readFileSync(mdxPath, 'utf8')
    : fs.readFileSync(mdPath, 'utf8');

  process.env.ESBUILD_BINARY_PATH = path.join(ROOT_PATH, 'node_modules', 'esbuild', 'bin', 'esbuild')
  let toc: any[] = [];

  const { code, frontmatter } = await bundleMDX({
    source,
    // mdx imports can be automatically source from the components directory
    cwd: path.join(root, 'components'),
    mdxOptions(options) {
      // this is the recommended way to add custom remark/rehype plugins:
      // The syntax might look weird, but it protects you in case we add/remove
      // plugins in the future.
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkExtractFrontmatter,
        [remarkTocHeadings, { exportRef: toc }],
        remarkGfm,
        remarkCodeTitles,
        [remarkFootnotes, { inlineNotes: true }],
        remarkMath,
        remarkImgToJsx,
      ]
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeSlug,
        rehypeAutolinkHeadings,
        rehypeKatex,
      ]
      return options
    },
    esbuildOptions: (options) => {
      options.minify = false
      options.loader = {
        ...options.loader,
        '.ts':'tsx',
      }
      return options
    },
  })

  return {
    mdxSource: code,
    toc,
    frontMatter: {
      readingTime: readingTime(code),
      slug: slug || null,
      fileName: fs.existsSync(mdxPath) ? `${slug}.mdx` : `${slug}.md`,
      ...frontmatter,
      date: frontmatter.date ? new Date(frontmatter.date).toISOString() : null,
    },
  }
}