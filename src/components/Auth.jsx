import { Link } from "react-router-dom";
import { useContext } from "react";
import { loginContext } from "../contexts";

export default function Auth() {

    const { isLogin, setIsLogin, currentUser, setCurrentUser } = useContext(loginContext)

    const logoutHandler = () => {
        setIsLogin(false);
        setCurrentUser(null);

        localStorage.removeItem("isLogin")
        localStorage.removeItem("currentUser")
    }

    return (
        <div className="flex items-center space-x-4">
            {isLogin ? (
                <>
                    <span className="text-sm text-gray-700 ">
                        안녕하세요, <b>{currentUser}</b>님
                    </span>

                    <button onClick={logoutHandler} className="text-sm text-gray-600 hover:text-red-500 transition hover:cursor-pointer" >로그아웃</button>
                </>
            ) : (
                <>
                    <Link to="/login" className="text-sm text-gray-600 hover:text-[#7989F6] transition p-2">로그인</Link>
                    <Link to="/register" className="text-sm text-gray-600 hover:text-[#7989F6] transition p-2"> 회원가입</Link>
                </>
            )}
        </div>
    )
}
