
import { GooeyText } from "./ui/gooey-text-morphing";

export default function TextSection() {
    return (
        <div className="h-[300px] flex items-center justify-center bg-black/50 backdrop-blur-sm border-t border-b border-white/5">
            <GooeyText
                texts={[
                    "UX Thinking",
                    "UI Craft",
                    "Design Precision"
                ]}
                morphTime={1}
                cooldownTime={0.25}
                className="font-bold"
                textClassName="text-white"
            />
        </div>
    );
}
