"use client";

import DisplayCards from "./ui/display-cards";
import { Award, Lightbulb, Eye, Brain, Users, Layers } from "lucide-react";


const certifications = [
    {
        icon: <Award className="size-4 text-blue-300" />,
        title: "Google UX Design",
        description: "COURSERA",
        date: "Professional Certificate",
        iconClassName: "text-blue-500",
        titleClassName: "text-blue-500",
    },
    {
        icon: <Lightbulb className="size-4 text-yellow-300" />,
        title: "User Experience",
        description: "ACCENTURE",
        date: "Certificate of Achievement",
        iconClassName: "text-yellow-500",
        titleClassName: "text-yellow-500",
    },
    {
        icon: <Eye className="size-4 text-green-300" />,
        title: "Visual Communication",
        description: "NPTEL (SWAYAM)",
        date: "Online Course",
        iconClassName: "text-green-500",
        titleClassName: "text-green-500",
    },
    {
        icon: <Brain className="size-4 text-purple-300" />,
        title: "Augmenting Design Thinking with Human-Computer Interaction",
        description: "NPTEL (SWAYAM)",
        date: "Online Course",
        iconClassName: "text-purple-500",
        titleClassName: "text-purple-500",
    },
    {
        icon: <Users className="size-4 text-pink-300" />,
        title: "Intro Human-Centered Design",
        description: "ACUMEN ACADEMY",
        date: "Course",
        iconClassName: "text-pink-500",
        titleClassName: "text-pink-500",
    },
    {
        icon: <Layers className="size-4 text-orange-300" />,
        title: "HCD 201: Prototyping",
        description: "ACUMEN ACADEMY",
        date: "Course",
        iconClassName: "text-orange-500",
        titleClassName: "text-orange-500",
    }
];

export default function CertificationsSection() {
    // Helper to assign classNames for the stacking effect
    const cardClasses = [
        "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
        "[grid-area:stack] translate-x-6 translate-y-6 md:translate-x-12 md:translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
        "[grid-area:stack] translate-x-12 translate-y-12 md:translate-x-24 md:translate-y-20 hover:translate-y-10"
    ];

    // Split into two groups of 3
    const group1 = certifications.slice(0, 3).map((cert, i) => ({
        ...cert,
        className: cardClasses[i]
    }));

    const group2 = certifications.slice(3, 6).map((cert, i) => ({
        ...cert,
        className: cardClasses[i]
    }));

    return (
        <section
            className="bg-[#0a0a0a] pt-16 md:pt-20 relative overflow-hidden flex flex-col items-center justify-center"
            style={{ paddingBottom: 'calc(var(--spacing) * 30)' }}
        >

            {/* Header */}
            <div className="mb-16 md:mb-24 text-center relative z-10 px-4">
                <h3 className="text-xl font-medium text-white/80 uppercase tracking-widest mb-4">
                    Learning & Achievement
                </h3>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-6 w-full relative z-10 flex flex-col lg:flex-row items-center justify-center gap-32 lg:gap-32">
                <div className="w-full max-w-[340px] md:max-w-[400px] flex justify-center">
                    <DisplayCards cards={group1} />
                </div>
                <div className="w-full max-w-[340px] md:max-w-[400px] flex justify-center">
                    <DisplayCards cards={group2} />
                </div>
            </div>

            {/* Decorative background blur */}
            <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[20%] left-[10%] w-[300px] h-[300px] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />

        </section>
    );
}
