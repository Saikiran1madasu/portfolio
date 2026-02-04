import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

const Preloader = ({ finishLoading }) => {
    const line1Ref = useRef(null);
    const line2Ref = useRef(null);
    const underlineRef = useRef(null);
    const emojiRef = useRef(null);
    const containerRef = useRef(null);

    // State to force re-render/re-calc on resize if needed, though event listener is better
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        // Handle Window Resize for positioning
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            updateEmojiPosition();
        };

        window.addEventListener('resize', handleResize);

        // Initial Position Check
        // We need a slight delay to ensure SVG renders and layout is stable? 
        // Usually RAF or just immediate call works.
        requestAnimationFrame(updateEmojiPosition);

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

        gsap.set(emojiRef.current, {
            scale: 0,
            opacity: 0,
        });

        // Animation - Fastest Speed
        // Line 1: Madasu Sai Kiran
        tl.to(line1Ref.current, {
            strokeDashoffset: 0,
            duration: 0.5, // Reduced from 0.8
            ease: 'power1.inOut'
        })
            .to(line1Ref.current, {
                fill: 'white',
                duration: 0.2, // Reduced from 0.3
                ease: 'power2.out'
            }, "-=0.1");

        // Line 2: Portfolio
        tl.to(line2Ref.current, {
            strokeDashoffset: 0,
            duration: 0.4, // Reduced from 0.6
            ease: 'power1.inOut'
        }, "-=0.3")
            .to(line2Ref.current, {
                fill: 'white',
                duration: 0.2, // Reduced from 0.3
                ease: 'power2.out'
            }, "-=0.1");

        // Underline
        tl.to(underlineRef.current, {
            strokeDashoffset: 0,
            duration: 0.3, // Reduced from 0.4
            ease: 'power2.out'
        }, "-=0.1");

        // Emoji
        tl.to(emojiRef.current, {
            scale: 1,
            opacity: 1,
            duration: 0.3, // Reduced from 0.4
            ease: 'back.out(1.7)'
        }, "-=0.1")
            .to(containerRef.current, {
                opacity: 0,
                duration: 0.3, // Reduced from 0.4
                ease: 'power2.inOut',
                delay: 0.05
            });

        return () => window.removeEventListener('resize', handleResize);
    }, [finishLoading]);

    // Function to calculate and set emoji position based on SVG text rect
    const updateEmojiPosition = () => {
        if (line2Ref.current && emojiRef.current) {
            const textRect = line2Ref.current.getBoundingClientRect();

            // Position emoji right next to the text rect
            // Adjust vertical align to be centered on the text
            const emojiLeft = textRect.right + 10; // 10px padding
            const emojiTop = textRect.top + (textRect.height / 2);

            emojiRef.current.style.position = 'fixed'; // Use fixed to match viewport coords from getBoundingClientRect
            emojiRef.current.style.left = `${emojiLeft}px`;
            emojiRef.current.style.top = `${emojiTop}px`;
            emojiRef.current.style.transform = `translateY(-55%) rotate(-10deg) scale(${gsap.getProperty(emojiRef.current, "scale")})`; // Maintain GSAP scale if set, but mostly just translateY center. 
            // Note: GSAP transform overrides might conflict with inline style transform.
            // Better to set left/top here and let GSAP handle scale/rotation via its own transform matrix.
            // BUT GSAP overwrites 'transform'.
            // SO: We should use GSAP 'set' for position if we are animating 'transform' with GSAP.
            // Or just use top/left for placement and GSAP for scale/rot.
            // Let's use standard style for top/left.

            // We need to re-apply the non-animated transforms manually or via GSAP set to avoid overwriting?
            // Actually, if we use translateY(-50%) in CSS class or in GSAP, we should match it.
            // Let's rely on GSAP for the transform part.

            // REVISION: Just set left/top. Let css/gsap handle the centering transform.
            // CSS has `transform: translateY(-50%) rotate(-10deg)`.
            // GSAP animation modifies scale.
            // They compose if GSAP uses 'x'/'y'/'scale'/'rotation' properties, it updates the transform string intelligently.
        }
    };

    // Re-run position update after render when refs are stable (useEffect is enough, but double check)
    useEffect(() => {
        updateEmojiPosition();
    });

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

                {/* Emoji - Positioned via JS */}
                <span
                    ref={emojiRef}
                    className="preloader-emoji-dynamic"
                    style={{ opacity: 0 }} // Initially hidden
                >
                    😉
                </span>
            </div>
        </motion.div>
    );
};

export default Preloader;
