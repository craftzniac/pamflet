import { Button } from "~/components/ui/button";
import TextField from "../components/TextField";

export default function ProfilePage() {
    return (
        <div className="flex flex-col w-full justify-center">
            <header className="p-4 w-full">
                <h1 className="font-medium">Profile</h1>
            </header>
            <main className="bg-gray-50 w-full h-full flex">
                <div className="max-w-160 w-full flex flex-col p-4 md:pt-8 h-full">
                    <form className="flex flex-col gap-4 items-end">
                        <TextField id="email" label="Email" disabled />
                        <TextField id="username" label="Username" />
                        <Button className="w-fit">Save changes</Button>
                    </form>
                    <Button variant="destructive" className="w-fit">Delete account</Button>
                </div>
            </main>
        </div>
    );
}
