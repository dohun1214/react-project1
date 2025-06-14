import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { communityContext } from '../../contexts';
import { emotionList } from '../../utils/emotionList';
import { getEmotionImage } from '../../utils/getEmotionImage';
import usePageTitle from '../../hooks/usePageTitle'

const CommunityDetail = () => {
    const { id } = useParams();
    const { communityPosts, communityPostDispatch } = useContext(communityContext);
    const navigate = useNavigate();
    const post = communityPosts.find((p) => p.id === Number(id));
    const [commentText, setCommentText] = useState('');

    usePageTitle(post.title);
    useEffect(() => {
        if (post) {
            const updated = communityPosts.map((p) =>
                p.id === post.id ? { ...p, viewCount: p.viewCount + 1 } : p
            );
            communityPostDispatch({ type: 'UPDATE_POSTS', payload: updated });
        }
    }, [id]);

    // 감정 이름 가져오기 함수
    const getEmotionName = (emotionId) => {
        const emotion = emotionList.find(e => e.emotionId === emotionId);
        return emotion ? emotion.emotionName : '보통';
    };

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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <div className="max-w-4xl mx-auto p-6">
                <div className="mb-8">
                    <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/30 p-8">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent mb-4 leading-tight">
                                    {post.title}
                                </h1>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="flex items-center gap-2 bg-blue-50/80 rounded-xl p-3">
                                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                                            <span className="text-white text-sm">🕒</span>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 font-medium">작성일</p>
                                            <p className="text-sm font-semibold text-slate-700">{time.split(' ')[0]}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 bg-green-50/80 rounded-xl p-3">
                                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                                            <span className="text-white text-sm">👁️</span>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 font-medium">조회수</p>
                                            <p className="text-sm font-semibold text-slate-700">{post.viewCount}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 bg-purple-50/80 rounded-xl p-3">
                                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                                            <span className="text-white text-sm">💬</span>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 font-medium">댓글</p>
                                            <p className="text-sm font-semibold text-slate-700">{post.commentCount}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 bg-pink-50/80 rounded-xl p-3">
                                        <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg flex items-center justify-center">
                                            <span className="text-white text-sm">❤️</span>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 font-medium">좋아요</p>
                                            <p className="text-sm font-semibold text-slate-700">{post.likeCount}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-3 ml-6">
                                <button
                                    onClick={() => navigate(`/edit/${post.id}`)}
                                    className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                >
                                    <span className="flex items-center gap-2">
                                        <span>✏️</span>
                                        수정
                                    </span>
                                </button>
                                <button
                                    onClick={() => navigate('/communityboard')}
                                    className="bg-white/70 hover:bg-white text-slate-700 px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl border border-slate-200"
                                >
                                    <span className="flex items-center gap-2">
                                        <span>📋</span>
                                        목록
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/30 p-8 mb-8">
                    {post.emotion && (
                        <div className="flex justify-center mb-8">
                            <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 rounded-2xl p-6 border border-blue-200/30 shadow-md">
                                <div className="text-center">
                                    <div className="relative inline-block mb-4">
                                        <div className="w-16 h-16 bg-gradient-to-br from-white to-blue-50 rounded-full p-3 shadow-md border-2 border-white">
                                            <img
                                                src={getEmotionImage(post.emotion)}
                                                alt={getEmotionName(post.emotion)}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-sm">
                                            <span className="text-white text-xs font-bold">{post.emotion}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                            {getEmotionName(post.emotion)}
                                        </h3>
                                        <div className="flex justify-center space-x-1">
                                            {Array.from({ length: 5 }, (_, index) => (
                                                <span
                                                    key={index}
                                                    className={`text-lg transition-all duration-200 ${index < post.emotion
                                                        ? 'text-yellow-500 transform scale-105'
                                                        : 'text-slate-300'
                                                        }`}
                                                >
                                                    ★
                                                </span>
                                            ))}
                                        </div>
                                        <p className="text-xs text-slate-600 font-medium">
                                            {post.emotion}/5점 평가
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 border border-slate-200/50 shadow-inner">
                        <div className="whitespace-pre-wrap text-slate-700 leading-relaxed text-lg">
                            {post.text}
                        </div>
                    </div>

                    <div className="flex justify-center mt-10">
                        <button
                            onClick={handleLike}
                            className="group bg-gradient-to-r from-pink-500 via-red-500 to-rose-500 text-white px-12 py-4 rounded-2xl hover:from-pink-600 hover:via-red-600 hover:to-rose-600 focus:outline-none focus:ring-4 focus:ring-pink-500/30 transform hover:-translate-y-1 transition-all duration-200 shadow-xl hover:shadow-2xl font-semibold text-lg"
                        >
                            <span className="flex items-center gap-3">
                                <span className="text-2xl group-hover:animate-pulse">❤️</span>
                                좋아요 ({post.likeCount})
                            </span>
                        </button>
                    </div>
                </div>

                <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/30 p-8">
                    <div className="mb-10">
                        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                                <span className="text-white">💭</span>
                            </div>
                            댓글 작성
                        </h2>
                        <div className="space-y-4">
                            <textarea
                                className="w-full h-32 bg-white/70 border-2 border-slate-200 rounded-2xl p-6 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-400 transition-all duration-200 placeholder-slate-400 resize-none text-lg backdrop-blur-sm"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="댓글을 입력해주세요..."
                            />
                            <div className="flex justify-end">
                                <button
                                    onClick={handleAddComment}
                                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                >
                                    댓글 등록
                                </button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                                <span className="text-white">💬</span>
                            </div>
                            댓글 목록 ({post.comments.length})
                        </h2>
                        {post.comments.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-3xl text-slate-400">💭</span>
                                </div>
                                <h3 className="text-xl font-semibold text-slate-600 mb-2">등록된 댓글이 없습니다</h3>
                                <p className="text-slate-400">첫 번째 댓글을 작성해보세요!</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {post.comments.map((c, index) => (
                                    <div key={c.id} className="bg-gradient-to-r from-white/70 to-slate-50/70 rounded-2xl p-6 border border-slate-200/50 hover:shadow-lg transition-all duration-200 backdrop-blur-sm">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                                {index + 1}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                                <span className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                                                    <span className="text-blue-500 text-xs">🕒</span>
                                                </span>
                                                {new Date(c.createdAt).toLocaleString('ko-KR', {
                                                    month: '2-digit',
                                                    day: '2-digit',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </div>
                                        </div>
                                        <p className="text-slate-700 leading-relaxed text-lg pl-11">{c.text}</p>
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