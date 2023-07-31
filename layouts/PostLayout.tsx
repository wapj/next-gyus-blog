
export default function PostLayout({ toc, frontMatter, next, prev, children }: any) {
  return (
    <>
      <p>
        {toc.map((tocItem:any) => (<div>{tocItem.value} {tocItem.url} {tocItem.depth}</div>))}
      </p>
      <p>
        {JSON.stringify(frontMatter)}
      </p>
      <p>
        {JSON.stringify(next)}
      </p>
      <p>
        {JSON.stringify(prev)}
      </p>
      <p>
        {children}
      </p>

    </>
  )
}