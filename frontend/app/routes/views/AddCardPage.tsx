import BackButton from "../components/BackButton";
import CardForm from "../components/CardForm";

export default function AddCardPage() {
    return (
        <div className="flex flex-col h-full w-full">
            <header className="p-2 md:p-4 flex justify-center gap-1">
                <BackButton />
                <div className="flex justify-center flex-col w-full">
                    <h1 className="font-medium">Add Card</h1>
                </div>
            </header>
            <main className="h-full w-full overflow-y-auto bg-gray-50 p-4">
                <CardForm mode="add"  />
            </main>
        </div>
    )
}
