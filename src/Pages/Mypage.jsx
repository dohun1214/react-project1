import { useContext } from "react"
import { loginContext, userContext } from "../contexts"

export default function Mypage() {
    const { currentUser } = useContext(loginContext)
    const { users } = useContext(userContext)
    const wishlist = users.find(user => user.id == currentUser).wishlist // wishlist 배열
    console.log(wishlist)

    return (
        <div>
            <p>마이페이지</p>
            <p>로그인한 아이디 : {currentUser}</p>
                {wishlist.map((wishItem,index) => (
                    <span key={index}> {wishItem}</span>
                ))}
        </div>
    )
}

