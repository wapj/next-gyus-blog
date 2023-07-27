/**
 * 다음 소스코드에서 참조
 * https://github.com/timlrx/tailwind-nextjs-starter-blog/blob/2eaac5ae315d98fb43f779fe4daedaeef6eef220/lib/utils/files.js#L13-L12
 */

import fs from 'fs'
import path from 'path'

const pipe =
  (...fns) =>
    (x) =>
      fns.reduce((v, f) => f(v), x)

const flattenArray = (input) =>
  input.reduce((acc, item) => [...acc, ...(Array.isArray(item) ? item : [item])], [])

const map = (fn) => (input) => input.map(fn)

const walkDir = (fullPath) => {
  return fs.statSync(fullPath).isFile() ? fullPath : getAllFilesRecursively(fullPath)
}

const pathJoinPrefix = (prefix) => (extraPath) => path.join(prefix, extraPath)

const getAllFilesRecursively = (folder) =>
  pipe(fs.readdirSync, map(pipe(pathJoinPrefix(folder), walkDir)), flattenArray)(folder)

export default getAllFilesRecursively
