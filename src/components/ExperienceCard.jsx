import FormInput from './FormInput';

const ExperienceCard = ({ experience, onUpdate, onRemove, index }) => (
    <div className="bg-white/50 rounded-xl p-6 border border-slate-200">
        <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-slate-800">경력 {index + 1}</h3>
            <button
                onClick={() => onRemove(experience.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
            >
                삭제
            </button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
            <FormInput
                label="회사명"
                value={experience.company}
                onChange={(e) => onUpdate(experience.id, 'company', e.target.value)}
                placeholder="스타벅스 강남점"
            />
            <FormInput
                label="직무"
                value={experience.position}
                onChange={(e) => onUpdate(experience.id, 'position', e.target.value)}
                placeholder="바리스타"
            />
            <FormInput
                label="근무기간"
                value={experience.period}
                onChange={(e) => onUpdate(experience.id, 'period', e.target.value)}
                placeholder="2023.03 ~ 2023.08"
            />
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">업무내용</label>
                <textarea
                    value={experience.description}
                    onChange={(e) => onUpdate(experience.id, 'description', e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows="3"
                    placeholder="음료 제조, 고객 응대, 매장 관리"
                />
            </div>
        </div>
    </div>
);

export default ExperienceCard;