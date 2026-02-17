import { ReactLenis } from 'lenis/react';
import React, { useState, Suspense, lazy, useLayoutEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Preloader from './Preloader';
import { HeroGeometric } from './components/ui/shape-landing-hero';

// Lazy load heavy sections
const AboutSection2 = lazy(() => import('./components/AboutSection2'));
const ProjectsSection = lazy(() => import('./components/ProjectsSection'));
const SkillsSection = lazy(() => import('./components/SkillsSection'));
const CertificationsSection = lazy(() => import('./components/CertificationsSection'));
const TextSection = lazy(() => import('./components/TextSection'));
const Footer = lazy(() => import('./components/Footer'));
const FloatingDock = lazy(() => import('./components/FloatingDock'));
const PersonalProjectsSection = lazy(() => import('./components/PersonalProjectsSection'));
const ProjectDetailPage = lazy(() => import('./components/ProjectDetailPage'));

// FadeInWrapper component for smooth section transitions
const FadeInWrapper = ({ children }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
    >
        {children}
    </motion.div>
);

function HomePage() {
    const [loading, setLoading] = useState(true);

    useLayoutEffect(() => {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="app-container">
            <AnimatePresence mode="wait">
                {loading ? (
                    <Preloader key="preloader" finishLoading={() => setLoading(false)} />
                ) : (
                    <motion.div
                        key="home"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="w-full relative"
                    >
                        <HeroGeometric
                            title1="Madasu Sai Kiran"
                            title2="UI/UX Designer"
                        />
                        <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a]" />}>
                            <FadeInWrapper><AboutSection2 /></FadeInWrapper>
                            <FadeInWrapper><SkillsSection /></FadeInWrapper>
                            <FadeInWrapper><ProjectsSection /></FadeInWrapper>
                            <FadeInWrapper><PersonalProjectsSection /></FadeInWrapper>
                            <FadeInWrapper><CertificationsSection /></FadeInWrapper>
                            <FadeInWrapper><TextSection /></FadeInWrapper>
                            <FadeInWrapper><Footer /></FadeInWrapper>
                            <FloatingDock />
                        </Suspense>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function App() {
    const location = useLocation();

    return (
        <ReactLenis root options={{ lerp: 0.05, duration: 1.5, smoothWheel: true }}>
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<HomePage />} />
                    <Route
                        path="/project/:slug"
                        element={
                            <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a]" />}>
                                <ProjectDetailPage />
                            </Suspense>
                        }
                    />
                </Routes>
            </AnimatePresence>
        </ReactLenis>
    );
}

export default App;
