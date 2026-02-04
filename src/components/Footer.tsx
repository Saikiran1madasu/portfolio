

import footerNewBg from '../assets/footer_new_bg.webp';

const Footer = () => {
    return (
        <div className="w-full relative py-20 flex flex-col items-center justify-center gap-6 overflow-hidden bg-white">
            {/* Premium Background Pattern */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-40 animate-slow-pan"
                style={{ backgroundImage: `url(${footerNewBg})` }}
            />

            <div className="relative z-10 flex flex-col items-center gap-6">
                <h3 className="text-black/70 text-base md:text-lg font-semibold tracking-wide">
                    Open to new challenges and growth.
                </h3>

                <a
                    href="mailto:saikiran123.madasu@gmail.com"
                    className="text-[5rem] md:text-[10rem] lg:text-[13rem] font-bold text-black uppercase tracking-[1px] leading-none transition-all duration-300 text-outline-hover cursor-pointer text-center"
                    aria-label="Send email to saikiran123.madasu@gmail.com"
                >
                    LET'S START?
                </a>

                <p className="text-black/40 text-sm font-medium">
                    © Madasu Sai Kiran
                </p>
            </div>
        </div>
    );
};

export default Footer;
