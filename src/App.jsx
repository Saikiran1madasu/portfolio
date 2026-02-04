import { ReactLenis } from 'lenis/react';
import React, { useState, Suspense, lazy } from 'react';
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

function App() {
    const [loading, setLoading] = useState(true);

    return (
        <ReactLenis root>
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
                                <AboutSection2 />
                                <SkillsSection />
                                <ProjectsSection />
                                <PersonalProjectsSection />
                                <CertificationsSection />
                                <TextSection />
                                <Footer />
                                <FloatingDock />
                            </Suspense>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </ReactLenis>
    );
}

export default App;
