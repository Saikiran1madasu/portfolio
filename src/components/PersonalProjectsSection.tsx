import CircularGallery from './ui/CircularGallery';
import DecryptedText from './ui/DecryptedText';

import imgRummy from '../assets/personalproject/rummy.webp';
import imgStream from '../assets/personalproject/stream.webp';
import imgWeather from '../assets/personalproject/weather.webp';
import imgStyle from '../assets/personalproject/stylye.webp';
import imgEdguru from '../assets/personalproject/edguru.webp';

export default function PersonalProjectsSection() {
    return (
        <section className="bg-[#0a0a0a] min-h-[600px] md:min-h-[800px] py-10 relative overflow-hidden flex flex-col items-center justify-center">

            {/* Header */}
            <div className="mb-10 text-center relative z-10 px-4">
                <h3 className="text-xl font-medium text-white/80 uppercase tracking-widest mb-4">
                    Exploration & Experiments
                </h3>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                    <span className="mr-3">Personal</span>
                    <DecryptedText
                        text="Gallery"
                        speed={100}
                        className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
                        parentClassName="inline-block"
                        animateOn="view"
                    />
                </h2>
                <p className="text-white/50 text-sm md:text-base mt-4 max-w-lg mx-auto">
                    Self-initiated design explorations and concept work
                </p>
            </div>

            {/* Circular Gallery Container */}
            <div className="h-[500px] md:h-[600px] w-full relative">
                <CircularGallery
                    bend={1}
                    textColor="#ffffff"
                    borderRadius={0.05}
                    items={[
                        { image: imgRummy, text: 'Rummy' },
                        { image: imgStream, text: 'Stream' },
                        { image: imgWeather, text: 'Weather' },
                        { image: imgStyle, text: 'Stylye' },
                        { image: imgEdguru, text: 'EdGuru' }
                    ]}
                />
            </div>

            {/* Hint removed as per user request */}

        </section>
    );
}
