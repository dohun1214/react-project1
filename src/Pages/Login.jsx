import { useContext, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { userContext } from "../contexts/userContext"
import { loginContext } from '../contexts/loginContext'

const Login = () => {

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

            sessionStorage.setItem("isLogin","true");
            sessionStorage.setItem("currentUser",user.id);
            
            navi("/");
        } else {
            alert("아이디 또는 비밀번호가 틀렸습니다")
            inputRef.current.focus()
        }

    }

    return (
        <div>
            <input type="text" value={idValue} onChange={idChange} onKeyDown={(e) => { if (e.key == 'Enter') { loginBtn() } }} className="border-1" name="id" />
            <br />
            <input type="password" ref={inputRef} value={pwValue} onChange={pwChange} onKeyDown={(e) => { if (e.key == 'Enter') { loginBtn() } }} className="border-1" name="password" />
            <br />
            <button onClick={loginBtn} className="border-1 rounded-sm">로그인</button>
        </div>
    )
}

export default Login