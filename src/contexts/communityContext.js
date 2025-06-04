import { createContext } from "react";

const communityContext = createContext()

const initialCommunityPosts = [
    {
        id: 0,
        title: "제목1",
        content: '내용1'
    },
    {
        id: 1,
        title: "제목2",
        content: '내용2'
    },
    {
        id: 2,
        title: "제목3",
        content: '내용3'
    },
]

export {communityContext,initialCommunityPosts}