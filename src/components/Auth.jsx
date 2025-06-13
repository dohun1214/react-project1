import { Link } from "react-router-dom";
import { useContext } from "react";
import { loginContext } from "../contexts";

export default function Auth() {
    const { isLogin, setIsLogin, currentUser, setCurrentUser } = useContext(loginContext)

    const logoutHandler = () => {
        setIsLogin(false);
        setCurrentUser(null);

        sessionStorage.removeItem("isLogin")
        sessionStorage.removeItem("currentUser")
    }

    return (
        <div className="flex items-center gap-3">
            {isLogin ? (
                <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-xl shadow-lg">
                        <span className="text-sm font-medium">
                            안녕하세요, <span className="font-bold">{currentUser}</span>님! 👋
                        </span>
                    </div>
                    <button
                        onClick={logoutHandler}
                        className="group bg-slate-100 hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 text-slate-600 hover:text-white px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-red-200 transform hover:-translate-y-0.5"
                    >
                        <span className="flex items-center gap-2">
                            <span className="text-sm">🚪</span>
                            로그아웃
                        </span>
                    </button>
                </div>
            ) : (
                <div className="flex items-center gap-2">
                    <Link
                        to="/login"
                        className="group bg-white/50 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 text-slate-700 hover:text-white px-4 py-2 rounded-xl font-medium transition-all duration-300 border border-white/30 hover:border-transparent hover:shadow-lg hover:shadow-blue-200 transform hover:-translate-y-0.5"
                    >
                        <span className="flex items-center gap-2">
                            <span className="text-sm">🔑</span>
                            로그인
                        </span>
                    </Link>
                    <Link
                        to="/register"
                        className="group bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-xl font-medium transition-all duration-300 shadow-lg shadow-purple-200 hover:shadow-xl hover:shadow-purple-300 transform hover:-translate-y-0.5"
                    >
                        <span className="flex items-center gap-2">
                            <span className="text-sm">✨</span>
                            회원가입
                        </span>
                    </Link>
                </div>
            )}
        </div>
    )
}