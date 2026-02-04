import { useRef, useEffect, useState } from "react";
import { motion, useInView, useMotionValue, useTransform, animate, AnimatePresence } from "framer-motion";
import DecryptedText from "./ui/DecryptedText";

const stats = [
    {
        number: 7,
        label: "Websites",
        theme: "orange",
        primary: "Designed and developed responsive websites across fintech, marketing, and dashboard platforms.",
        secondary: "Handled UX, UI, and front-end implementation using HTML and CSS, delivering scalable and conversion-focused web experiences."
    },
    {
        number: 3,
        label: "Applications",
        theme: "silver",
        primary: "Designed complete mobile application experiences from concept to high-fidelity UI.",
        secondary: "Created user flows, wireframes, and polished interfaces, working closely with developers to ensure usability and smooth implementation."
    },
    {
        number: 3,
        label: "Freelance",
        theme: "dark",
        primary: "Designed and developed digital products independently for freelance clients.",
        secondary: "Delivered one mobile application design and two fully developed responsive websites, managing UX, UI, and front-end execution end to end."
    },
];

export default function ProjectsSection() {
    return (
        <section className="bg-[#0a0a0a] text-white py-24 sm:py-32 relative overflow-hidden" id="projects">
            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Header & Impact Statement (Centered Top) */}
                <div className="mb-20">
                    <div className="flex items-center space-x-4 mb-8">
                        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent flex-grow" />
                        <h3 className="text-xl font-medium text-white/80 uppercase tracking-widest">Professional Projects</h3>
                        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent flex-grow" />
                    </div>

                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-white mb-6">
                            <span className="block">Delivering</span>
                            <div className="inline-flex flex-wrap justify-center gap-x-4">
                                <DecryptedText
                                    text="Measurable"
                                    speed={100}
                                    maxIterations={15}
                                    className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
                                    parentClassName="inline-block"
                                    animateOn="view"
                                />
                                <DecryptedText
                                    text="Impact"
                                    speed={100}
                                    maxIterations={15}
                                    className="text-purple-300"
                                    parentClassName="inline-block"
                                    animateOn="view"
                                />
                            </div>
                            <span className="block mt-1">Across Digital Experiences.</span>
                        </h2>
                    </div>
                </div>

                {/* Cards Grid - Full Width */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-4 md:px-0">
                    {stats.map((stat, index) => (
                        <StatsCard key={index} stat={stat} index={index} />
                    ))}
                </div>

            </div>
        </section>
    );
}

function Counter({ value }: { value: number }) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            animate(count, value, { duration: 2, ease: "easeOut" });
        }
    }, [isInView, value]);

    return <motion.span ref={ref}>{rounded}</motion.span>;
}

function StatsCard({ stat, index }: { stat: typeof stats[0], index: number }) {
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: true, margin: "-50px" });
    const [isHovered, setIsHovered] = useState(false);

    // Refined Gradients to match the "Double Glass" look
    const getThemeStyles = (theme: string) => {
        switch (theme) {
            case 'orange':
                return {
                    // Outer rim gradient
                    outer: 'from-white/10 to-white/5',
                    // Inner content gradient (Sunset: Peach/Orange bottom-left -> Blue/Grey top-right)
                    inner: 'bg-gradient-to-tr from-[#FFB4A2] via-[#E5989B]/20 to-[#6D6875]/80',
                    text: 'text-[#FFD7BA]',
                    accent: 'text-white'
                };
            case 'silver':
                return {
                    outer: 'from-white/20 to-white/5',
                    inner: 'bg-gradient-to-tr from-white/90 via-[#A0A0A0]/20 to-[#2b2b2b]/90',
                    text: 'text-white',
                    accent: 'text-black'
                };
            case 'dark':
                return {
                    outer: 'from-white/10 to-white/5',
                    inner: 'bg-gradient-to-tr from-[#2b2b2b] via-[#1a1a1a] to-black',
                    text: 'text-neutral-400',
                    accent: 'text-white'
                };
            default:
                return { outer: '', inner: '', text: '', accent: '' };
        }
    };

    const themeStyle = getThemeStyles(stat.theme);

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
            whileHover={{ y: -5 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={() => setIsHovered(!isHovered)}
            className={`relative p-1.5 rounded-[48px] bg-gradient-to-b ${themeStyle.outer} backdrop-blur-xl shadow-2xl overflow-hidden min-h-[400px] md:min-h-[500px] flex flex-col group cursor-pointer`}
        >
            {/* Inner Content Container */}
            <div className={`relative w-full h-full flex-grow rounded-[42px] p-6 md:p-8 flex flex-col justify-center overflow-hidden border border-white/10 ${themeStyle.inner} backdrop-blur-2xl transition-all duration-500`}>

                {/* Background Glow */}
                {stat.theme !== 'dark' && (
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-transparent to-black/10 pointer-events-none" />
                )}

                {/* Bottom Content Area */}
                <div className="relative z-10 flex flex-col gap-6">

                    {/* Number & Plus */}
                    <div className="flex items-start leading-none">
                        <h4 className={`text-7xl md:text-9xl font-light tracking-tighter ${themeStyle.accent}`}>
                            <Counter value={stat.number} />
                        </h4>
                        <span className={`text-4xl md:text-6xl font-light mt-2 md:mt-4 ml-1 ${themeStyle.accent}`}>+</span>
                    </div>

                    {/* Label & Description (Swap Animation) */}
                    <div className="flex flex-col gap-4 relative min-h-[140px] md:min-h-[120px]">
                        <p className={`text-2xl md:text-3xl font-medium tracking-wide ${themeStyle.accent}`}>{stat.label}</p>

                        <div className="relative">
                            <AnimatePresence mode="wait">
                                {!isHovered && (
                                    <motion.p
                                        key="primary"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                        className={`absolute top-0 left-0 text-sm md:text-base font-normal leading-relaxed opacity-80 max-w-[95%] ${stat.theme === 'silver' ? 'text-black/80' : 'text-white/80'}`}
                                    >
                                        {stat.primary}
                                    </motion.p>
                                )}
                                {isHovered && (
                                    <motion.p
                                        key="secondary"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                        className={`absolute top-0 left-0 text-sm md:text-base font-normal leading-relaxed opacity-90 max-w-[95%] ${stat.theme === 'silver' ? 'text-black' : 'text-white'}`}
                                    >
                                        {stat.secondary}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                </div>

            </div>
        </motion.div>
    );
}
