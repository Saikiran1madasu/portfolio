import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const skills = [
    {
        title: "UX / UI Skills",
        description: "User Research, Wireframing, Prototyping, Interaction Design, Visual Design, Typography, Design Systems and Micro-interactions.",
    },
    {
        title: "Technical Skills",
        description: "HTML & CSS (Design Implementation), Responsive Design, Tailwind CSS, Design–Developer Handoff and AI-assisted Development Workflows.",
    },
    {
        title: "Research & Analysis",
        description: "User Behavior Analysis, Competitor Analysis, Problem Framing and Insight Synthesis.",
    },
    {
        title: "Soft Skills",
        description: "Critical Thinking, Clear Communication, Collaboration, Adaptability and Attention to Detail.",
    },
];

export default function SkillsSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

    // Calculate dynamic height based on number of cards

    // 400 units per card for smooth curves matching the reference


    return (
        <section className="bg-[#0a0a0a] min-h-screen relative overflow-hidden text-white pt-0" id="skills">

            {/* Timeline Container - Relative Parent for Line & Content */}
            <div
                ref={containerRef}
                className="w-full max-w-[600px] mx-auto relative px-4 sm:px-0 pt-0"
            >

                {/* SVG Path Background - Starts from top of this container */}
                <svg
                    style={{
                        position: "absolute",
                        top: 0,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "100%",
                        height: "250vh", // User specific height
                        pointerEvents: "none",
                        zIndex: 0,
                        overflow: 'visible'
                    }}
                    viewBox="0 0 400 2200" // User specific viewBox
                    preserveAspectRatio="xMidYMid slice"
                >
                    <motion.path
                        d="M 200 0 Q 150 150 200 300 Q 250 550 200 700 Q 150 950 200 1100 Q 250 1350 200 1500 Q 250 1450 200 1600 L 200 2100"
                        stroke="rgba(255, 255, 255, 0.5)"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                        style={{ pathLength }}
                    />
                </svg>

                {/* Title Section - Now inside container so line starts behind it */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-20 relative z-10 bg-[#0a0a0a]"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Skills</h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
                </motion.div>

                {/* Cards container */}
                <div className="flex flex-col gap-[120px] md:gap-[200px] relative z-10">
                    {skills.map((skill, index) => (
                        <SkillCard key={index} skill={skill} />
                    ))}
                </div>

            </div>
        </section>
    );
}

function SkillCard({ skill }: { skill: typeof skills[0] }) {
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 0 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="group relative p-6 md:p-10 rounded-2xl bg-white/5 backdrop-blur-md border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)] overflow-hidden transition-all duration-500"
            whileHover={{ y: -5 }}
        >
            <h3 className="text-2xl font-bold text-white mb-4">{skill.title}</h3>
            <p className="text-base text-neutral-300 leading-relaxed">
                {skill.description}
            </p>
        </motion.div>
    );
}
