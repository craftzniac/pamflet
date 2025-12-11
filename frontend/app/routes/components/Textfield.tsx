type Props = {
    label: string,
    disabled?: boolean
};

export default function Textfield({ label, disabled = false }: Props) {
    return (
        <div className="flex flex-col gap-1 w-full">
            <label className={`font-medium text-sm ${disabled ? "text-gray-500" : "text-gray-700"}`}>{label}</label>
            <input className={`w-full border-gray-400 border-[1px] bg-white px-3 py-2.5 rounded  disabled:text-gray-500 disabled:cursor-not-allowed`} disabled={disabled} />
        </div>
    );
}
