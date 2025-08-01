import { useState, type Dispatch, type SetStateAction } from "react";
import {
  testStrings
} from "./dummy_data";
import Renderer from "./renderer";

export default function Pamflet() {
  const [inputchars, setInputchars] = useState(testStrings[4]);
  return (
    <div className="flex justify-center w-full gap-2">
      <Editor inputchars={inputchars} setInputchars={setInputchars} />
      <Renderer inputchars={inputchars} />
    </div>
  );
}

function Editor({ inputchars, setInputchars }: { inputchars: string, setInputchars: Dispatch<SetStateAction<string>> }) {
  return (
    <textarea
      className="p-3 h-140 font-editor max-w-140 w-full border-2 border-gray-400 outline-gray-500 transition-colors rounded-md"
      value={inputchars}
      onChange={(e) => setInputchars(e.target.value)}
    >
    </textarea >
  );
}
