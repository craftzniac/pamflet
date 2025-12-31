import type { Dispatch, SetStateAction } from "react";
import { cn } from "~/lib/utils";


// className="px-6 py-10 h-120 max-h-120 overflow-y-auto max-w-90 w-full border-2 border-gray-400 outline-gray-500 transition-colors rounded-2xl text-lg font-code"

export default function Editor({ text, updateText }: { text: string, updateText: (text: string) => void }) {
  return (
    <textarea
      className={cn("relative py-2 pt-10 px-2 h-full w-full text-lg transition-colors resize-none rounded-2xl bg-white gap-4 font-body flex border-gray-600 border-1")}
      value={text}
      placeholder="card content"
      onChange={(e) => updateText(e.target.value)}
    >
    </textarea>
  );
}
