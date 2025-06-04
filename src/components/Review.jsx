import { useNavigate } from 'react-router-dom';
import Button from './Button';

const Review = ({ post, onDelete }) => {
  const navigate = useNavigate();


  return (
    <div className="border p-3 rounded shadow flex justify-between items-center">
      {/* 목록에서는 제목만 보여줌 */}
      <p className="font-medium">{post.title}</p>
      <div className="space-x-2">
        <Button onClick={() => navigate(`/edit/${post.id}`)} className="text-blue-500 hover:underline bg-transparent px-0 py-0">수정</Button>
        <Button onClick={() => onDelete(post.id)} className="text-red-500 hover:underline bg-transparent px-0 py-0">삭제</Button>
      </div>
    </div>
  );
};

export default Review;