const FormInput = ({ label, value, onChange, type = "text", placeholder, options = null }) => (
    <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
            {label}
        </label>
        {options ? (
            <select
                value={value}
                onChange={onChange}
                className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">선택하세요</option>
                {options.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        ) : type === 'textarea' ? (
            <textarea
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full h-32 px-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
        ) : (
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        )}
    </div>
);

export default FormInput;