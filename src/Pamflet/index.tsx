import { useEffect, useRef } from "react";
import { Parser } from "./parser";

const testStrings = [
  `But yet $23 thing to note.\nThis is something`,


  `But yet $23 thing to note.
This is something
.color=green
.block_size=3px
.fontSize = 23px`,


  `- Hello again
- Say your - name.
- another th's to pay
.answer = 0,2
.color_wrong = green`,


  `What are the various kinds of greetings?
- Hello again
- Say your - name.
- another th's to pay
.answer = 0,2
.color_wrong = green`,


  `Lnk hello world https://www.example.com/idontevenknow/sk

What are the various kinds of greetings?
- Hello again
- another th's to pay
.answer =0
.color_wrong= green


.3color_wrong= green
`,

  `
Audio ./src.mp3
`


];


export default function Pamflet() {
  const inputchars = testStrings[5];
  const tokRef = useRef(new Parser(inputchars));

  useEffect(() => {
    tokRef.current.run();
  }, []);

  return (
    <div className="flex justify-center w-full">
      <textarea disabled className="p-3 h-80 text-lg max-w-80 w-full border-2 border-gray-400 outline-gray-500 transition-colors rounded-md" value={inputchars}> </textarea>
    </div>
  );
}
