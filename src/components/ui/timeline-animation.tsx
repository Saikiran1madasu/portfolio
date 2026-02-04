"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ElementType, type HTMLAttributes, type RefObject } from "react";
import { cn } from "@/lib/utils";

interface TimelineContentProps extends HTMLAttributes<HTMLElement> {
    as?: ElementType;
    animationNum?: number;
    timelineRef?: RefObject<HTMLElement | null>;
    customVariants?: any;
    threshold?: number;
}

export function TimelineContent({
    as: Component = "div",
    animationNum = 0,
    timelineRef,
    customVariants,
    threshold = 0.1,
    className,
    children,
    ...props
}: TimelineContentProps) {
    const localRef = useRef(null);
    const isInView = useInView(localRef, {
        once: true,
        amount: threshold,
        margin: "-50px"
    });

    const MotionComponent = motion(Component);

    return (
        <MotionComponent
            ref={localRef}
            custom={animationNum}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={customVariants}
            className={cn(className)}
            {...props}
        >
            {children}
        </MotionComponent>
    );
}
