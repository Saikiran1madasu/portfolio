import { useState, useEffect, useRef } from 'react';


interface DecryptedTextProps {
    text: string;
    speed?: number;
    maxIterations?: number;
    sequential?: boolean;
    revealDirection?: "start" | "end" | "center";
    useOriginalCharsOnly?: boolean;
    characters?: string;
    className?: string;
    parentClassName?: string;
    encryptedClassName?: string;
    animateOn?: "view" | "hover";
}

export default function DecryptedText({
    text,
    speed = 50,
    maxIterations = 10,
    sequential = false,
    revealDirection = "start",
    useOriginalCharsOnly = false,
    characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+",
    className = "",
    parentClassName = "",

    animateOn = "hover",
}: DecryptedTextProps) {
    const [displayText, setDisplayText] = useState(text);
    const [isHovering, setIsHovering] = useState(false);
    const [isScrolledIntoView, setIsScrolledIntoView] = useState(false);
    const containerRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        let interval: any;
        let currentIteration = 0;

        const getRandomChar = () =>
            characters[Math.floor(Math.random() * characters.length)];

        const animate = () => {
            interval = setInterval(() => {
                setDisplayText(() =>
                    text
                        .split("")
                        .map((char, index) => {
                            if (char === " ") return " ";
                            if (currentIteration >= maxIterations + index) {
                                return char;
                            }
                            return getRandomChar();
                        })
                        .join("")
                );

                if (currentIteration >= maxIterations + text.length) {
                    clearInterval(interval);
                    setDisplayText(text);
                }

                currentIteration += 1 / 3; // Slow down iteration for smoother effect
            }, speed);
        };

        if (animateOn === "view" && isScrolledIntoView) {
            animate();
        } else if (animateOn === "hover" && isHovering) {
            animate();
        } else {
            setDisplayText(text); // Reset
        }

        return () => clearInterval(interval);
    }, [
        text,
        speed,
        maxIterations,
        sequential,
        revealDirection,
        useOriginalCharsOnly,
        characters,
        animateOn,
        isHovering,
        isScrolledIntoView,
    ]);

    // Intersection Observer for "view" mode
    useEffect(() => {
        if (animateOn !== "view") return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsScrolledIntoView(true);
                    observer.disconnect(); // Run once
                }
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [animateOn]);


    return (
        <span
            ref={containerRef}
            className={`inline-block whitespace-pre-wrap ${parentClassName}`}
            onMouseEnter={() => animateOn === "hover" && setIsHovering(true)}
            onMouseLeave={() => animateOn === "hover" && setIsHovering(false)}
        >
            <span className={className}>{displayText}</span>
        </span>
    );
}
