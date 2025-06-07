import { useNavigate } from 'react-router-dom';
import Button from './Button';

const Review = ({ post, onDelete }) => {
  const navigate = useNavigate();
  const time = new Date(post.createdAt).toLocaleString();

  return (
    <div className="border p-3 rounded shadow">
      <div className="flex justify-between items-center mb-2">
        <p
          className="font-medium text-lg cursor-pointer"
          onClick={() => navigate(`/post/${post.id}`)}
        >
          {post.title}
        </p>
        <div className="flex space-x-2">
          <Button
            onClick={() => navigate(`/edit/${post.id}`)}
            className="text-blue-500 hover:underline bg-transparent px-0 py-0"
          >
            수정
          </Button>
          <Button
            onClick={() => onDelete(post.id)}
            className="text-red-500 hover:underline bg-transparent px-0 py-0"
          >
            삭제
          </Button>
        </div>
      </div>
      <div className="text-sm text-gray-500 flex space-x-4">
        <span>🕒 {time}</span>
        <span>👁️ {post.viewCount}</span>
        <span>💬 {post.commentCount}</span>
        <span>❤️ {post.likeCount}</span>
      </div>
    </div>
  );
};

export default Review;