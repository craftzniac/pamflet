import { useEffect, useState, type ReactNode } from "react";
import { Parser, type TElement, type TLinkElement, type TListElement, type TMultichoiceElement, type TMultichoiceMultiAnswerElement, type TMultichoiceSingleAnswerElement, type TTextElement } from "./parser";

export default function Renderer({ inputchars }: { inputchars: string }) {
  // const parserRef = useRef(new Parser(inputchars));
  const [elements, setElements] = useState<TElement[]>([]);

  useEffect(() => {
    setElements(new Parser(inputchars).parse());
  }, [inputchars]);

  return (
    <div className="p-6 h-full overflow-y-auto max-w-90 text-lg w-full transition-colors rounded-2xl bg-white gap-4 shadow-md border-gray-300 border-[1px] font-body relative flex justify-center items-center"
    >
      <div className="flex flex-col w-full gap-2">
        {
          elements.map(el => mapToComponent(el))
        }
      </div>
    </div>
  );
}

function PLink({ element }: { element: TLinkElement }) {
  const label = element.label == "" ? element.href : element.label;
  return (
    <a style={{
      color: element.color,
      fontSize: element.fontSize,
      textAlign: element.textAlign
    }} className={`underline break-all w-full text-blue-800`} href={element.href} target="_blank">
      {label}
    </a>
  );
}

function PText({ element }: { element: TTextElement }) {
  return (
    <p style={{
      color: element.color,
      fontSize: element.fontSize,
      textAlign: element.textAlign
    }} className={`text-center w-full break-all`}>
      {element.content}
    </p>
  );
}

function PList({ element }: { element: TListElement }) {
  return (
    <ul style={{ color: element.color, fontSize: element.fontSize }} className="flex flex-col">
      {
        element.items.map(el => <li key={el.id} className="list-disc ms-5">{el.value}</li>)
      }
    </ul>
  );
}

function PMultichoice({ element }: { element: TMultichoiceElement }) {
  if (element.variant == "multi_answer") {
    return <MultiAnswer element={element} />
  }
  return <SingleAnswer element={element} />
}

function MultiAnswer({ element }: { element: TMultichoiceMultiAnswerElement }) {
  const [errMsg, setErrMsg] = useState("");
  const [selected, setSelected] = useState<number[]>([]);
  const [isShowResult, setIsShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => console.log("selected::", selected), [selected]);

  function reset() {
    setIsShowResult(false);
    setSelected([]);
  }

  function bothHaveSameElements(arr1: number[], arr2: number[]) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  }

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      if (selected.length === 0) {
        setErrMsg("You have not select any option!");
        return;
      }

      setErrMsg("");
      setIsShowResult(true);
      // validate the answer
      if (bothHaveSameElements(element.answerIndexes, selected)) {
        setIsCorrect(true);
      } else {
        console.log("not correct");
        setIsCorrect(false);
      }

    }} style={{ fontSize: element.fontSize, color: element.color }} className="flex gap-2 flex-col">
      {
        element.options.map((opt, index) => (
          <label key={`${opt.id}`} className={`flex items-center gap-2 rounded-full px-4 py-2 ${isShowResult ? (element.answerIndexes.includes(index) ? "bg-green-50" : "bg-red-50") : "bg-gray-100"}`}>
            <input className="scale-120" type="checkbox" name={`checkbox-${element.id}`} checked={selected.includes(index)} onChange={(e) => {
              const checked = e.target.checked;
              // console.log("checked::", checked, "  index::", index);
              if (checked && selected.includes(index) === false) {
                setSelected(prev => [...prev, index]);
              } else {
                setSelected(prev => prev.filter(val => val !== index));
              }
            }} />
            <span>{opt.value}</span>
          </label>
        ))
      }
      <p className="text-red-400 text-center text-sm">{errMsg}</p>
      {
        isShowResult ? (
          isCorrect ? (
            <div className="w-full flex justify-between items-center gap-4 px-3 py-2 rounded-md bg-green-50 border-[1px] border-green-500">
              <p className="text-green-700 font-bold">Correct!</p>
              <button type="button" onClick={() => reset()} className="rotate-45 w-9 h-9 overflow-hidden  text-2xl cursor-pointer p-0.5 rounded-full hover:bg-white border-[1px] border-transparent hover:border-gray-300 flex justify-center items-center">
                <span>+</span>
              </button>
            </div>
          ) : (
            <div className="w-full flex justify-between items-center gap-4 px-3 py-2 rounded-md bg-red-50 border-[1px] border-red-500">
              <p className="text-red-700 font-bold">Wrong!</p>
              <button type="button" onClick={() => reset()} className="rotate-45 w-9 h-9 overflow-hidden  text-2xl cursor-pointer p-0.5 rounded-full hover:bg-white border-[1px] border-transparent hover:border-gray-300 flex justify-center items-center">
                <span>+</span>
              </button>
            </div>
          )
        ) : (
          <button type="submit" className="self-end cursor-pointer rounded-md bg-gray-100 hover:bg-gray-300 text-black text-sm px-3 py-2">check answer</button>
        )
      }
    </form>
  );
}

