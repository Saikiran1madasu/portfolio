import { TimelineContent } from "@/components/ui/timeline-animation";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useRef } from "react";

export default function AboutSection2() {
    const heroRef = useRef<HTMLDivElement>(null);

    const revealVariants = {
        visible: (i: number) => ({
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            transition: {
                delay: i * 0.2,
                duration: 0.8,
                ease: "easeOut",
            },
        }),
        hidden: {
            filter: "blur(10px)",
            y: 20,
            opacity: 0,
        },
    };

    return (
        <section className="pt-[40px] pb-24 sm:pb-32 px-4 md:px-8 bg-[#0a0a0a] relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#030303] to-[#0a0a0a] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10 w-full" ref={heroRef}>

                {/* Main Manifesto Text */}
                <div className="mb-16 md:mb-24">
                    <div className="mb-16 md:mb-24">
                        <h3 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white leading-[1.2] tracking-tight">
                            <ScrollReveal as="span">I am a</ScrollReveal>
                            <span className="inline-block px-3 py-1 mx-2 align-middle border-2 border-dashed border-blue-400 text-blue-400 rounded-lg text-2xl sm:text-4xl md:text-5xl lg:text-6xl transform translate-y-[-2px]">UI/UX Designer</span>
                            <ScrollReveal as="span">focused on creating</ScrollReveal>
                            <span className="inline-block px-3 py-1 mx-2 align-middle border-2 border-dotted border-emerald-400 text-emerald-400 rounded-lg text-2xl sm:text-4xl md:text-5xl lg:text-6xl transform translate-y-[-2px]">easy-to-use</span>
                            <ScrollReveal as="span">digital experiences. My goal is to balance visual appeal with</ScrollReveal>
                            <span className="inline-block px-3 py-1 mx-2 align-middle border-2 border-dotted border-orange-400 text-orange-400 rounded-lg text-2xl sm:text-4xl md:text-5xl lg:text-6xl transform translate-y-[-2px]">functionality</span>
                            <ScrollReveal as="span">and make complex problems simple for users.</ScrollReveal>
                        </h3>
                    </div>
                </div>

                {/* Bottom Row: Label & Button */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-t border-white/10 pt-8">

                    {/* Label */}
                    <TimelineContent
                        as="div"
                        animationNum={1}
                        timelineRef={heroRef}
                        customVariants={revealVariants}
                        className="w-full"
                    >
                        <h4 className="text-white font-semibold text-lg mb-4">About Me</h4>
                        <div className="flex flex-col gap-6">
                            <p className="text-white/60 text-base leading-relaxed">
                                I focus on user-centered design, clean interfaces, and meaningful interactions rooted in
                                understanding how people think, feel, and navigate digital products.
                            </p>
                            <p className="text-white/60 text-base leading-relaxed">
                                By combining research-driven insights with creative intuition, I design systems that are not only
                                functional, but thoughtful and engaging—where every decision serves a purpose.
                            </p>
                        </div>
                    </TimelineContent>


                </div>

            </div>
        </section>
    );
}
