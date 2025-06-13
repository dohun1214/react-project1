function Footer() {
    return (
        <footer className="bg-gradient-to-r from-slate-100 via-blue-50 to-purple-50  py-12 border-t border-white/30">
            <div className="w-full max-w-7xl mx-auto px-6">
                {/* Main Footer Content */}
                <div className="text-center mb-8">
                    {/* Logo */}
                    <div className="mb-6">
                        <h2 className="text-2xl font-black tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            JOBBLE
                        </h2>
                        <p className="text-slate-500 text-sm mt-1">당신의 꿈을 현실로 만드는 취업 플랫폼</p>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex flex-wrap justify-center items-center gap-4 mb-8 text-sm">
                        <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors duration-200 font-medium">
                            회사소개
                        </a>
                        <span className="text-slate-300">|</span>
                        <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors duration-200 font-medium">
                            이용약관
                        </a>
                        <span className="text-slate-300">|</span>
                        <a href="#" className="text-slate-600 hover:text-purple-600 transition-colors duration-200 font-medium">
                            개인정보처리방침
                        </a>
                        <span className="text-slate-300">|</span>
                        <a href="#" className="text-slate-600 hover:text-pink-600 transition-colors duration-200 font-medium">
                            위치기반서비스 이용약관
                        </a>
                        <span className="text-slate-300">|</span>
                        <a href="#" className="text-slate-600 hover:text-green-600 transition-colors duration-200 font-medium">
                            광고문의
                        </a>
                        <span className="text-slate-300">|</span>
                        <a href="#" className="text-slate-600 hover:text-orange-600 transition-colors duration-200 font-medium">
                            제휴문의
                        </a>
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center gap-6 mb-8">
                        <a href="#" className="w-10 h-10 bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1">
                            <span className="text-lg">📧</span>
                        </a>
                        <a href="#" className="w-10 h-10 bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-green-500 hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1">
                            <span className="text-lg">💬</span>
                        </a>
                        <a href="#" className="w-10 h-10 bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-purple-500 hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1">
                            <span className="text-lg">📱</span>
                        </a>
                        <a href="#" className="w-10 h-10 bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-pink-500 hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1">
                            <span className="text-lg">🌐</span>
                        </a>
                    </div>

                    {/* Contact Info */}
                    <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20">
                        <div className="grid md:grid-cols-3 gap-4 text-sm text-slate-600">
                            <div className="flex items-center justify-center gap-2">
                                <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                                    <span className="text-blue-500 text-xs">📍</span>
                                </span>
                                <span>서울특별시 강남구 테헤란로 123</span>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                    <span className="text-green-500 text-xs">📞</span>
                                </span>
                                <span>02-1234-5678</span>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <span className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                                    <span className="text-purple-500 text-xs">✉️</span>
                                </span>
                                <span>contact@jobble.co.kr</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Copyright */}
                <div className="text-center pt-6 border-t border-white/20">
                    <p className="text-slate-400 text-xs mb-2">
                        © 2024 JOBBLE Inc. All rights reserved.
                    </p>
                    <p className="text-slate-400 text-xs">
                        Made with ❤️ for job seekers everywhere
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;