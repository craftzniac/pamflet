import { Button } from "~/components/ui/button";
import TextField from "../components/TextField";
import { SaveIcon, TrashIcon } from "lucide-react";
import BottomNav from "../components/BottomNav";

export default function ProfilePage() {
    return (
        <div className="flex flex-col w-full h-full justify-center">
            <header className="p-4 w-full">
                <h1 className="font-medium">Profile</h1>
            </header>
            <main className="bg-gray-50 w-full h-full flex justify-center overflow-y-auto">
                <div className="max-w-160 w-full h-full flex flex-col gap-16 p-4 md:pt-8">
                    <section className="flex flex-col gap-4">
                        <h2 className="text-2xl font-medium">Profile Info</h2>
                        <div className="flex flex-col gap-4 w-full">
                            <TextField id="email" label="Email" disabled />
                            <div className="flex items-end gap-2">
                                <TextField id="username" label="Username" />
                                <Button className="w-fit">
                                    <SaveIcon />
                                    <span className="hidden md:block"> Save changes</span>
                                </Button>
                            </div>
                            <Button variant="destructive" className="w-fit">Delete account</Button>
                        </div>
                    </section>
                    <section className="flex flex-col gap-6">
                        <h2 className="text-destructive text-2xl font-medium">Danger Zone</h2>
                        <div className="flex flex-col gap-4">
                            <Button variant="outlineDestructive" className="w-fit">
                                <TrashIcon />
                                <span>Delete All Decks</span>
                            </Button>
                            <Button variant="outlineDestructive" className="w-fit">
                                <TrashIcon />
                                <span>Delete Account</span>
                            </Button>
                        </div>
                    </section>
                </div>
            </main>
            <BottomNav />
        </div>
    );
}
