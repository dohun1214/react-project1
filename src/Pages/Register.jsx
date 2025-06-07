import { useState, useContext } from "react"
import { userContext } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";

function Register() {

    const { users, userDispatch } = useContext(userContext)
    const navi = useNavigate()

    const [idValue, setId] = useState("");
    const [pwValue, setPw] = useState("");

    const idChange = (e) => {
        setId(e.target.value)
    }
    const pwChange = (e) => {
        setPw(e.target.value)
    }

    const registerBtn = (idValue, pwValue) => {
        userDispatch({ type: 'ADD_USER', payload: { id: idValue, password: pwValue, wishlist: [] } })
        navi("/");
    }

    return (
        <>
            <input type="text" value={idValue} onChange={idChange} className="border-1" name="id" />
            <br />
            <input type="password" value={pwValue} onChange={pwChange} className="border-1" name="password" />
            <br />
            <button onClick={() => { registerBtn(idValue, pwValue) }}>회원가입</button>
        </>
    )
}

export default Register