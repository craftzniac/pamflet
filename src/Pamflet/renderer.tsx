import { useEffect, useState, type ReactNode } from "react";
import { Parser, type TElement, type TLinkElement, type TListElement, type TMultichoiceElement, type TTextElement } from "./parser";

export default function Renderer({ inputchars }: { inputchars: string }) {
  // const parserRef = useRef(new Parser(inputchars));
  const [elements, setElements] = useState<TElement[]>([]);

  useEffect(() => {
    setElements(new Parser(inputchars).parse());
  }, [inputchars]);

  return (
    <div className="p-3 h-140 overflow-y-auto  max-w-140 text-lg w-full border-2 border-gray-400 outline-gray-500 transition-colors rounded-md gap-4 flex justify-center items-center"
    >
      <div className="flex flex-col w-fit h-fit gap-2">
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
    <ul className="flex flex-col">
      {
        element.items.map(el => <li key={el.id} className="list-disc ms-3">{el.value}</li>)
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

function MultiAnswer({ element }: { element: TMultichoiceElement }) {
  return (
    <div style={{ fontSize: element.fontSize, color: element.color }} className="flex gap-2 flex-col">
      {
        element.options.map(opt => (
          <label key={opt.id} className="flex items-center gap-1">
            <input type="checkbox" name={`checkbox-${element.id}`} />
            <span>{opt.value}</span>
          </label>
        ))
      }
    </div>
  );
}

function SingleAnswer({ element }: { element: TMultichoiceElement }) {
  return (
    <div style={{ fontSize: element.fontSize, color: element.color }} className="flex gap-2 flex-col p-2 rounded border-[1px] border-gray-300">
      {
        element.options.map(opt => (
          <label key={`${opt.id}`} className="flex items-center gap-1">
            <input type="radio" name={`radio-${element.id}`} />
            <span>{opt.value}</span>
          </label>
        ))
      }
      <button type="button" className="self-end cursor-pointer rounded-md bg-gray-200 hover:bg-gray-300 text-black text-sm px-2 py-1">submit</button>
    </div>
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
