import { IconType } from 'react-icons';
import { Moods } from '../types/journal';
import {
    FaFaceFrown,
    FaFaceFrownOpen,
    FaFaceLaugh,
    FaFaceMeh,
    FaFaceSmile,
} from 'react-icons/fa6';

const moods: Record<Moods, IconType> = {
    [Moods.TERRIBLE]: FaFaceFrown,
    [Moods.BAD]: FaFaceFrownOpen,
    [Moods.OKAY]: FaFaceMeh,
    [Moods.GOOD]: FaFaceSmile,
    [Moods.GREAT]: FaFaceLaugh,
};

const moodsColors: Record<Moods, string> = {
    [Moods.TERRIBLE]: 'text-red-500',
    [Moods.BAD]: 'text-orange-500',
    [Moods.OKAY]: 'text-yellow-500',
    [Moods.GOOD]: 'text-green-500',
    [Moods.GREAT]: 'text-green-700',
};

const Mood: React.FC<{ mood: Moods; className?: string }> = ({
    mood,
    className,
}) => {
    const Icon = moods[mood];

    return <Icon className={`${moodsColors[mood]} ${className}`} />;
};

export default Mood;
