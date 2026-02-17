import imgEdguru from '../assets/projectdetail/Edugure.webp';
import imgRummy from '../assets/projectdetail/Rummy.webp';
import imgStream from '../assets/projectdetail/Stream-ARA.webp';
import imgWeather from '../assets/projectdetail/weather.webp';
import imgAI from '../assets/projectdetail/AI.webp';

export interface ProjectData {
    slug: string;
    title: string;
    subtitle: string;
    description: string;
    detailImage: string;
    tags: string[];
    color: string;
}

const projectsData: ProjectData[] = [
    {
        slug: 'edguru',
        title: 'Edguru',
        subtitle: 'Educational Platform',
        description:
            'A comprehensive educational platform designed to empower learners with intuitive UI and seamless learning experiences.',
        detailImage: imgEdguru,
        tags: ['UI/UX Design', 'Education', 'Web App'],
        color: '#eab308',
    },
    {
        slug: 'rummy',
        title: 'Rummy',
        subtitle: 'Card Game Application',
        description:
            'A visually engaging card game application with smooth interactions and a polished gaming experience.',
        detailImage: imgRummy,
        tags: ['UI/UX Design', 'Gaming', 'Web App'],
        color: '#22c55e',
    },
    {
        slug: 'stream',
        title: 'Stream ARA',
        subtitle: 'Streaming Platform',
        description:
            'A modern streaming platform interface crafted for effortless content discovery and immersive viewing.',
        detailImage: imgStream,
        tags: ['UI/UX Design', 'Entertainment', 'Mobile App'],
        color: '#38bdf8',
    },
    {
        slug: 'weather',
        title: 'Weather',
        subtitle: 'Weather Application',
        description:
            'A clean and intuitive weather application with real-time data visualization and beautiful atmospheric design.',
        detailImage: imgWeather,
        tags: ['UI/UX Design', 'Utility', 'Mobile App'],
        color: '#8CDFE7',
    },
    {
        slug: 'ai',
        title: 'Stylye AI',
        subtitle: 'Artificial Intelligence',
        description:
            'An AI-powered application showcasing cutting-edge design for intelligent interfaces and data-driven experiences.',
        detailImage: imgAI,
        tags: ['UI/UX Design', 'AI', 'Mobile App'],
        color: '#ffffff',
    },
];

export default projectsData;
