import { Link } from 'react-router-dom';
import Auth from './Auth';
import SearchBar from './SearchBar';

function Header() {
    return (
        <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex justify-between items-center mb-4">
                    <Link to="/" className="group">
                        <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 transition-all duration-500">
                            JOBBLE
                        </h1>
                        <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                    </Link>
                    <Auth />
                </div>

                <div className="mb-4">
                    <SearchBar />
                </div>

                <nav className="bg-white/50 backdrop-blur-sm rounded-2xl border border-white/30 p-2">
                    <div className="grid grid-cols-5 gap-2">
                        <Link
                            to="/recruit"
                            className="group text-center py-3 px-4 rounded-xl font-semibold text-slate-700 hover:text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:shadow-lg hover:shadow-blue-200 transform hover:-translate-y-0.5"
                        >
                            <div className="flex flex-col items-center gap-1">
                                <span className="text-lg">💼</span>
                                <span className="text-sm">채용정보</span>
                            </div>
                        </Link>
                        <a
                            href="#"
                            className="group text-center py-3 px-4 rounded-xl font-semibold text-slate-700 hover:text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:shadow-lg hover:shadow-purple-200 transform hover:-translate-y-0.5"
                        >
                            <div className="flex flex-col items-center gap-1">
                                <span className="text-lg">⭐</span>
                                <span className="text-sm">브랜드알바</span>
                            </div>
                        </a>
                        <Link
                            to="/communityboard"
                            className="group text-center py-3 px-4 rounded-xl font-semibold text-slate-700 hover:text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-green-500 hover:to-cyan-500 hover:shadow-lg hover:shadow-green-200 transform hover:-translate-y-0.5"
                        >
                            <div className="flex flex-col items-center gap-1">
                                <span className="text-lg">💬</span>
                                <span className="text-sm">커뮤니티</span>
                            </div>
                        </Link>
                        <a
                            href="#"
                            className="group text-center py-3 px-4 rounded-xl font-semibold text-slate-700 hover:text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 hover:shadow-lg hover:shadow-orange-200 transform hover:-translate-y-0.5"
                        >
                            <div className="flex flex-col items-center gap-1">
                                <span className="text-lg">🎧</span>
                                <span className="text-sm">고객센터</span>
                            </div>
                        </a>
                        <Link
                            to="/mypage"
                            className="group text-center py-3 px-4 rounded-xl font-semibold text-slate-700 hover:text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 hover:shadow-lg hover:shadow-indigo-200 transform hover:-translate-y-0.5"
                        >
                            <div className="flex flex-col items-center gap-1">
                                <span className="text-lg">👤</span>
                                <span className="text-sm">마이페이지</span>
                            </div>
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header;