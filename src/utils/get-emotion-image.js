import e1 from '../assets/emotion1.png';
import e2 from '../assets/emotion2.png';
import e3 from '../assets/emotion3.png';
import e4 from '../assets/emotion4.png';
import e5 from '../assets/emotion5.png';

const emotionImages = {
    1: e5,
    2: e4,
    3: e3,
    4: e2,
    5: e1,
};

export const getEmotionImage = (emotionId) => emotionImages[emotionId];