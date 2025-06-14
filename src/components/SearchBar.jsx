import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar({ placeholder = '🔍 원하는 알바를 검색하세요' }) {
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (keyword.trim()) {
            navigate(`/search?keyword=${encodeURIComponent(keyword.trim())}`);
            setKeyword('');
        }
    };

    const handleKeyDown = e => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-sm opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <div className="relative flex items-center">
                <input
                    type="text"
                    placeholder={placeholder}
                    value={keyword}
                    onChange={e => setKeyword(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-white/70 backdrop-blur-sm border border-white/30 rounded-2xl py-4 px-6 pr-24 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-lg hover:shadow-xl group-hover:bg-white/80"
                />
                <button
                    onClick={handleSearch}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-xl font-medium transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
                >
                    <span className="text-sm">🔍</span>
                    <span className="text-sm font-semibold">검색</span>
                </button>
            </div>
        </div>
    );
}

export default SearchBar;