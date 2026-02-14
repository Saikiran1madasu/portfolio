import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, MessageCircle, Mail, Send, Linkedin, X } from "lucide-react";
import resumePdf from "../assets/uiux_resume.pdf";

export default function FloatingDock() {
    const [isContactOpen, setIsContactOpen] = useState(false);

    const contactOptions = [
        {
            icon: <Mail className="size-5 text-red-400" />,
            label: "Email",
            link: "mailto:saikiran123.madasu@gmail.com",
            color: "hover:bg-red-500/20 hover:border-red-500/50"
        },
        {
            icon: <Send className="size-5 text-blue-400" />,
            label: "Telegram",
            link: "https://t.me/saikiran1madasu",
            color: "hover:bg-blue-500/20 hover:border-blue-500/50"
        },
        {
            icon: <Linkedin className="size-5 text-blue-600" />,
            label: "LinkedIn",
            link: "https://www.linkedin.com/in/madasusaikiran",
            color: "hover:bg-blue-700/20 hover:border-blue-700/50"
        }
    ];

    const handleResumeClick = () => {
        window.open(resumePdf, "_blank");
    };

    return (
        <div className="fixed bottom-4 right-4 md:bottom-8 md:right-6 z-50 flex flex-col items-end gap-4">

            {/* Contact Options (Raise Up) */}
            <AnimatePresence>
                {isContactOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col gap-3 mb-2 items-end"
                    >
                        {contactOptions.map((option, index) => (
                            <motion.a
                                key={index}
                                href={option.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className={`p-3 rounded-full bg-neutral-900 border border-white/20 shadow-xl transition-all duration-300 group relative flex items-center justify-center ${option.color}`}
                                whileHover={{ scale: 1.1, x: -5 }}
                            >
                                {option.icon}
                                {/* Tooltip */}
                                <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-black/80 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                    {option.label}
                                </span>
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Dock */}
            <div className="flex items-center gap-3 p-2 rounded-full bg-gradient-to-b from-zinc-700/20 via-zinc-900/90 to-zinc-950 border border-white/10 border-t-white/20 backdrop-blur-xl shadow-[0_20px_40px_-12px_rgba(0,0,0,1),inset_0_1px_0_rgba(255,255,255,0.2)] ring-1 ring-white/5">

                {/* Resume Button */}
                <button
                    onClick={handleResumeClick}
                    className="flex flex-col items-center justify-center gap-0.5 p-2 rounded-full hover:bg-white/5 transition-all group relative overflow-hidden min-w-[50px]"
                    title="Resume"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <FileText className="size-5 text-white/90 group-hover:text-blue-300 transition-colors" fill="currentColor" fillOpacity={0.2} />
                    <span className="text-[9px] font-medium text-white/80 group-hover:text-white transition-colors">Resume</span>
                </button>

                {/* Divider */}
                <div className="w-px h-6 bg-white/10" />

                {/* Contact Toggle */}
                <button
                    onMouseEnter={() => setIsContactOpen(true)}
                    onClick={() => setIsContactOpen(!isContactOpen)}
                    className={`flex flex-col items-center justify-center gap-0.5 p-2 rounded-full transition-all group relative overflow-hidden min-w-[50px] ${isContactOpen ? 'bg-white/10' : 'hover:bg-white/5'}`}
                    title="Contact"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {isContactOpen ? (
                        <X className="size-5 text-white/90 group-hover:text-red-300 transition-colors" />
                    ) : (
                        <MessageCircle className="size-5 text-white/90 group-hover:text-green-300 transition-colors" fill="currentColor" fillOpacity={0.2} />
                    )}
                    <span className="text-[9px] font-medium text-white/80 group-hover:text-white transition-colors">Contact</span>

                    {/* Hover Bridge (Invisible area to prevent menu closing when moving mouse up) */}
                    {isContactOpen && (
                        <div
                            className="absolute bottom-full left-0 w-[300%] h-20 -translate-x-1/3"
                            onMouseEnter={() => setIsContactOpen(true)}
                            onMouseLeave={() => setIsContactOpen(false)}
                        />
                    )}
                </button>

            </div>
        </div>
    );
}
