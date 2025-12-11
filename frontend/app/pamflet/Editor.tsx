import type { Dispatch, SetStateAction } from "react";

export default function Editor({ text, updateText }: { text: string, updateText: (text: string) => void }) {
  return (
    <textarea
      className="px-6 py-10 h-120 max-h-120 overflow-y-auto max-w-90 w-full border-2 border-gray-400 outline-gray-500 transition-colors rounded-2xl text-lg font-code"
      value={text}
      placeholder="card content"
      onChange={(e) => updateText(e.target.value)}
    >
    </textarea>
  );
}
