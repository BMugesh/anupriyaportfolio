import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ParallaxWrapperProps {
    children: React.ReactNode;
    className?: string;
    speed?: number; // Target yPercent for the background element
}

export const ParallaxWrapper = ({ children, className = "", speed = 30 }: ParallaxWrapperProps) => {
    const container = useRef<HTMLDivElement>(null);
    const target = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!container.current || !target.current) return;

        gsap.to(target.current, {
            yPercent: speed,
            ease: "none",
            scrollTrigger: {
                trigger: container.current,
                start: "top bottom", // Start when the top of the container hits the bottom of the viewport
                end: "bottom top",   // End when the bottom of the container hits the top of the viewport
                scrub: 1,            // Smooth 1-second scrub catch-up
            },
        });
    }, { scope: container });

    return (
        <div ref={container} className={`relative overflow-hidden ${className}`}>
            {/* 
        We set the target to have negative top/bottom margins to ensure it doesn't 
        show empty space when shifted by yPercent 
      */}
            <div
                ref={target}
                className="absolute inset-0 w-full h-[130%] -top-[15%] will-change-transform"
            >
                {children}
            </div>
        </div>
    );
};
