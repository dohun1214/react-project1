import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, EmotionSelector } from '../../components';
import { communityContext } from '../../contexts';

const CommunityUpdate = () => {
  const { id } = useParams();
  const { communityPosts, communityPostDispatch } = useContext(communityContext);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [emotion, setEmotion] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const post = communityPosts.find((p) => p.id === Number(id));
    if (!post) {
      alert('수정할 게시글을 찾을 수 없습니다.');
      navigate(-1);
      return;
    }
    setTitle(post.title);
    setText(post.text);
    setEmotion(post.emotion || 3);
  }, [id, communityPosts, navigate]);

  const handleUpdate = () => {
    if (!title.trim()) return alert('제목을 입력해주세요.');
    if (!text.trim()) return alert('내용을 입력해주세요.');

    const updatedPosts = communityPosts.map((p) =>
      p.id === Number(id)
        ? { ...p, title: title.trim(), text: text.trim(), emotion }
        : p
    );

    communityPostDispatch({ type: 'UPDATE_POSTS', payload: updatedPosts });
    navigate('/communityboard', { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-3xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
              후기 수정
            </h1>
            <p className="text-slate-600">후기 내용을 수정하여 더 나은 정보를 제공하세요</p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="bg-white/70 backdrop-blur-sm text-slate-700 px-4 py-2 rounded-xl hover:bg-white transition-all duration-200 shadow-sm border border-white/20 font-medium"
          >
            ← 뒤로 가기
          </button>
        </div>

        {/* Form Container */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
          <div className="space-y-8">
            {/* Title Input */}
            <div>
              <label className=" text-lg font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <span className="text-blue-500">📝</span>
                제목
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 placeholder-slate-400 text-lg"
                placeholder="후기 제목을 입력해주세요"
              />
            </div>

            {/* Emotion Selector */}
            <div>
              <label className=" text-lg font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <span className="text-purple-500">⭐</span>
                평가
              </label>
              <div className="bg-white/50 rounded-xl p-4 border border-slate-200">
                <EmotionSelector selectedId={emotion} onSelect={setEmotion} />
              </div>
            </div>

            {/* Content Textarea */}
            <div>
              <label className=" text-lg font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <span className="text-green-500">💭</span>
                내용
              </label>
              <textarea
                className="w-full h-48 bg-white/50 border border-slate-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 placeholder-slate-400 resize-none text-lg leading-relaxed"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="알바 후기를 입력해주세요."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-4">
              <button
                onClick={() => navigate(-1)}
                className="bg-white/70 backdrop-blur-sm text-slate-700 px-6 py-3 rounded-xl hover:bg-white transition-all duration-200 shadow-sm border border-white/20 font-medium"
              >
                취소
              </button>
              <button
                onClick={handleUpdate}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold py-3 px-8 rounded-xl hover:from-green-600 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                수정 완료
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityUpdate;