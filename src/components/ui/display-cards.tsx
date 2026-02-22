"use client";

import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import { useState, useCallback, useEffect } from "react";

export interface DisplayCardProps {
    className?: string;
    icon?: React.ReactNode;
    title?: string;
    description?: string;
    date?: string;
    iconClassName?: string;
    titleClassName?: string;
}

// Maps card index to the same translate the desktop hover applies
const activeTranslates = [
    "!-translate-y-10",  // card 0: same as hover:-translate-y-10
    "!-translate-y-1",   // card 1: same as hover:-translate-y-1
    "!translate-y-10",   // card 2: same as hover:translate-y-10
];

function DisplayCard({
    className,
    icon = <Sparkles className="size-4 text-blue-300" />,
    title = "Featured",
    description = "Discover amazing content",
    date = "Just now",
    titleClassName = "text-blue-500",
    isActive = false,
    activeTranslate = "",
    onTap,
}: DisplayCardProps & { isActive?: boolean; activeTranslate?: string; onTap?: () => void }) {
    return (
        <div
            onClick={onTap}
            className={cn(
                "relative flex h-36 w-[18rem] md:w-[22rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border-2 bg-muted/70 backdrop-blur-sm px-4 py-3 transition-all duration-700 after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-background after:to-transparent after:content-[''] hover:border-white/20 hover:bg-muted [&>*]:flex [&>*]:items-center [&>*]:gap-2 cursor-pointer",
                isActive && `border-white/20 bg-muted before:!opacity-0 !grayscale-0 ${activeTranslate}`,
                className
            )}
        >
            <div>
                <span className="relative inline-block rounded-full bg-blue-800 p-1">
                    {icon}
                </span>
                <p className={cn("text-lg font-medium", titleClassName)}>{title}</p>
            </div>
            <p className="whitespace-nowrap text-lg">{description}</p>
            <p className="text-muted-foreground">{date}</p>
        </div>
    );
}

interface DisplayCardsProps {
    cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
    const defaultCards = [
        {
            className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
        },
        {
            className: "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
        },
        {
            className: "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
        },
    ];

    const displayCards = cards || defaultCards;
    const [activeIndex, setActiveIndex] = useState(-1);
    const [isPaused, setIsPaused] = useState(false);

    // Auto cycle cards one by one, infinitely
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setActiveIndex((prev) => {
                const next = prev + 1;
                return next >= displayCards.length ? 0 : next;
            });
        }, 2500);

        return () => clearInterval(interval);
    }, [displayCards.length, isPaused]);

    // Handle manual tap/click
    const handleTap = useCallback((index: number) => {
        setActiveIndex((prev) => (prev === index ? -1 : index));
        setIsPaused(true);
        // Resume auto-cycle after 4 seconds
        setTimeout(() => setIsPaused(false), 4000);
    }, []);

    return (
        <div
            className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {displayCards.map((cardProps, index) => (
                <DisplayCard
                    key={index}
                    {...cardProps}
                    isActive={activeIndex === index}
                    activeTranslate={activeTranslates[index] || ""}
                    onTap={() => handleTap(index)}
                />
            ))}
        </div>
    );
}
