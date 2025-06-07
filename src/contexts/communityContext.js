import { createContext } from "react";

const communityContext = createContext();

const initialCommunityPosts = [
    {
        id: 0,
        title: "제목1",
        text: "내용1",
        emotion: 4, // 감정 추가
        createdAt: new Date().toISOString(),
        viewCount: 3,
        commentCount: 1,
        likeCount: 2,
        comments: [
            {
                id: 1,
                text: "첫 번째 댓글입니다!",
                createdAt: new Date().toISOString(),
            },
        ],
    },
    {
        id: 1,
        title: "제목2",
        text: "내용2",
        emotion: 2,
        createdAt: new Date().toISOString(),
        viewCount: 0,
        commentCount: 0,
        likeCount: 0,
        comments: [],
    },
    {
        id: 2,
        title: "제목3",
        text: "내용3",
        emotion: 5,
        createdAt: new Date().toISOString(),
        viewCount: 0,
        commentCount: 0,
        likeCount: 0,
        comments: [],
    },
];

export { communityContext, initialCommunityPosts };
