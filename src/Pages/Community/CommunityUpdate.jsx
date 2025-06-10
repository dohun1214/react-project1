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
    <div className="max-w-2xl mx-auto p-4">
      {/* 상단 바 */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">후기 수정</h1>
        <Button onClick={() => navigate(-1)}>← 뒤로 가기</Button>
      </div>

      {/* 제목 입력 */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">제목</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      {/* 감정 선택 */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">평가</label>
        <EmotionSelector selectedId={emotion} onSelect={setEmotion} />
      </div>

      {/* 내용 입력 */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">내용</label>
        <textarea
          className="w-full h-40 border rounded p-3"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="알바 후기를 입력해주세요."
        />
      </div>

      {/* 저장 버튼 */}
      <Button
        onClick={handleUpdate}
        className="bg-green-500 text-white hover:bg-green-600"
      >
        저장하기
      </Button>
    </div>
  );
};

export default CommunityUpdate;
