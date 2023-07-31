"use client"
/* eslint-disable react/display-name */
import { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import Pre from './Pre'
import Image from 'next/image'
import Link from 'next/link'

const CustomLink = ({ href, ...rest }: any) => {
  const isInternalLink = href && href.startsWith('/')
  const isAnchorLink = href && href.startsWith('#')

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a {...rest} />
      </Link>
    )
  }

  if (isAnchorLink) {
    return <a href={href} {...rest} />
  }

  return <a target="_blank" rel="noopener noreferrer" href={href} {...rest} />
}

interface ITOCInline {
  toc: any[]
  indentDepth: number;
  fromHeading: number
  toHeading: number
  asDisclosure: boolean
  exclude: string
}

const TOCInline = ({
                     toc,
                     indentDepth = 3,
                     fromHeading = 1,
                     toHeading = 6,
                     asDisclosure = false,
                     exclude = '',
                   }: ITOCInline) => {
  const re = Array.isArray(exclude)
    ? new RegExp('^(' + exclude.join('|') + ')$', 'i')
    : new RegExp('^(' + exclude + ')$', 'i')

  const filteredToc = toc.filter(
    (heading) =>
      heading.depth >= fromHeading && heading.depth <= toHeading && !re.test(heading.value)
  )

  const tocList = (
    <ul>
      {filteredToc.map((heading) => (
        <li key={heading.value} className={`${heading.depth >= indentDepth && 'ml-6'}`}>
          <a href={heading.url}>{heading.value}</a>
        </li>
      ))}
    </ul>
  )

  return (
    <>
      {asDisclosure ? (
        <details open>
          <summary className="ml-6 pt-2 pb-2 text-xl font-bold">Table of Contents</summary>
          <div className="ml-6">{tocList}</div>
        </details>
      ) : (
        tocList
      )}
    </>
  )
}



export const MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  wrapper: ({ components, layout, ...rest }: any) => {
    const Layout = require(`../layouts/${layout}`).default
    return <Layout {...rest} />
  },
}

export const MDXLayoutRenderer = ({ layout, code, ...rest }: any) => {
  console.log(rest)
  const MDXLayout = useMemo(() => getMDXComponent(code), [code])
  return <MDXLayout layout={layout} components={MDXComponents} {...rest} />
}
