import { useContext } from "react"
import Post  from "../components/Post"
import { postContext } from "../contexts/postContext"

function Recruit() {
    const { posts, setPosts } = useContext(postContext)

    return (
        <>
            {posts.map((item) => {
                return <li key={item.id}><Post {...item}/></li>
            })}
        </>
    )
}

export default Recruit