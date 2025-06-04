import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';
import { communityContext } from '../contexts/communityContext';

const CommunityUpdate = () => {
  const { id } = useParams();
  const { communityPosts, communityPostDispatch } = useContext(communityContext);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const nav = useNavigate();

  useEffect(() => {
    const postToEdit = communityPosts.find((p) => p.id === Number(id));
    if (!postToEdit) {
      alert('수정할 게시글을 찾을 수 없습니다.');
      nav(-1);
      return;
    }
    setTitle(postToEdit.title);
    setText(postToEdit.text);
  }, [id, communityPosts, nav]);

  const handleUpdate = () => {
    if (!title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }
    if (!text.trim()) {
      alert('내용을 입력해주세요.');
      return;
    }

    const updatedList = communityPosts.map((p) =>
      p.id === Number(id) ? { ...p, title: title.trim(), text: text.trim() } : p
    );
    communityPostDispatch({ type: 'UPDATE_POSTS', payload: updatedList });
    nav('/communityboard', { replace: true });
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* 수정 페이지 타이틀 + 뒤로가기 */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">후기 수정</h1>
        <Button onClick={() => nav(-1)}>← 뒤로 가기</Button>
      </div>

      {/* 제목 수정란 */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">제목</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      {/* 내용 수정란 */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">내용</label>
        <textarea
          className="w-full h-40 border rounded p-3"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

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
