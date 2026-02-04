"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";



function MockupWireframe({
    className,
    delay = 0,
    width = 400,
    height = 100,
    rotate = 0,
    gradient = "from-white/[0.08]",
    type = "desktop"
}: {
    className?: string;
    delay?: number;
    width?: number | string;
    height?: number | string;
    rotate?: number;
    gradient?: string;
    type?: "desktop" | "mobile";
}) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: -150,
                rotate: rotate - 15,
            }}
            animate={{
                opacity: 1,
                y: 0,
                rotate: rotate,
            }}
            transition={{
                duration: 2.4,
                delay,
                ease: [0.23, 0.86, 0.39, 0.96],
                opacity: { duration: 1.2 },
            }}
            className={cn("absolute", className)}
        >
            <motion.div
                animate={{
                    y: [0, 15, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
                style={{
                    width: typeof width === "number" ? width : undefined,
                    height: typeof height === "number" ? height : undefined,
                }}
                className={cn("relative", typeof width === "string" ? width : "", typeof height === "string" ? height : "")}
            >
                <div
                    className={cn(
                        "absolute inset-0",
                        "bg-gradient-to-r to-transparent",
                        gradient,
                        "backdrop-blur-[2px] border-2 border-white/[0.15]",
                        "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
                        "after:absolute after:inset-0",
                        "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]",
                        type === "desktop" ? "rounded-xl" : "rounded-[2rem]"
                    )}
                >
                    <div className="absolute inset-0 h-full w-full opacity-40">
                        {type === "desktop" ? (
                            <div className="flex flex-col h-full w-full p-2 gap-2">
                                {/* Desktop Window Header */}
                                <div className="flex justify-between items-center px-1 pt-1 opacity-50">
                                    <div className="flex gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-white/40" />
                                        <div className="w-2 h-2 rounded-full bg-white/40" />
                                        <div className="w-2 h-2 rounded-full bg-white/40" />
                                    </div>
                                    <div className="h-2 w-1/3 bg-white/10 rounded-full" />
                                    <div className="w-4" /> {/* Spacer */}
                                </div>

                                <div className="flex gap-2 h-full overflow-hidden">
                                    {/* Sidebar with Nav Items */}
                                    <div className="w-[20%] bg-white/5 rounded-lg h-full p-1.5 flex flex-col gap-1.5">
                                        <div className="h-4 w-full bg-white/20 rounded-md mb-1" />
                                        {[1, 2, 3, 4].map(i => (
                                            <div key={i} className="flex items-center gap-1.5">
                                                <div className="w-2 h-2 rounded-sm bg-white/20" />
                                                <div className="h-1.5 w-2/3 bg-white/10 rounded-full" />
                                            </div>
                                        ))}
                                        <div className="mt-auto h-16 w-full bg-white/5 rounded-md relative overflow-hidden">
                                            {/* Mini chart in sidebar */}
                                            <div className="absolute bottom-0 left-0 right-0 h-1/2 flex items-end gap-0.5 px-1 justify-around">
                                                <div className="w-1 h-3 bg-white/20" />
                                                <div className="w-1 h-5 bg-white/20" />
                                                <div className="w-1 h-2 bg-white/20" />
                                                <div className="w-1 h-4 bg-white/20" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Main Content Area */}
                                    <div className="flex-1 flex flex-col gap-2">
                                        {/* Top Stats Row */}
                                        <div className="flex gap-2 h-1/4">
                                            <div className="flex-1 bg-white/10 rounded-lg p-1.5 flex flex-col justify-between">
                                                <div className="w-4 h-4 rounded-full bg-white/20" />
                                                <div className="h-2 w-1/2 bg-white/20 rounded-full" />
                                            </div>
                                            <div className="flex-1 bg-white/10 rounded-lg p-1.5 flex flex-col justify-between">
                                                <div className="w-4 h-4 rounded-full bg-white/20" />
                                                <div className="h-2 w-1/2 bg-white/20 rounded-full" />
                                            </div>
                                            <div className="flex-1 bg-white/10 rounded-lg p-1.5 flex flex-col justify-between">
                                                {/* Progress circle */}
                                                <div className="w-6 h-6 rounded-full border-2 border-white/20 mx-auto" />
                                            </div>
                                        </div>

                                        {/* Big Chart Area */}
                                        <div className="flex-1 bg-white/5 rounded-lg p-2 relative overflow-hidden">
                                            <div className="flex justify-between items-center mb-2">
                                                <div className="h-2 w-1/4 bg-white/20 rounded-full" />
                                                <div className="h-4 w-12 bg-white/10 rounded-full" />
                                            </div>
                                            {/* Simulated Line Chart */}
                                            <div className="absolute bottom-2 left-2 right-2 top-8 flex items-end gap-1">
                                                {[40, 60, 45, 75, 55, 80, 70, 90, 65].map((h, i) => (
                                                    <div key={i} className="flex-1 bg-white/10 rounded-t-sm" style={{ height: `${h}%` }} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col h-full w-full p-3 gap-3">
                                {/* Dynamic Island */}
                                <div className="w-16 h-4 bg-black/20 rounded-full mx-auto mb-2 backdrop-blur-md border border-white/10 flex items-center justify-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500/40" />
                                </div>

                                {/* App Header */}
                                <div className="flex justify-between items-center mb-1">
                                    <div className="flex gap-2 items-center">
                                        <div className="w-8 h-8 rounded-full bg-white/20 border border-white/10" />
                                        <div className="flex flex-col gap-1">
                                            <div className="w-16 h-2 rounded-full bg-white/20" />
                                            <div className="w-10 h-1.5 rounded-full bg-white/10" />
                                        </div>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-white/5 p-1.5">
                                        <div className="w-full h-full rounded-sm border-2 border-white/20" />
                                    </div>
                                </div>

                                {/* Credit Card / Balance Card */}
                                <div className="w-full aspect-video bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-3 relative overflow-hidden border border-white/5">
                                    <div className="absolute top-3 right-3 w-8 h-5 rounded-sm bg-white/10" /> {/* Chip */}
                                    <div className="mt-auto h-full flex flex-col justify-end gap-2">
                                        <div className="h-4 w-1/2 bg-white/20 rounded-md" />
                                        <div className="flex justify-between items-end">
                                            <div className="h-2 w-1/3 bg-white/10 rounded-full" />
                                            <div className="h-6 w-1/4 bg-white/20 rounded-full" />
                                        </div>
                                    </div>
                                </div>

                                {/* Transaction List */}
                                <div className="flex-1 flex flex-col gap-2 overflow-hidden">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="h-12 w-full bg-white/5 rounded-lg flex items-center gap-3 p-2 border border-white/5">
                                            <div className={cn("h-8 w-8 rounded-full flex items-center justify-center", i === 1 ? "bg-red-500/20 text-red-300" : "bg-green-500/20")}>
                                                <div className="w-3 h-3 rounded-full bg-current opacity-50" />
                                            </div>
                                            <div className="flex-1 flex flex-col gap-1">
                                                <div className="h-2 w-24 bg-white/20 rounded-full" />
                                                <div className="h-1.5 w-16 bg-white/10 rounded-full" />
                                            </div>
                                            <div className="w-10 h-3 bg-white/10 rounded-full" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

function HeroGeometric({
    title1 = "Elevate Your Digital Vision",
    title2 = "Crafting Exceptional Websites",
}: {
    title1?: string;
    title2?: string;
}) {
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 1, // Smoother, slower rise
                delay: 0.4 + i * 0.1, // Wait for page fade to mostly finish
                ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
            },
        }),
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303]">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

            <div className="absolute inset-0 overflow-hidden">
                {/* Desktop Wireframe - Main Dashboard */}
                <MockupWireframe
                    delay={0.3}
                    width="w-[80vw] md:w-[600px]"
                    height="h-[50vw] md:h-[340px]"
                    rotate={12}
                    gradient="from-emerald-500/[0.15]"
                    className="left-[-10%] md:left-[-5%] top-[10%] md:top-[20%] opacity-40 md:opacity-70"
                    type="desktop"
                />

                {/* Mobile Wireframe - Wallet App */}
                <MockupWireframe
                    delay={0.5}
                    width="w-[40vw] md:w-[200px]"
                    height="h-[70vw] md:h-[400px]"
                    rotate={-15}
                    gradient="from-cyan-500/[0.3]" // Increased from 0.15
                    className="right-[-10%] md:right-[0%] top-[60%] md:top-[75%] opacity-70 md:opacity-90" // Increased opacity
                    type="mobile"
                />

                {/* Desktop Wireframe - Analytics */}
                <MockupWireframe
                    delay={0.4}
                    width="w-[50vw] md:w-[300px]"
                    height="h-[30vw] md:h-[200px]"
                    rotate={-8}
                    gradient="from-purple-500/[0.15]"
                    className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%] opacity-40 md:opacity-70"
                    type="desktop"
                />

                {/* Mobile Wireframe - Profile */}
                <MockupWireframe
                    delay={0.6}
                    width="w-[30vw] md:w-[180px]"
                    height="h-[60vw] md:h-[360px]"
                    rotate={20}
                    gradient="from-orange-500/[0.15]"
                    className="right-[20%] md:right-[20%] top-[5%] md:top-[15%] opacity-40 md:opacity-70"
                    type="mobile"
                />
            </div>

            <div className="relative z-10 container mx-auto px-4 md:px-6">
                <div className="max-w-3xl mx-auto text-center">


                    <motion.div
                        custom={1}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-2 md:mb-4 tracking-tight leading-tight px-4 w-full">
                            <span className="block bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80 pb-4 whitespace-nowrap">
                                {title1}
                            </span>
                            <span
                                className={cn(
                                    "block text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-white/90 to-sky-400 whitespace-nowrap pb-4"
                                )}
                            >
                                {title2}
                            </span>
                        </h1>
                    </motion.div>

                    <motion.div
                        custom={2}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <p className="text-base sm:text-lg md:text-xl text-white/[0.4] md:text-white/[0.45] mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
                            Crafting intuitive & engaging experiences
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
            >
                <span className="text-white/30 text-xs font-light tracking-widest uppercase">Scroll</span>
                <div className="w-[30px] h-[50px] rounded-full border-2 border-white/20 flex justify-center p-2">
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="w-1.5 h-1.5 rounded-full bg-white/50"
                    />
                </div>
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
        </div>
    );
}

export { HeroGeometric };
