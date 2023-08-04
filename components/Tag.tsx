
export default function Tag({tag}: {tag: string}) {
  return (
    <span className={"text-xs rounded-l rounded-r bg-gray-300 mr-1 pl-2 pr-2 pt-1 pb-1 text-gray-600 font-bold"}>{tag}</span>
  )
}