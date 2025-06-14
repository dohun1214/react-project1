import { useContext, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { userContext } from "../../contexts/userContext"
import { loginContext } from '../../contexts/loginContext'
import  usePageTitle  from '../../hooks/usePageTitle'

const Login = () => {
    usePageTitle("로그인")

    const { users } = useContext(userContext)
    const { isLogin, setIsLogin, setCurrentUser } = useContext(loginContext)

    const [idValue, setId] = useState('')
    const [pwValue, setPw] = useState('')

    const inputRef = useRef(null)

    const idChange = (e) => {
        setId(e.target.value)
    }
    const pwChange = (e) => {
        setPw(e.target.value)
    }

    const navi = useNavigate()

    const loginBtn = () => {
        const user = users.find(user => user.id === idValue && user.password == pwValue);
        if (user) {
            setIsLogin(true);
            setCurrentUser(user.id)

            sessionStorage.setItem("isLogin", "true");
            sessionStorage.setItem("currentUser", user.id);

            navi("/");
        } else {
            alert("아이디 또는 비밀번호가 틀렸습니다")
            inputRef.current.focus()
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                        JOBBLE
                    </h1>
                    <p className="text-slate-600">로그인하여 계속하세요</p>
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
                                    onKeyDown={(e) => { if (e.key == 'Enter') { loginBtn() } }}
                                    className="w-full pl-10 pr-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-slate-400"
                                    placeholder="아이디를 입력하세요"
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
                                    ref={inputRef}
                                    value={pwValue}
                                    onChange={pwChange}
                                    onKeyDown={(e) => { if (e.key == 'Enter') { loginBtn() } }}
                                    className="w-full pl-10 pr-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-slate-400"
                                    placeholder="비밀번호를 입력하세요"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={() => navi("/forgot-password")}
                                className="text-sm text-blue-600 hover:text-purple-600 font-medium transition-colors duration-200 hover:underline"
                            >
                                비밀번호를 잊으셨나요?
                            </button>
                        </div>

                        <button
                            onClick={loginBtn}
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 px-4 rounded-xl hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            로그인
                        </button>

                        <div className="text-center pt-4">
                            <p className="text-slate-600 text-sm">
                                계정이 없으신가요?{' '}
                                <button
                                    onClick={() => navi("/register")}
                                    className="text-blue-600 hover:text-purple-600 font-semibold transition-colors duration-200"
                                >
                                    회원가입
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

export default Login