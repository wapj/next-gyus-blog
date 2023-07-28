import path from "path";
import getAllFilesRecursively from "@/libs/files";
import fs from "fs";
import matter from 'gray-matter'

const root = process.cwd()

export function getFiles(dir: string = 'posts') {
  const filePath = path.join(root, 'datas', dir)
  const files = getAllFilesRecursively(filePath)
  return files.map((file: string) => file.slice(filePath.length + 1).replace(/\\/g, '/'))
}

export function formatSlug(slug: string) {
  return slug.replace(/\.(mdx|md)/, '')
}


export default async function getAllFilesFrontMatter(dir: string) {
  const filePath = path.join(root, 'datas', dir)
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
        date: frontmatter.date ? new Date(frontmatter.date).toISOString(): null,
      })
    }
  })

  return frontMatterList.sort((a, b) => dateSortDesc(a.date, b.date))
}

// 역순으로 정렬
export function dateSortDesc(a:number, b: number) {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}
