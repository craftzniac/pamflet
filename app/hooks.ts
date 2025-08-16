import { useEffect, useState } from "react";

export function useMediaQuery() {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        if (window.innerWidth < 768) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    }, []);
    return [isMobile];
}

