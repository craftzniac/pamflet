import { useNavigate, useNavigation } from "react-router";
import { Button } from "~/components/ui/button";

export default function BackButton() {
    const navigate = useNavigate()
    return (
        <Button variant="ghost" size="icon-lg" className="rounded-full" onClick={() => navigate(-1)}>
            <img src="/arrow_left.svg" alt="arrow left" />
        </Button>
    )
}
