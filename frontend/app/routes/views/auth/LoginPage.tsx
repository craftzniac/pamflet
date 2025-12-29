import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export default function LoginPage() {
    return (
        <main className="w-full h-full p-4 flex justify-center md:items-center overflow-y-auto">
            <div className="max-w-[23rem] gap-4 flex flex-col w-full">
                <h1 className="text-2xl font-medium w-full text-center">Login</h1>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" />
                    </div>
                    <Button>Continue</Button>
                </div>
                <div className="flex items-center gap-1">
                    <hr className="w-full" />
                    <span>Or</span>
                    <hr className="w-full" />
                </div>
                <Button variant="outline">
                    <div className="w-full gap-4 flex items-center">
                        <img src="/google_logo.svg" className="w-5" />
                        <span className="text-center w-8/10">Continue with Google</span>
                    </div>
                </Button>
                <span className="flex items-center justify-center text-sm">
                    <p>Don't already have an account?</p>
                    <Button asChild variant="link">
                        <Link to="/signup" className="text-sm">Signup</Link>
                    </Button>
                </span>
            </div>
        </main>
    );
}
