import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { userContext } from "../contexts"
import usePageTitle from '../hooks/usePageTitle'

const ForgotPassword = () => {
    const { users } = useContext(userContext)
    const [forgotEmail, setForgotEmail] = useState('')
    const [forgotId, setForgotId] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    usePageTitle('비밀번호 찾기')

    const navi = useNavigate()

    const handleForgotPassword = async () => {
        if (!forgotId.trim() || !forgotEmail.trim()) {
            alert("아이디와 이메일을 모두 입력해주세요.");
            return;
        }

        setIsLoading(true);

        setTimeout(() => {
            const user = users.find(user => user.id === forgotId && user.email === forgotEmail);

            if (user) {
                alert(`✅ 비밀번호 찾기 성공!\n\n회원님의 비밀번호는 "${user.password}" 입니다.`);
                navi("/login");
            } else {
                alert("❌ 입력하신 아이디와 이메일이 일치하지 않습니다.\n다시 확인해주세요.");
            }
            setIsLoading(false);
        }, 1500);
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <button
                        onClick={() => navi("/login")}
                        className="inline-flex items-center text-slate-600 hover:text-blue-600 transition-colors duration-200 mb-6"
                    >
                        <span className="mr-2">←</span>
                        로그인으로 돌아가기
                    </button>

                    <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                        JOBBLE
                    </h1>
                    <p className="text-slate-600">비밀번호 찾기</p>
                </div>

                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
                    <div className="space-y-6">
                        <div className="text-center mb-6">
                            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <span className="text-white text-3xl">🔐</span>
                            </div>
                            <h2 className="text-xl font-bold text-slate-800 mb-2">비밀번호를 잊으셨나요?</h2>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                걱정하지 마세요! 가입 시 사용한 아이디와 이메일을<br />
                                입력하시면 비밀번호를 찾아드립니다.
                            </p>
                        </div>

                        <div>
                            <label htmlFor="forgot-id" className="block text-sm font-semibold text-slate-700 mb-2">
                                아이디 <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-slate-400 text-sm">👤</span>
                                </div>
                                <input
                                    type="text"
                                    id="forgot-id"
                                    value={forgotId}
                                    onChange={(e) => setForgotId(e.target.value)}
                                    disabled={isLoading}
                                    className="w-full pl-10 pr-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
                                    placeholder="가입 시 사용한 아이디를 입력하세요"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="forgot-email" className="block text-sm font-semibold text-slate-700 mb-2">
                                이메일 <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-slate-400 text-sm">📧</span>
                                </div>
                                <input
                                    type="email"
                                    id="forgot-email"
                                    value={forgotEmail}
                                    onChange={(e) => setForgotEmail(e.target.value)}
                                    onKeyDown={(e) => { if (e.key === 'Enter' && !isLoading) { handleForgotPassword() } }}
                                    disabled={isLoading}
                                    className="w-full pl-10 pr-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
                                    placeholder="가입 시 사용한 이메일을 입력하세요"
                                />
                            </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-start">
                                <span className="text-blue-500 text-lg mr-3 mt-0.5">💡</span>
                                <div>
                                    <p className="text-blue-800 text-sm font-medium mb-1">도움말</p>
                                    <p className="text-blue-700 text-xs leading-relaxed">
                                        • 아이디와 이메일이 일치해야 비밀번호를 찾을 수 있습니다<br />
                                        • 가입 시 사용한 정보를 정확히 입력해주세요<br />
                                        • 이메일 주소의 대소문자를 확인해주세요
                                    </p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleForgotPassword}
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 px-4 rounded-xl hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    비밀번호 찾는 중...
                                </span>
                            ) : (
                                '비밀번호 찾기'
                            )}
                        </button>

                        <div className="text-center pt-4 border-t border-slate-200">
                            <p className="text-slate-600 text-sm mb-3">
                                다른 방법으로 로그인하고 싶으신가요?
                            </p>
                            <div className="space-y-2">
                                <button
                                    onClick={() => navi("/login")}
                                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2.5 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-all duration-200"
                                >
                                    로그인 페이지로 이동
                                </button>
                                <button
                                    onClick={() => navi("/register")}
                                    className="w-full text-blue-600 hover:text-purple-600 font-medium py-2 transition-colors duration-200"
                                >
                                    새 계정 만들기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-8">
                    <p className="text-slate-400 text-xs">
                        © 2024 JOBBLE. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword