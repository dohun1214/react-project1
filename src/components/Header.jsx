function Header() {
    return (
        <>
            <header className="bg-white shadow-sm border-b">
                <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
                    <h1
                        className="text-3xl font-extrabold tracking-tight font-serif"
                        style={{ color: '#7989F6' }}
                    >
                        JOBBLE
                    </h1>

                    <div className="flex space-x-4">
                        <a
                            href="#"
                            className="text-sm text-gray-600 hover:text-[#7989F6] transition"
                        >
                            로그인
                        </a>
                        <a
                            href="#"
                            className="text-sm text-gray-600 hover:text-[#7989F6] transition"
                        >
                            회원가입
                        </a>
                    </div>
                </div>

                <div className="w-full max-w-7xl mx-auto px-4 md:px-8 pb-4">
                    <input
                        type="text"
                        placeholder="🔍 원하는 알바를 검색하세요"
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#7989F6] text-sm placeholder-gray-400"
                    />
                </div>

                <nav className="bg-white border-t border-b">
                    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-2 grid grid-cols-5 gap-2 text-[15px] font-semibold text-gray-700">
                        <a
                            href="#"
                            className="text-center hover:text-[#7989F6] py-2 rounded-md hover:bg-gray-100"
                        >
                            채용정보
                        </a>
                        <a
                            href="#"
                            className="text-center hover:text-[#7989F6] py-2 rounded-md hover:bg-gray-100"
                        >
                            브랜드알바
                        </a>
                        <a
                            href="#"
                            className="text-center hover:text-[#7989F6] py-2 rounded-md hover:bg-gray-100"
                        >
                            커뮤니티
                        </a>
                        <a
                            href="#"
                            className="text-center hover:text-[#7989F6] py-2 rounded-md hover:bg-gray-100"
                        >
                            고객센터
                        </a>
                        <a
                            href="#"
                            className="text-center hover:text-[#7989F6] py-2 rounded-md hover:bg-gray-100"
                        >
                            마이페이지
                        </a>
                    </div>
                </nav>
            </header>
        </>
    );
}

export default Header;
