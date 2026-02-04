import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface ScrollRevealProps {
    children: string;
    className?: string;
    as?: "p" | "h1" | "h2" | "h3" | "h4" | "div" | "span";
}

export function ScrollReveal({ children, className, as: Component = "p" }: ScrollRevealProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 0.9", "start 0.25"], // Adjust offsets to control when the reveal happens relative to viewport
    });

    const words = children.split(" ");

    return (
        <Component ref={containerRef as any} className={className}>
            {words.map((word, i) => {
                const start = i / words.length;
                const end = start + 1 / words.length;
                return (
                    <Word key={i} progress={scrollYProgress} range={[start, end]}>
                        {word}
                    </Word>
                );
            })}
        </Component>
    );
}

const Word = ({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) => {
    const opacity = useTransform(progress, range, [0.1, 1]); // 0.1 is dimmed, 1 is fully visible

    return (
        <span className="relative mx-1 lg:mx-2.5 inline-block">
            <span className="absolute opacity-[0.1]">{children}</span>
            <motion.span style={{ opacity }}>{children}</motion.span>
        </span>
    );
};
