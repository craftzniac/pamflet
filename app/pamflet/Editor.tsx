import type { Dispatch, SetStateAction } from "react";

export default function Editor({ inputchars, setInputchars }: { inputchars: string, setInputchars: Dispatch<SetStateAction<string>> }) {
  return (
    <textarea
      className="p-6 h-full max-h-100 overflow-y-auto max-w-90 w-full border-2 border-gray-400 outline-gray-500 transition-colors rounded-2xl text-lg font-code"
      value={inputchars}
      onChange={(e) => setInputchars(e.target.value)}
    >
    </textarea>
  );
}
