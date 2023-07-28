import React from "react";

export default function Tag({tag}: {tag:string}) {
  return (
    <div className="rounded bg-gray-200 pl-1 pr-1 inline-block mr-2">
      <span className="text-xs text-gray-800 font-bold">{tag}</span>
    </div>
  )
}