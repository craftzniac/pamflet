import Button from "../components/Button";
import Textfield from "../components/Textfield";

export default function ProfilePage() {
    return (
        <div className="flex w-full justify-center">
            <div className="max-w-160 w-full flex flex-col p-4 md:pt-8">
                <form className="flex flex-col gap-4 items-end">
                    <Textfield label="Email" disabled />
                    <Textfield label="Username" />
                    <Button className="w-fit">Save changes</Button>
                </form>
                <Button variant="destructive" className="w-fit">Delete account</Button>
            </div>
        </div>
    );
}
