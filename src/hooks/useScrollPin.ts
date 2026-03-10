import { useEffect, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useScrollPin(
    heroRef: RefObject<HTMLElement>,
    cardRef: RefObject<HTMLElement>
) {
    useEffect(() => {
        // Wait a frame to ensure the DOM is painted and Lenis (if any) is initialised
        const timeout = setTimeout(() => {
            if (!heroRef.current || !cardRef.current) return;

            const hero = heroRef.current;
            const card = cardRef.current;

            // Pin the hero section while the user scrolls through it
            ScrollTrigger.create({
                trigger: hero,
                start: "top top",
                end: "+=80%",
                pin: true,
                pinSpacing: true,
                id: "hero-pin",
            });

            // Z-axis zoom: scale the glass card UP and fade out as user scrolls
            gsap.timeline({
                scrollTrigger: {
                    trigger: hero,
                    start: "top top",
                    end: "+=70%",
                    scrub: 1.5,
                    id: "hero-zoom",
                },
            }).to(card, {
                scale: 1.3,
                opacity: 0,
                filter: "blur(8px)",
                ease: "none",
            });

            ScrollTrigger.refresh();
        }, 100);

        return () => {
            clearTimeout(timeout);
            ScrollTrigger.getById("hero-pin")?.kill();
            ScrollTrigger.getById("hero-zoom")?.kill();
        };
    }, [heroRef, cardRef]);
}
