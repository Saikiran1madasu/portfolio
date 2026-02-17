import { useRef, useCallback } from 'react';
import { useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import CircularGallery from './ui/CircularGallery';
import DecryptedText from './ui/DecryptedText';

import imgRummy from '../assets/personalproject/rummy.webp';
import imgStream from '../assets/personalproject/stream.webp';
import imgWeather from '../assets/personalproject/weather.webp';
import imgStyle from '../assets/personalproject/stylye.webp';
import imgEdguru from '../assets/personalproject/edguru.webp';

export default function PersonalProjectsSection() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
    const navigate = useNavigate();

    const handleItemClick = useCallback((link: string) => {
        if (link) {
            navigate(link);
        }
    }, [navigate]);

    return (
        <section ref={sectionRef} className="bg-[#0a0a0a] min-h-[600px] md:min-h-[800px] py-10 relative overflow-hidden flex flex-col items-center justify-center">

            {/* Header */}
            <div className="mb-10 text-center relative z-10 px-4">
                <div className="flex items-center space-x-4 mb-8 max-w-4xl mx-auto">
                    <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent flex-grow" />
                    <h3 className="text-xl font-medium text-white/80 uppercase tracking-widest">Exploration & Experiments</h3>
                    <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent flex-grow" />
                </div>

                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-white mb-6">
                        <span className="mr-4">Personal</span>
                        <DecryptedText
                            text="Gallery"
                            speed={40}
                            maxIterations={15}
                            className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
                            parentClassName="inline-block"
                            animateOn="view"
                        />
                    </h2>
                    <p className="text-white/50 text-sm md:text-base mt-4 max-w-lg mx-auto">
                        Self-initiated design explorations and concept work
                    </p>
                </div>
            </div>

            {/* Circular Gallery Container */}
            <div className="h-[500px] md:h-[600px] w-full relative">
                {isInView && (
                    <CircularGallery
                        bend={1}
                        textColor="#ffffff"
                        borderRadius={0.05}
                        onItemClick={handleItemClick}
                        items={[
                            { image: imgRummy, text: 'Rummy', link: '/project/rummy' },
                            { image: imgStream, text: 'Stream ARA', link: '/project/stream' },
                            { image: imgWeather, text: 'Weather', link: '/project/weather' },
                            { image: imgStyle, text: 'Stylye AI', link: '/project/ai' },
                            { image: imgEdguru, text: 'Edguru', link: '/project/edguru' }
                        ]}
                    />
                )}
            </div>

            {/* Hint removed as per user request */}

        </section>
    );
}
