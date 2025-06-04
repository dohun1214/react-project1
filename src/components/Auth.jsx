import { Link } from "react-router-dom";

export default function Auth () {
    return(
        <div>
            <Link to={"/login"}  className="text-sm text-gray-600 hover:text-[#7989F6] transition p-5" >로그인 </Link>
            <Link to={"/register"} className="text-sm text-gray-600 hover:text-[#7989F6] transition">회원가입 </Link>
        </div>
    )
}
