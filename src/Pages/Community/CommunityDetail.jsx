import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../components';
import { communityContext } from '../../contexts';
import { getEmotionImage } from '../../utils/getEmotionImage';

const CommunityDetail = () => {
    const { id } = useParams();
    const { communityPosts, communityPostDispatch } = useContext(communityContext);
    const navigate = useNavigate();
    const post = communityPosts.find((p) => p.id === Number(id));
    const [commentText, setCommentText] = useState('');

    useEffect(() => {
        if (post) {
            const updated = communityPosts.map((p) =>
                p.id === post.id ? { ...p, viewCount: p.viewCount + 1 } : p
            );
            communityPostDispatch({ type: 'UPDATE_POSTS', payload: updated });
        }
    }, [id]);

    if (!post) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8 text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl text-red-500">❌</span>
                    </div>
                    <h2 className="text-xl font-semibold text-slate-800 mb-2">게시글을 찾을 수 없습니다</h2>
                    <p className="text-slate-600 mb-6">요청하신 게시글이 존재하지 않거나 삭제되었습니다.</p>
                    <button
                        onClick={() => navigate('/communityboard')}
                        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 font-semibold"
                    >
                        목록으로 돌아가기
                    </button>
                </div>
            </div>
        );
    }

    const time = new Date(post.createdAt).toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });

    const handleLike = () => {
        const updated = communityPosts.map((p) =>
            p.id === post.id ? { ...p, likeCount: p.likeCount + 1 } : p
        );
        communityPostDispatch({ type: 'UPDATE_POSTS', payload: updated });
    };

    const handleAddComment = () => {
        if (!commentText.trim()) return alert('댓글을 입력해주세요.');
        const newComment = {
            id: Date.now(),
            text: commentText.trim(),
            createdAt: new Date().toISOString(),
        };
        const updated = communityPosts.map((p) =>
            p.id === post.id
                ? {
                    ...p,
                    comments: [...p.comments, newComment],
                    commentCount: p.commentCount + 1,
                }
                : p
        );
        communityPostDispatch({ type: 'UPDATE_POSTS', payload: updated });
        setCommentText('');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="max-w-4xl mx-auto p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">{post.title}</h1>
                        <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                            <span className="flex items-center gap-1">
                                <span className="text-blue-500">🕒</span>
                                {time}
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="text-green-500">👁️</span>
                                {post.viewCount}
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="text-purple-500">💬</span>
                                {post.commentCount}
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="text-pink-500">❤️</span>
                                {post.likeCount}
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate('/communityboard')}
                        className="bg-white/70 backdrop-blur-sm text-slate-700 px-4 py-2 rounded-xl hover:bg-white transition-all duration-200 shadow-sm border border-white/20 font-medium"
                    >
                        ← 목록
                    </button>
                </div>

                {/* Main Content */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8 mb-8">
                    {/* Emotion Image */}
                    {post.emotion && (
                        <div className="flex justify-center mb-6">
                            <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
                                <img
                                    src={getEmotionImage(post.emotion)}
                                    alt="감정 상태"
                                    className="w-12 h-12"
                                />
                            </div>
                        </div>
                    )}

                    {/* Post Content */}
                    <div className="whitespace-pre-wrap text-slate-700 leading-relaxed text-lg mb-8">
                        {post.text}
                    </div>

                    {/* Like Button */}
                    <div className="flex justify-center">
                        <button
                            onClick={handleLike}
                            className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-8 py-3 rounded-xl hover:from-pink-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold flex items-center gap-2"
                        >
                            <span className="text-lg">❤️</span>
                            좋아요 ({post.likeCount})
                        </button>
                    </div>
                </div>

                {/* Comment Section */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
                    {/* Comment Form */}
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <span className="text-blue-500">💭</span>
                            댓글 작성
                        </h2>
                        <div className="space-y-4">
                            <textarea
                                className="w-full h-32 bg-white/50 border border-slate-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-slate-400 resize-none"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="댓글을 입력해주세요..."
                            />
                            <div className="flex justify-end">
                                <button
                                    onClick={handleAddComment}
                                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 font-semibold"
                                >
                                    댓글 등록
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Comments List */}
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <span className="text-green-500">💬</span>
                            댓글 목록 ({post.comments.length})
                        </h2>
                        {post.comments.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl text-slate-400">💭</span>
                                </div>
                                <p className="text-slate-500">등록된 댓글이 없습니다</p>
                                <p className="text-slate-400 text-sm">첫 번째 댓글을 작성해보세요!</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {post.comments.map((c) => (
                                    <div key={c.id} className="bg-white/50 rounded-xl p-4 border border-slate-100">
                                        <div className="flex items-center gap-2 mb-2 text-sm text-slate-500">
                                            <span className="text-blue-500">🕒</span>
                                            {new Date(c.createdAt).toLocaleString('ko-KR', {
                                                month: '2-digit',
                                                day: '2-digit',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </div>
                                        <p className="text-slate-700 leading-relaxed">{c.text}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommunityDetail;