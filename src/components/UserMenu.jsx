import { useContext } from "react"
import { loginContext } from '../contexts/loginContext'

export default function UserMenu() {
    const { setIsLogin } = useContext(loginContext)

    return (
        <div>

            <button onClick={() => { setIsLogin(false) }} className="text-sm text-gray-600 hover:text-[#7989F6] transition">로그아웃</button>
        </div>
    )
}

