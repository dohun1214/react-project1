import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, EmotionSelector } from '../../components';
import { communityContext } from '../../contexts';
import usePageTitle from '../../hooks/usePageTitle'

const CommunityNew = () => {
  usePageTitle("새 글 작성 - 커뮤니티");

  const { communityPostDispatch } = useContext(communityContext);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [emotion, setEmotion] = useState(3); // 기본 감정값 (중립 등)
  const nav = useNavigate();

  const handleSubmit = () => {
    if (!title.trim()) return alert('제목을 입력해주세요.');
    if (!text.trim()) return alert('내용을 입력해주세요.');

    const newPost = {
      id: Date.now(),
      title: title.trim(),
      text: text.trim(),
      emotion,
      createdAt: new Date().toISOString(),
      viewCount: 0,
      likeCount: 0,
      commentCount: 0,
      comments: [],
    };

    communityPostDispatch({ type: 'ADD_POST', payload: newPost });
    nav('/communityboard', { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-3xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              알바 후기 작성
            </h1>
            <p className="text-slate-600">당신의 소중한 경험을 다른 사람들과 공유해보세요</p>
          </div>
          <button
            onClick={() => nav(-1)}
            className="bg-white/70 backdrop-blur-sm text-slate-700 px-4 py-2 rounded-xl hover:bg-white transition-all duration-200 shadow-sm border border-white/20 font-medium"
          >
            ← 뒤로 가기
          </button>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
          <div className="space-y-8">
            <div>
              <label className=" text-lg font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <span className="text-blue-500">📝</span>
                제목
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="후기 제목을 입력해주세요 (예: 카페 아르바이트 솔직 후기)"
                className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-slate-400 text-lg"
              />
            </div>

            <div>
              <label className=" text-lg font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <span className="text-purple-500">⭐</span>
                평가
              </label>
              <div className="bg-white/50 rounded-xl p-4 border border-slate-200">
                <EmotionSelector selectedId={emotion} onSelect={setEmotion} />
              </div>
            </div>

            <div>
              <label className=" text-lg font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <span className="text-green-500">💭</span>
                내용
              </label>
              <textarea
                className="w-full h-48 bg-white/50 border border-slate-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-slate-400 resize-none text-lg leading-relaxed"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="알바 경험을 자세히 적어주세요.&#10;&#10;예시:&#10;- 근무 환경은 어땠나요?&#10;- 직장 동료들은 어떤가요?&#10;- 업무 강도는 어느 정도인가요?&#10;- 급여는 제때 받으셨나요?&#10;- 추천하고 싶은 점이나 주의할 점이 있다면?"
              />
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-4 px-8 rounded-xl hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 text-lg"
              >
                <span className="text-xl">✨</span>
                작성하기
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200/50">
          <h3 className="text-lg font-semibold text-orange-700 mb-3 flex items-center gap-2">
            <span className="text-xl">💡</span>
            작성 팁
          </h3>
          <ul className="space-y-2 text-orange-600">
            <li className="flex items-start gap-2">
              <span className="text-orange-400 mt-1">•</span>
              구체적이고 솔직한 경험을 공유해주세요
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-400 mt-1">•</span>
              다른 사람들에게 도움이 될 수 있는 정보를 포함해주세요
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-400 mt-1">•</span>
              개인정보나 회사 기밀은 포함하지 마세요
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CommunityNew;