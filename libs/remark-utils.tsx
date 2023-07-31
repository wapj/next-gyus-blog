import {visit} from "unist-util-visit";
import {load} from "js-yaml";
import { slug } from 'github-slugger'
import { toString } from 'mdast-util-to-string'
import sizeOf from 'image-size'
import fs from "fs";

export default function extractFrontmatter() {
  // 타입은 일단 any로 해두자.
  // tree는 ast인데 타입스크립트에서는 뭐로 표현되는걸까
  return (tree:any, file:any) => {
    visit(tree, 'yaml', (node) => {
      file.data.frontmatter = load(node.value)
    })
  }
}

export function remarkTocHeadings(options: any) {
  return (tree: any) =>
    visit(tree, 'heading', (node) => {
      const textContent = toString(node)
      options.exportRef.push({
        value: textContent,
        url: '#' + slug(textContent),
        depth: node.depth,
      })
    })
}

export function remarkCodeTitles() {
  return (tree: any) =>
    visit(tree, 'code', (node, index, parent) => {
      const nodeLang = node.lang || ''
      let language = ''
      let title = ''

      if (nodeLang.includes(':')) {
        language = nodeLang.slice(0, nodeLang.search(':'))
        title = nodeLang.slice(nodeLang.search(':') + 1, nodeLang.length)
      }

      if (!title) {
        return
      }

      const className = 'remark-code-title'

      const titleNode = {
        type: 'mdxJsxFlowElement',
        name: 'div',
        attributes: [{ type: 'mdxJsxAttribute', name: 'className', value: className }],
        children: [{ type: 'text', value: title }],
        data: { _xdmExplicitJsx: true },
      }

      parent.children.splice(index, 0, titleNode)
      node.lang = language
    })
}

export function remarkImgToJsx() {
  return (tree: any) => {
    visit(
      tree,
      // only visit p tags that contain an img element
      (node: any) => node.type === 'paragraph' && node.children.some((n: any) => n.type === 'image'),
      (node) => {
        const imageNode = node.children.find((n: any) => n.type === 'image')

        // only local files
        if (fs.existsSync(`${process.cwd()}/public${imageNode.url}`)) {
          const dimensions = sizeOf(`${process.cwd()}/public${imageNode.url}`)

            // Convert original node to next/image
          ;(imageNode.type = 'mdxJsxFlowElement'),
            (imageNode.name = 'Image'),
            (imageNode.attributes = [
              { type: 'mdxJsxAttribute', name: 'alt', value: imageNode.alt },
              { type: 'mdxJsxAttribute', name: 'src', value: imageNode.url },
              { type: 'mdxJsxAttribute', name: 'width', value: dimensions.width },
              { type: 'mdxJsxAttribute', name: 'height', value: dimensions.height },
            ])

          // Change node type from p to div to avoid nesting error
          node.type = 'div'
          node.children = [imageNode]
        }
      }
    )
  }
}

