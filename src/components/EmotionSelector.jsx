import { emotionList } from '../utils/emotionList';
import { getEmotionImage } from '../utils/getEmotionImage';

const EmotionSelector = ({ selectedId, onSelect }) => {
    return (
        <div className="space-y-6">
            <div className="text-center">
                <h3 className="text-lg font-semibold text-slate-700 mb-2">알바 경험 평가</h3>
                <p className="text-sm text-slate-500">전체적인 알바 경험을 평가해주세요</p>
            </div>

            <div className="grid grid-cols-5 gap-4">
                {emotionList.map(({ emotionId, emotionName }) => {
                    const isSelected = selectedId === emotionId;

                    return (
                        <button
                            key={emotionId}
                            onClick={() => onSelect(emotionId)}
                            className={`
                group relative flex flex-col items-center p-6 rounded-2xl transition-all duration-300 transform
                ${isSelected
                                    ? 'bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 text-white shadow-2xl shadow-blue-500/25 scale-110 -translate-y-2'
                                    : 'bg-white/60 hover:bg-white/80 text-slate-700 hover:shadow-xl hover:scale-105 hover:-translate-y-1'
                                }
                border-2 ${isSelected ? 'border-white/30' : 'border-slate-200 hover:border-blue-300'}
                focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:ring-offset-2
                backdrop-blur-sm
              `}
                        >
                            {isSelected && (
                                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl" />
                            )}

                            <div className={`
                relative w-16 h-16 mb-3 rounded-full overflow-hidden transition-all duration-300
                ${isSelected
                                    ? 'ring-4 ring-white/50 shadow-lg'
                                    : 'ring-2 ring-slate-200 group-hover:ring-blue-300'
                                }
                bg-gradient-to-br ${isSelected
                                    ? 'from-white/20 to-white/10'
                                    : 'from-slate-50 to-white group-hover:from-blue-50 group-hover:to-indigo-50'
                                }
              `}>
                                <img
                                    src={getEmotionImage(emotionId)}
                                    alt={emotionName}
                                    className={`
                    w-full h-full object-contain p-2 transition-all duration-300
                    ${isSelected ? 'brightness-110 contrast-110' : 'group-hover:brightness-105'}
                  `}
                                />

                                {isSelected && (
                                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                                        <span className="text-xs">✓</span>
                                    </div>
                                )}
                            </div>

                            <div className={`
                text-sm font-semibold text-center mb-2 transition-all duration-300
                ${isSelected ? 'text-white' : 'text-slate-700 group-hover:text-blue-600'}
              `}>
                                {emotionName}
                            </div>

                            <div className="flex space-x-0.5">
                                {Array.from({ length: 5 }, (_, index) => (
                                    <span
                                        key={index}
                                        className={`
                      text-sm transition-all duration-300 transform
                      ${index < emotionId
                                                ? (isSelected
                                                    ? 'text-yellow-300 scale-110'
                                                    : 'text-yellow-500 group-hover:text-yellow-600 group-hover:scale-105'
                                                )
                                                : (isSelected
                                                    ? 'text-white/40'
                                                    : 'text-slate-300 group-hover:text-slate-400'
                                                )
                                            }
                    `}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>

                            <div className={`
                absolute inset-0 rounded-2xl transition-all duration-300 pointer-events-none
                ${!isSelected ? 'group-hover:bg-gradient-to-br group-hover:from-blue-500/5 group-hover:to-purple-500/5' : ''}
              `} />
                        </button>
                    );
                })}
            </div>

            <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200/30">
                <p className="text-sm text-slate-600 mb-1">현재 선택된 평가</p>
                <div className="flex items-center justify-center gap-2">
                    <span className="text-2xl">
                        {selectedId && <img src={getEmotionImage(selectedId)} alt="" className="w-6 h-6 inline" />}
                    </span>
                    <span className="font-semibold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {emotionList.find(e => e.emotionId === selectedId)?.emotionName || '선택해주세요'}
                    </span>
                    {selectedId && (
                        <div className="flex ml-2">
                            {Array.from({ length: 5 }, (_, index) => (
                                <span
                                    key={index}
                                    className={`text-sm ${index < selectedId ? 'text-yellow-500' : 'text-slate-300'}`}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmotionSelector;