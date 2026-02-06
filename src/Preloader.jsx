import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

const Preloader = ({ finishLoading }) => {
    const line1Ref = useRef(null);
    const line2Ref = useRef(null);
    const underlineRef = useRef(null);
    const containerRef = useRef(null);

    // State to force re-render/re-calc on resize if needed
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        // Handle Window Resize
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        const tl = gsap.timeline({
            onComplete: () => {
                finishLoading();
            }
        });

        // Initial state
        gsap.set([line1Ref.current, line2Ref.current], {
            strokeDasharray: 2000,
            strokeDashoffset: 2000,
            fill: 'transparent',
            stroke: 'white',
            strokeWidth: 2
        });

        // Underline initial state
        const underlineLength = underlineRef.current.getTotalLength();
        gsap.set(underlineRef.current, {
            strokeDasharray: underlineLength,
            strokeDashoffset: underlineLength,
            stroke: 'white',
            strokeWidth: 4,
            fill: 'none',
            strokeLinecap: 'round'
        });

        // Animation - Fastest Speed
        // Line 1: Madasu Sai Kiran
        tl.to(line1Ref.current, {
            strokeDashoffset: 0,
            duration: 0.5,
            ease: 'power1.inOut'
        })
            .to(line1Ref.current, {
                fill: 'white',
                duration: 0.2,
                ease: 'power2.out'
            }, "-=0.1");

        // Line 2: Portfolio
        tl.to(line2Ref.current, {
            strokeDashoffset: 0,
            duration: 0.4,
            ease: 'power1.inOut'
        }, "-=0.3")
            .to(line2Ref.current, {
                fill: 'white',
                duration: 0.2,
                ease: 'power2.out'
            }, "-=0.1");

        // Underline
        tl.to(underlineRef.current, {
            strokeDashoffset: 0,
            duration: 0.3,
            ease: 'power2.out'
        }, "-=0.1")
            // Container Fade Out
            .to(containerRef.current, {
                opacity: 0,
                duration: 0.3,
                ease: 'power2.inOut',
                delay: 0.05
            });

        return () => window.removeEventListener('resize', handleResize);
    }, [finishLoading]);

    return (
        <motion.div
            ref={containerRef}
            className="preloader-container"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="preloader-content-stacked">
                <svg
                    viewBox="0 0 800 400"
                    className="preloader-svg-stacked"
                    preserveAspectRatio="xMidYMid meet"
                >
                    {/* Line 1: Madasu Sai Kiran */}
                    <text
                        ref={line1Ref}
                        x="50%"
                        y="35%"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        className="preloader-text-line1"
                    >
                        Madasu Sai Kiran
                    </text>

                    {/* Line 2: Portfolio */}
                    <text
                        ref={line2Ref}
                        x="50%"
                        y="65%"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        className="preloader-text-line2"
                    >
                        Portfolio
                    </text>

                    {/* Underline under Portfolio */}
                    <path
                        ref={underlineRef}
                        d="M 280 290 Q 400 310, 520 285"
                        className="preloader-underline"
                    />
                </svg>
            </div>
        </motion.div>
    );
};

export default Preloader;
