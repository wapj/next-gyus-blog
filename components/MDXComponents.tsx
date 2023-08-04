import TOCInline from 'pliny/ui/TOCInline'
import Pre from 'pliny/ui/Pre'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import type { MDXComponents } from 'mdx/types'
import Image from './Image'
import CustomLink from './Link'


export const components: MDXComponents = {
  Image,
  TOCInline,
  // @ts-ignore
  a: CustomLink,
  // @ts-ignore
  pre: Pre,
  BlogNewsletterForm,
}
