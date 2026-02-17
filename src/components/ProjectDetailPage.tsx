import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowLeft, Pen, Layers, Palette, Grid3x3, Sparkles, Monitor, Smartphone, MousePointer2, Figma, Code } from 'lucide-react';
import { useEffect, useRef, useLayoutEffect, useState, useCallback } from 'react';
import { useLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import projectsData from '../data/projectsData';
import DecryptedText from './ui/DecryptedText';
import Footer from './Footer';
import FloatingDock from './FloatingDock';

gsap.registerPlugin(ScrollTrigger);

const easeOutExpo = [0.16, 1, 0.3, 1] as const;
const heroEase = [0.23, 0.86, 0.39, 0.96] as const;

interface FloatingIconProps {
    icon: React.ReactNode;
    x: string;
    y: string;
    size: number;
    delay: number;
    rotate: number;
    floatRange?: number;
    floatDuration?: number;
    depth: number;
    color: string;
    mouseX: any;
    mouseY: any;
}

function FloatingIcon({ icon, x, y, size, delay, rotate, floatRange = 15, floatDuration = 12, depth, color, mouseX, mouseY }: FloatingIconProps) {
    const parallaxFactor = depth * 30;
    const springX = useSpring(useTransform(mouseX, [-0.5, 0.5], [parallaxFactor, -parallaxFactor]), { stiffness: 50, damping: 20 });
    const springY = useSpring(useTransform(mouseY, [-0.5, 0.5], [parallaxFactor, -parallaxFactor]), { stiffness: 50, damping: 20 });

    return (
        <motion.div
            initial={{ opacity: 0, y: -120, rotate: rotate - 15, scale: 0.5 }}
            animate={{ opacity: 0.55, y: 0, rotate, scale: 1 }}
            transition={{ duration: 2.4, delay, ease: heroEase, opacity: { duration: 1.2 } }}
            className="absolute will-change-transform pointer-events-none max-md:!opacity-25"
            style={{ left: x, top: y, x: springX, y: springY }}
        >
            <motion.div
                animate={{ y: [0, floatRange, 0], rotate: [rotate, rotate + 5, rotate] }}
                transition={{ duration: floatDuration, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
                style={{ width: size, height: size }}
            >
                <div
                    className="w-full h-full rounded-2xl flex items-center justify-center backdrop-blur-[2px] border-2 border-white/[0.15]"
                    style={{
                        background: `linear-gradient(135deg, ${color}20, transparent)`,
                        boxShadow: `0 8px 32px 0 rgba(255,255,255,0.1), inset 0 0 20px ${color}12`,
                    }}
                >
                    <div style={{ opacity: 0.6, color: 'rgba(255,255,255,0.8)' }}>
                        {icon}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

function GrainOverlay() {
    return (
        <div
            className="fixed inset-0 pointer-events-none z-[100] opacity-[0.06]"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat',
                backgroundSize: '128px 128px',
            }}
        />
    );
}

function DotPattern() {
    return (
        <div className="fixed inset-0 pointer-events-none z-[1]">
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                    backgroundSize: '30px 30px',
                    opacity: 0.3,
                }}
            />
        </div>
    );
}

function HorizontalLine({ delay = 0 }: { delay?: number }) {
    return (
        <motion.div
            className="w-full max-w-6xl mx-auto h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay, ease: easeOutExpo }}
        />
    );
}

export default function ProjectDetailPage() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const project = projectsData.find((p) => p.slug === slug);
    const pageRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const heroContentRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLElement>(null);
    const [isReady, setIsReady] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!heroRef.current) return;
        const rect = heroRef.current.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    }, [mouseX, mouseY]);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [handleMouseMove]);

    const lenis = useLenis();

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
        if (lenis) {
            lenis.scrollTo(0, { immediate: true });
        }
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
    }, [slug, lenis]);

    useEffect(() => {
        const timer = requestAnimationFrame(() => setIsReady(true));
        return () => cancelAnimationFrame(timer);
    }, []);

    useEffect(() => {
        if (!imageRef.current || !project) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                imageRef.current,
                { y: 80, opacity: 0, scale: 0.92 },
                { y: 0, opacity: 1, scale: 1, duration: 1.4, delay: 0.8, ease: 'power4.out' }
            );

            gsap.fromTo(
                '.project-image-inner',
                { scale: 1.08 },
                { scale: 1, duration: 1.6, delay: 0.9, ease: 'power3.out' }
            );

            gsap.to('.project-image-wrapper', {
                scrollTrigger: { trigger: '.project-image-wrapper', start: 'top 80%', end: 'bottom 20%', scrub: 1 },
                y: -30,
                ease: 'none',
            });

            gsap.fromTo(
                '.image-glow',
                { opacity: 0, scale: 0.8 },
                { opacity: 1, scale: 1, duration: 2, delay: 1.2, ease: 'power2.out' }
            );
        }, pageRef);

        return () => ctx.revert();
    }, [project, slug]);

    const { scrollYProgress } = useScroll();
    const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -80]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

    if (!project) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <div className="text-center">
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold text-white mb-4">
                        Project Not Found
                    </motion.h1>
                    <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} onClick={() => navigate('/')} className="text-white/60 hover:text-white transition-colors cursor-pointer">
                        Go back home
                    </motion.button>
                </div>
            </div>
        );
    }

    const stagger = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
    };

    const fadeUp = {
        hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: easeOutExpo } },
    };

    const scaleIn = {
        hidden: { opacity: 0, scale: 0.6 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] as const } },
    };

    const iconSize = { sm: 48, md: 60, lg: 72 };

    return (
        <div ref={pageRef} className="min-h-screen bg-[#0a0a0a] overflow-x-hidden">
            <GrainOverlay />
            <DotPattern />

            {/* Fixed Back Button */}
            <motion.button
                initial={{ opacity: 0, x: -40, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.7, delay: 0.5, ease: easeOutExpo }}
                onClick={() => navigate('/')}
                className="fixed top-6 left-6 md:top-10 md:left-10 z-50 flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-b from-white to-white/80 border border-white/40 backdrop-blur-xl text-black shadow-[0_2px_12px_rgba(255,255,255,0.2),inset_0_1px_0_rgba(255,255,255,1),inset_0_-1px_0_rgba(0,0,0,0.05)] hover:from-white hover:to-white/90 hover:shadow-[0_4px_20px_rgba(255,255,255,0.3),inset_0_1px_0_rgba(255,255,255,1),inset_0_-1px_0_rgba(0,0,0,0.05)] transition-all duration-500 cursor-pointer group"
            >
                <ArrowLeft className="size-4 group-hover:-translate-x-1.5 transition-transform duration-500 ease-out" />
                <span className="text-sm font-medium tracking-wide">Back</span>
            </motion.button>

            {/* ========== HERO SECTION ========== */}
            <motion.section
                ref={heroRef}
                style={{ y: heroY, opacity: heroOpacity }}
                className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 overflow-hidden"
            >
                {/* Gradient background overlays */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] via-transparent to-rose-500/[0.03] blur-3xl pointer-events-none" />

                {/* Subtle ambient glow */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 0.07, scale: 1 }}
                    transition={{ duration: 2.5, ease: 'easeOut' }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${project.color}20 0%, transparent 70%)` }}
                />

                {/* Floating glassmorphic icons with mouse interaction */}
                <div className="absolute inset-0 overflow-hidden">
                    {isReady && (
                        <>
                            <FloatingIcon icon={<Pen size={22} />} x="8%" y="15%" size={iconSize.md} delay={0.3} rotate={12} depth={0.8} color={project.color} mouseX={mouseX} mouseY={mouseY} floatDuration={10} />
                            <FloatingIcon icon={<Layers size={28} />} x="85%" y="20%" size={iconSize.lg} delay={0.5} rotate={-8} depth={1} color={project.color} mouseX={mouseX} mouseY={mouseY} floatDuration={14} />
                            <FloatingIcon icon={<Palette size={20} />} x="12%" y="70%" size={iconSize.sm} delay={0.7} rotate={20} depth={0.5} color={project.color} mouseX={mouseX} mouseY={mouseY} floatDuration={11} />
                            <FloatingIcon icon={<Grid3x3 size={24} />} x="78%" y="65%" size={iconSize.md} delay={0.4} rotate={-15} depth={0.7} color={project.color} mouseX={mouseX} mouseY={mouseY} floatDuration={13} />
                            <FloatingIcon icon={<Sparkles size={18} />} x="25%" y="80%" size={iconSize.sm} delay={0.9} rotate={8} depth={0.4} color={project.color} mouseX={mouseX} mouseY={mouseY} floatDuration={9} />
                            <FloatingIcon icon={<Monitor size={26} />} x="70%" y="10%" size={iconSize.md} delay={0.6} rotate={-12} depth={0.9} color={project.color} mouseX={mouseX} mouseY={mouseY} floatDuration={12} />
                            <FloatingIcon icon={<Smartphone size={20} />} x="5%" y="45%" size={iconSize.sm} delay={0.8} rotate={15} depth={0.6} color={project.color} mouseX={mouseX} mouseY={mouseY} floatDuration={10} />
                            <FloatingIcon icon={<MousePointer2 size={22} />} x="90%" y="45%" size={iconSize.sm} delay={1.0} rotate={-20} depth={0.5} color={project.color} mouseX={mouseX} mouseY={mouseY} floatDuration={11} />
                            <FloatingIcon icon={<Figma size={24} />} x="40%" y="5%" size={iconSize.md} delay={0.35} rotate={6} depth={0.8} color={project.color} mouseX={mouseX} mouseY={mouseY} floatDuration={13} />
                            <FloatingIcon icon={<Code size={18} />} x="60%" y="85%" size={iconSize.sm} delay={1.1} rotate={-10} depth={0.4} color={project.color} mouseX={mouseX} mouseY={mouseY} floatDuration={9} />
                        </>
                    )}
                </div>

                {/* Top/bottom depth gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/80 pointer-events-none z-[2]" />

                {/* Content */}
                <motion.div
                    ref={heroContentRef}
                    variants={stagger}
                    initial="hidden"
                    animate="visible"
                    className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto"
                >
                    {/* Decorative top line */}
                    <motion.div
                        variants={fadeUp}
                        className="w-px h-16 mb-8"
                        style={{ background: `linear-gradient(to bottom, transparent, ${project.color}60)` }}
                    />

                    {/* Subtitle badge */}
                    <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
                        <div className="h-px w-8" style={{ backgroundColor: `${project.color}50` }} />
                        <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.4em]" style={{ color: project.color }}>
                            {project.subtitle}
                        </span>
                        <div className="h-px w-8" style={{ backgroundColor: `${project.color}50` }} />
                    </motion.div>

                    {/* Title with DecryptedText */}
                    <motion.div variants={fadeUp}>
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white leading-[0.9] tracking-tight">
                            <DecryptedText
                                text={project.title}
                                speed={35}
                                maxIterations={15}
                                className="text-white"
                                parentClassName="inline-block"
                                animateOn="view"
                            />
                        </h1>
                    </motion.div>

                    {/* Decorative line under title */}
                    <motion.div
                        variants={fadeUp}
                        className="mt-6 h-1 rounded-full"
                        style={{ width: '80px', background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
                    />

                    {/* Description */}
                    <motion.p variants={fadeUp} className="text-white/40 text-base md:text-lg lg:text-xl mt-8 max-w-2xl mx-auto leading-relaxed font-light">
                        {project.description}
                    </motion.p>

                    {/* Tags */}
                    <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mt-10 justify-center">
                        {project.tags.map((tag) => (
                            <motion.span
                                key={tag}
                                variants={scaleIn}
                                className="px-5 py-2 rounded-full text-xs md:text-sm font-medium backdrop-blur-xl border transition-all duration-300 hover:scale-105"
                                style={{
                                    borderColor: `${project.color}20`,
                                    color: `${project.color}cc`,
                                    background: `linear-gradient(135deg, ${project.color}08, ${project.color}03)`,
                                }}
                                whileHover={{
                                    borderColor: `${project.color}40`,
                                    background: `linear-gradient(135deg, ${project.color}15, ${project.color}08)`,
                                }}
                            >
                                {tag}
                            </motion.span>
                        ))}
                    </motion.div>
                    {/* Scroll Indicator */}
                    <motion.div
                        variants={fadeUp}
                        className="mt-14 flex flex-col items-center gap-2 pointer-events-none"
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
                </motion.div>
            </motion.section>

            {/* ========== PROJECT IMAGE SECTION ========== */}
            <section className="relative px-4 md:px-8 lg:px-12 pb-24">
                <HorizontalLine delay={1} />

                <div ref={imageRef} className="project-image-wrapper relative max-w-6xl mx-auto" style={{ opacity: 0 }}>
                    <div
                        className="image-glow absolute -inset-8 rounded-3xl pointer-events-none"
                        style={{ background: `radial-gradient(ellipse at center, ${project.color}10 0%, transparent 60%)`, opacity: 0 }}
                    />

                    <div
                        className="relative rounded-2xl overflow-hidden border border-white/[0.06]"
                        style={{ boxShadow: `0 0 100px ${project.color}08, 0 25px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.03)` }}
                    >
                        <div className="flex items-center gap-2 px-5 py-3.5 bg-white/[0.02] border-b border-white/[0.04]">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                            </div>
                            <div className="flex-1 flex justify-center">
                                <div className="px-4 py-1 rounded-md bg-white/[0.03] border border-white/[0.04]">
                                    <span className="text-[11px] text-white/25 font-mono tracking-wider">
                                        {project.title.toLowerCase().replace(/\s+/g, '-')}.design
                                    </span>
                                </div>
                            </div>
                            <div className="w-[52px]" />
                        </div>

                        <div className="overflow-hidden">
                            <div className="project-image-inner">
                                <img src={project.detailImage} alt={project.title} className="w-full h-auto object-contain bg-[#080808]" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== FOOTER ========== */}
            <Footer />
            <FloatingDock />
        </div>
    );
}