function SingleAnswer({ element }: { element: TMultichoiceSingleAnswerElement }) {
  const [errMsg, setErrMsg] = useState("");
  const [selected, setSelected] = useState<number | null>(null);
  const [isShowResult, setIsShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  function reset() {
    setIsShowResult(false);
    setSelected(null);
  }

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      if (selected == null) {
        setErrMsg("You have not select any option!");
        return;
      }

      setErrMsg("");
      setIsShowResult(true);
      // validate the answer
      if (selected === element.answerIndex) {
        setIsCorrect(true);
      } else {
        setIsCorrect(false);
      }

    }} style={{ fontSize: element.fontSize, color: element.color }} className="flex gap-2 flex-col">
      {
        element.options.map((opt, index) => (
          <label key={`${opt.id}`} className={`flex items-center gap-2 rounded-full px-4 py-2 ${isShowResult ? (element.answerIndex === index ? "bg-green-50" : "bg-red-50") : "bg-gray-100"}`}>
            <input className="scale-120" type="radio" name={`radio-${element.id}`} checked={selected === index} onChange={(e) => {
              const checked = e.target.checked;
              // console.log("checked::", checked, "  index::", index);
              if (checked) {
                setSelected(index);
              }
            }} />
            <span>{opt.value}</span>
          </label>
        ))
      }
      <p className="text-red-400 text-center text-sm">{errMsg}</p>
      {
        isShowResult ? (
          isCorrect ? (
            <div className="w-full flex justify-between items-center gap-4 px-3 py-2 rounded-md bg-green-50 border-[1px] border-green-500">
              <p className="text-green-700 font-bold">Correct!</p>
              <button type="button" onClick={() => reset()} className="rotate-45 w-9 h-9 overflow-hidden  text-2xl cursor-pointer p-0.5 rounded-full hover:bg-white border-[1px] border-transparent hover:border-gray-300 flex justify-center items-center">
                <span>+</span>
              </button>
            </div>
          ) : (
            <div className="w-full flex justify-between items-center gap-4 px-3 py-2 rounded-md bg-red-50 border-[1px] border-red-500">
              <p className="text-red-700 font-bold">Wrong!</p>
              <button type="button" onClick={() => reset()} className="rotate-45 w-9 h-9 overflow-hidden  text-2xl cursor-pointer p-0.5 rounded-full hover:bg-white border-[1px] border-transparent hover:border-gray-300 flex justify-center items-center">
                <span>+</span>
              </button>
            </div>
          )
        ) : (
          <button type="submit" className="self-end cursor-pointer rounded-md bg-gray-100 hover:bg-gray-300 text-black text-sm px-3 py-2">check answer</button>
        )
      }
    </form>
  );
}


function mapToComponent(element: TElement): ReactNode {
  switch (element.type) {
    case "link":
      return <PLink key={element.id} element={element} />
    case "text":
      return <PText key={element.id} element={element} />
    case "list":
      return <PList key={element.id} element={element} />
    case "multichoice": {
      return <PMultichoice key={element.id} element={element} />
    }
    default:
      return ""
  }
}
