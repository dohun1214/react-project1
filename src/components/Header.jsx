import { Link, useLocation } from 'react-router-dom';
import Auth from './Auth';
import SearchBar from './SearchBar';

function Header() {
    const location = useLocation();

    // 현재 페이지 확인 함수
    const isActivePage = (path) => {
        if (path === '/recruit') {
            return location.pathname === '/recruit' || location.pathname.startsWith('/recruit/');
        }
        if (path === '/communityboard') {
            return location.pathname === '/communityboard' || location.pathname.startsWith('/community');
        }
        if (path === '/mypage') {
            return location.pathname === '/mypage' || location.pathname === '/user/edit';
        }
        if (path === '/customer-service') {
            return location.pathname === '/customer-service';
        }
        return location.pathname === path;
    };

    // 네비게이션 아이템들
    const navItems = [
        {
            path: '/recruit',
            icon: '💼',
            label: '채용정보',
            gradient: 'from-blue-500 to-purple-500',
            hoverGradient: 'hover:from-blue-500 hover:to-purple-500',
            shadowColor: 'shadow-blue-200'
        },
        {
            path: '/resume',
            icon: '📝',
            label: '이력서관리',
            gradient: 'from-purple-500 to-pink-500',
            hoverGradient: 'hover:from-purple-500 hover:to-pink-500',
            shadowColor: 'shadow-purple-200'
        },
        {
            path: '/communityboard',
            icon: '💬',
            label: '커뮤니티',
            gradient: 'from-green-500 to-cyan-500',
            hoverGradient: 'hover:from-green-500 hover:to-cyan-500',
            shadowColor: 'shadow-green-200'
        },
        {
            path: '/customer-service',
            icon: '🎧',
            label: '고객센터',
            gradient: 'from-orange-500 to-red-500',
            hoverGradient: 'hover:from-orange-500 hover:to-red-500',
            shadowColor: 'shadow-orange-200'
        },
        {
            path: '/mypage',
            icon: '👤',
            label: '마이페이지',
            gradient: 'from-indigo-500 to-purple-500',
            hoverGradient: 'hover:from-indigo-500 hover:to-purple-500',
            shadowColor: 'shadow-indigo-200'
        }
    ];

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
                        {navItems.map((item) => {
                            const isActive = isActivePage(item.path);

                            return (
                                <Link
                                    key={item.label}
                                    to={item.path}
                                    className={`group relative text-center py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-0.5 ${isActive
                                        ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg ${item.shadowColor} scale-105`
                                        : `text-slate-700 hover:text-white ${item.hoverGradient} hover:bg-gradient-to-r hover:shadow-lg ${item.shadowColor}`
                                        }`}
                                >
                                    <div className="flex flex-col items-center gap-1">
                                        <span className={`text-lg transition-all duration-300 ${isActive ? 'animate-pulse' : ''}`}>
                                            {item.icon}
                                        </span>
                                        <span className="text-sm">{item.label}</span>
                                    </div>
                                    {isActive && (
                                        <>
                                            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-lg animate-bounce"></div>
                                            <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${item.gradient} opacity-20 blur-sm -z-10`}></div>
                                        </>
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header;