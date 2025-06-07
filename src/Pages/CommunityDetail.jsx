import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { communityContext } from '../contexts/communityContext';

const CommunityDetail = () => {
    const { id } = useParams();
    const { communityPosts, communityPostDispatch } = useContext(communityContext);
    const nav = useNavigate();
    const [commentText, setCommentText] = useState('');

    const post = communityPosts.find((p) => p.id === Number(id));

    useEffect(() => {
        if (post) {
            const updatedPosts = communityPosts.map((p) =>
                p.id === post.id ? { ...p, viewCount: p.viewCount + 1 } : p
            );
            communityPostDispatch({ type: 'UPDATE_POSTS', payload: updatedPosts });
        }
    }, [id]);

    if (!post) {
        return (
            <div className="p-4">
                <p>게시글을 찾을 수 없습니다.</p>
                <Button onClick={() => nav('/communityboard')}>목록으로</Button>
            </div>
        );
    }

    const handleLike = () => {
        const updatedPosts = communityPosts.map((p) =>
            p.id === post.id ? { ...p, likeCount: p.likeCount + 1 } : p
        );
        communityPostDispatch({ type: 'UPDATE_POSTS', payload: updatedPosts });
    };

    const handleAddComment = () => {
        if (!commentText.trim()) return alert('댓글을 입력해주세요.');
        const newComment = {
            id: Date.now(),
            text: commentText.trim(),
            createdAt: new Date().toISOString(),
        };
        const updatedPosts = communityPosts.map((p) =>
            p.id === post.id
                ? {
                    ...p,
                    comments: [...p.comments, newComment],
                    commentCount: p.commentCount + 1,
                }
                : p
        );
        communityPostDispatch({ type: 'UPDATE_POSTS', payload: updatedPosts });
        setCommentText('');
    };

    const time = new Date(post.createdAt).toLocaleString();

    return (
        <div className="max-w-2xl mx-auto p-4 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">{post.title}</h1>
                <Button onClick={() => nav('/communityboard')}>← 목록</Button>
            </div>

            <div className="text-sm text-gray-500 flex space-x-4">
                <span>🕒 {time}</span>
                <span>👁️ {post.viewCount}</span>
                <span>💬 {post.commentCount}</span>
                <span>❤️ {post.likeCount}</span>
            </div>

            <div className="whitespace-pre-wrap border rounded p-4">
                {post.text}
            </div>

            <Button onClick={handleLike}>좋아요 ({post.likeCount})</Button>

            <div>
                <h2 className="text-lg font-semibold mb-2">댓글 작성</h2>
                <textarea
                    className="w-full h-24 border rounded p-3 mb-2"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="댓글을 입력해주세요."
                />
                <Button
                    onClick={handleAddComment}
                    className="bg-[#7989F6] text-white hover:bg-[#4d5de9]"
                >
                    댓글 등록
                </Button>
            </div>

            <div>
                <h2 className="text-lg font-semibold mb-2">댓글 목록</h2>
                {post.comments.length === 0 ? (
                    <p className="text-gray-500">등록된 댓글이 없습니다.</p>
                ) : (
                    <ul className="space-y-3">
                        {post.comments.map((c) => (
                            <li key={c.id} className="border-b pb-2">
                                <p className="text-sm text-gray-600 mb-1">
                                    🕒 {new Date(c.createdAt).toLocaleString()}
                                </p>
                                <p>{c.text}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default CommunityDetail;