import { emotionList } from '../utils/emotionList';
import { getEmotionImage } from '../utils/getEmotionImage';

const EmotionSelector = ({ selectedId, onSelect }) => (
    <div className="flex gap-2 mb-4">
        {emotionList.map(({ emotionId, emotionName }) => (
            <button
                key={emotionId}
                onClick={() => onSelect(emotionId)}
                className={`p-1 border rounded ${selectedId === emotionId ? 'border-blue-500' : ''
                    }`}
            >
                <img
                    src={getEmotionImage(emotionId)}
                    alt={emotionName}
                    className="w-12 h-12"
                />
                <div className="text-xs text-center mt-1">{emotionName}</div>
            </button>
        ))}
    </div>
);

export default EmotionSelector;