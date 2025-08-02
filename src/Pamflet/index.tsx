import { useState, type Dispatch, type SetStateAction } from "react";
import {
  testStrings
} from "./dummy_data";
import Renderer from "./renderer";

export default function Pamflet() {
  const [inputchars, setInputchars] = useState(testStrings[testStrings.length - 1]);
  return (
    <div className="flex justify-center w-full gap-4 h-120">
      <Editor inputchars={inputchars} setInputchars={setInputchars} />
      <Renderer inputchars={inputchars} />
    </div>
  );
}

function Editor({ inputchars, setInputchars }: { inputchars: string, setInputchars: Dispatch<SetStateAction<string>> }) {
  return (
    <textarea
      className="p-6 h-full overflow-y-auto  max-w-90 w-full border-2 border-gray-400 outline-gray-500 transition-colors rounded-2xl text-lg font-editor"
      value={inputchars}
      onChange={(e) => setInputchars(e.target.value)}
    >
    </textarea>
  );
}
