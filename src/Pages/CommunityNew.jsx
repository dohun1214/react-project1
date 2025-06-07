import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import EmotionSelector from '../components/EmotionSelector';
import { communityContext } from '../contexts/communityContext';

const CommunityNew = () => {
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
    <div className="max-w-2xl mx-auto p-4">
      {/* 타이틀 + 뒤로 가기 */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">알바 후기 작성</h1>
        <Button onClick={() => nav(-1)}>← 뒤로 가기</Button>
      </div>

      {/* 제목 */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">제목</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력해주세요."
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      {/* 감정 선택 */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">평가</label>
        <EmotionSelector selectedId={emotion} onSelect={setEmotion} />
      </div>

      {/* 내용 */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">내용</label>
        <textarea
          className="w-full h-40 border rounded p-3"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="알바 후기를 입력해주세요."
        />
      </div>

      {/* 작성 버튼 */}
      <Button
        onClick={handleSubmit}
        className="bg-[#7989F6] text-white hover:bg-[#4d5de9]"
      >
        작성하기
      </Button>
    </div>
  );
};

export default CommunityNew;
