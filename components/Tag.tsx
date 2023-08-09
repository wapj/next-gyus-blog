
// export default function Tag({tag}: {tag: string}) {
//   return (
//     <span className={"text-xs rounded-l rounded-r bg-gray-300 mr-1 pl-2 pr-2 pt-1 pb-1 text-gray-600 font-bold"}>{tag}</span>
//   )
// }

import {slug} from "github-slugger";
import Link from "next/link";

interface Props {
  text: string
}
const Tag = ({text}: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag