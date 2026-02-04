import { ReactLenis } from 'lenis/react';
import React, { useState, Suspense, lazy } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Preloader from './Preloader';
import { HeroGeometric } from './components/ui/shape-landing-hero';
import AboutSection2 from './components/AboutSection2';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import CertificationsSection from './components/CertificationsSection';
import './index.css';

import FloatingDock from './components/FloatingDock';

import TextSection from './components/TextSection';
import Footer from './components/Footer';

// Lazy load the heavy 3D gallery
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
                            <AboutSection2 />
                            <SkillsSection />
                            <ProjectsSection />
                            <Suspense fallback={<div className="h-[600px] w-full bg-[#0a0a0a]" />}>
                                <PersonalProjectsSection />
                            </Suspense>
                            <CertificationsSection />
                            <TextSection />

                            <Footer />

                            <FloatingDock />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </ReactLenis>
    );
}

export default App;
