import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar({ placeholder = '🔍 원하는 알바를 검색하세요' }) {
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();

    const handleKeyDown = e => {
        if (e.key === 'Enter' && keyword.trim()) {
            navigate(`/search?keyword=${encodeURIComponent(keyword.trim())}`);
            setKeyword('');
        }
    };

    return (
        <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-sm opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <input
                type="text"
                placeholder={placeholder}
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                onKeyDown={handleKeyDown}
                className="relative w-full bg-white/70 backdrop-blur-sm border border-white/30 rounded-2xl py-4 px-6 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-lg hover:shadow-xl group-hover:bg-white/80"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    🔍
                </div>
            </div>
        </div>
    );
}

export default SearchBar;