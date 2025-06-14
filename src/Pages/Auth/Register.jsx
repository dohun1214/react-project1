import { useState, useContext } from "react"
import { userContext } from "../../contexts/userContext";
import { useNavigate } from "react-router-dom";
import usePageTitle from '../../hooks/usePageTitle'

function Register() {
    usePageTitle("회원가입")

    const { users, userDispatch } = useContext(userContext)
    const navi = useNavigate()

    const [idValue, setId] = useState("");
    const [pwValue, setPw] = useState("");
    const [pwConfirm, setPwConfirm] = useState("");

    const idChange = (e) => {
        setId(e.target.value)
    }
    const pwChange = (e) => {
        setPw(e.target.value)
    }
    const pwConfirmChange = (e) => {
        setPwConfirm(e.target.value)
    }

    const registerBtn = (idValue, pwValue) => {
        if (!idValue.trim()) {
            alert("아이디를 입력해주세요");
            return;
        }
        if (!pwValue.trim()) {
            alert("비밀번호를 입력해주세요");
            return;
        }
        if (pwValue !== pwConfirm) {
            alert("비밀번호가 일치하지 않습니다");
            return;
        }

        const existingUser = users.find(user => user.id === idValue);
        if (existingUser) {
            alert("이미 존재하는 아이디입니다");
            return;
        }

        userDispatch({ type: 'ADD_USER', payload: { id: idValue, password: pwValue, wishlist: [] } })
        alert("회원가입이 완료되었습니다!");
        navi("/login");
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                        JOBBLE
                    </h1>
                    <p className="text-slate-600">새로운 계정을 만들어보세요</p>
                </div>

                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="id" className="block text-sm font-semibold text-slate-700 mb-2">
                                아이디
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-slate-400 text-sm">👤</span>
                                </div>
                                <input
                                    type="text"
                                    id="id"
                                    name="id"
                                    value={idValue}
                                    onChange={idChange}
                                    className="w-full pl-10 pr-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-slate-400"
                                    placeholder="사용할 아이디를 입력하세요"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
                                비밀번호
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-slate-400 text-sm">🔒</span>
                                </div>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={pwValue}
                                    onChange={pwChange}
                                    className="w-full pl-10 pr-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-slate-400"
                                    placeholder="비밀번호를 입력하세요"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="passwordConfirm" className="block text-sm font-semibold text-slate-700 mb-2">
                                비밀번호 확인
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-slate-400 text-sm">🔐</span>
                                </div>
                                <input
                                    type="password"
                                    id="passwordConfirm"
                                    name="passwordConfirm"
                                    value={pwConfirm}
                                    onChange={pwConfirmChange}
                                    className={`w-full pl-10 pr-4 py-3 bg-white/50 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 placeholder-slate-400 ${pwConfirm && pwValue !== pwConfirm
                                            ? 'border-red-300 focus:ring-red-500'
                                            : 'border-slate-200 focus:ring-blue-500 focus:border-transparent'
                                        }`}
                                    placeholder="비밀번호를 다시 입력하세요"
                                />
                            </div>
                            {pwConfirm && pwValue !== pwConfirm && (
                                <p className="text-red-500 text-xs mt-1">비밀번호가 일치하지 않습니다</p>
                            )}
                        </div>

                        <button
                            onClick={() => { registerBtn(idValue, pwValue) }}
                            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-4 rounded-xl hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            회원가입
                        </button>

                        <div className="text-center pt-4">
                            <p className="text-slate-600 text-sm">
                                이미 계정이 있으신가요?{' '}
                                <button
                                    onClick={() => navi("/login")}
                                    className="text-purple-600 hover:text-pink-600 font-semibold transition-colors duration-200"
                                >
                                    로그인
                                </button>
                            </p>
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

export default Register