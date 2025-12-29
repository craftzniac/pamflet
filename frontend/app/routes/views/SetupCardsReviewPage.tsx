import { Input } from "~/components/ui/input";
import BottomNav from "../components/BottomNav";
import Logo from "../components/Logo";
import { useState } from "react";
import { cn } from "~/utils";
import { Button } from "~/components/ui/button";
import { Switch } from "~/components/ui/switch";

const decks = [
    {
        id: "chip_1",
        name: "Programming in C",
    },
    {
        id: "chip_2",
        name: "rust practice",
    },
    {
        id: "chip_3",
        name: "new russian words",
    },
    {
        id: "chip_4",
        name: "geography",
    },
    {
        id: "chip_5",
        name: "simple phrases",
    },
    {
        id: "chip_6",
        name: "core 1 anatomy",
    },
]

function isDeckSelected(selectedDeckIds: string[], deckId: string) {
    return selectedDeckIds.includes(deckId);
}

export default function SetupCardsReviewPage() {
    const [selectedDeckIds, setSelectedDeckIds] = useState<string[]>([]);
    const [maxNumberOfCards, setMaxNumberOfCards] = useState(100);
    const [isReverseCardOrder, setIsReverseCardOrder] = useState(false);
    const upperLimit = 1000;

    function toggleDeckSelection(deckId: string) {
        if (selectedDeckIds.includes(deckId)) {
            setSelectedDeckIds(prev => {
                return prev.filter(id => id != deckId)
            })
        } else {
            setSelectedDeckIds(prev => [deckId, ...prev])
        }
    }

    return (
        <div className="w-full h-full flex flex-col">
            <header className="p-4 flex items-center">
                <div className="flex items-center gap-1">
                    <Logo />
                    <h1 className="font-medium">Setup Cards Review</h1>
                </div>
            </header>
            <main className="flex flex-col p-4 h-full w-full overflow-y-auto gap-8 bg-gray-50">
                <section className="flex flex-col gap-3">
                    <div className="flex justify-between">
                        <h2 className="font-medium">Choose Decks</h2>
                        <p>{selectedDeckIds.length}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {
                            decks.map(chip => (
                                <Chip
                                    key={chip.id}
                                    label={chip.name}
                                    value={chip.id}
                                    isSelected={isDeckSelected(selectedDeckIds, chip.id)}
                                    setIsSelected={deckId => toggleDeckSelection(deckId)}
                                />
                            ))
                        }
                    </div>
                </section>
                <section className="flex justify-between gap-3">
                    <h2 className="font-medium">Max. number of Cards</h2>
                    <SteppedNumberInput value={maxNumberOfCards} upperLimit={upperLimit} setValue={setMaxNumberOfCards} />
                </section>
                <section className="flex justify-between gap-3 items-center">
                    <label htmlFor="shuffle-cards-switch">
                        <h2 className="font-medium">Shuffle Cards</h2>
                    </label>
                    <Switch id="shuffle-cards-switch" />
                </section>
                <section className="flex justify-between gap-3 items-center">
                    <label htmlFor="reverse-cards-switch">
                        <h2 className="font-medium">
                            Reverse Card Order
                        </h2>
                    </label>
                    <Switch id="reverse-cards-switch" />
                </section>
                <Button disabled={selectedDeckIds.length == 0} className="w-fit">Begin Card Review</Button>
            </main>
            <BottomNav />
        </div>
    )
}


type SteppedNumberInputProps = {
    value: number,
    setValue: (fn: (prev: number) => number) => void,
    upperLimit: number
}

function SteppedNumberInput({ value, setValue, upperLimit }: SteppedNumberInputProps) {
    const maxValue = 1000;

    function increment() {
        setValue(prev => {
            const forward = prev + 1
            if (forward > maxValue) {
                return prev
            } else {
                return forward
            }
        })
    }

    function decrement() {
        setValue(prev => {
            const backward = prev - 1
            if (backward < 0) {
                return prev
            } else {
                return backward
            }
        })
    }

    return (
        <div className="flex items-center h-10">
            <Button size="icon" variant="secondary" className="rounded-r-[0px] shadow text-foreground" onClick={decrement}>
                <img src="/minus.svg" alt="dash" />
            </Button>
            <div className="w-[1px] h-9 bg-gray-400"></div>
            <Input className="w-15 rounded-none text-sm shadow" value={value} onChange={(e) => {
                let _val = e.target.value.trim()
                if (_val == "") {
                    setValue(prev => 0)
                    return;
                }

                const val = parseInt(_val)
                if (isNaN(val) == false && val <= maxValue) { // i.e it's a valid number
                    setValue(prev => val)
                }
            }} />
            <div className="w-[1px] h-9 bg-gray-400"></div>
            <Button size="icon" variant="secondary" className="rounded-l-[0px] shadow text-foreground" onClick={increment}>
                <img src="/plus.svg" alt="plus" />
            </Button>
        </div>
    )
}

function Chip({ value, label, isSelected, setIsSelected }: { label: string, value: string, isSelected: boolean, setIsSelected: (deckId: string) => void }) {
    return (
        <label className={cn("rounded-full px-4 py-1 bg-transparent border-[1px] border-gray-100", isSelected ? "bg-purple-400 text-white" : "hover:bg-purple-100 text-gray-900")}>
            <Input type="checkbox" className="hidden" value={isSelected ? "on" : "off"} onChange={e => {
                setIsSelected(value);
            }} />
            <span className="text-sm">{label}</span>
        </label>
    )
}
