export default function FlashcardNotFound() {
    return (
        <div className="flex flex-col gap-1 items-center w-full">
            <div className="p-6 min-h-100 max-h-100 overflow-y-auto max-w-90 text-lg w-full transition-colors rounded-2xl bg-white gap-4 shadow-md border-gray-300 border-[1px] font-body relative flex justify-center items-center">
                <i>!!Flashcard not found!!</i>
            </div>
        </div>
    );
}
