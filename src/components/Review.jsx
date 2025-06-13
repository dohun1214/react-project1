import { useNavigate } from 'react-router-dom';
import Button from './Button';

const Review = ({ post, onDelete }) => {
  const navigate = useNavigate();
  const time = new Date(post.createdAt).toLocaleString();

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200 hover:border-blue-300 group cursor-pointer mb-4 last:mb-0">
      <div className="flex justify-between items-start mb-4">
        <h3
          className="font-bold text-xl text-slate-800 group-hover:text-blue-600 transition-colors duration-200 cursor-pointer flex-1 pr-4"
          onClick={() => navigate(`/post/${post.id}`)}
        >
          {post.title}
        </h3>
        <div className="flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/edit/${post.id}`);
            }}
            className="text-blue-500 hover:text-blue-700 font-medium text-sm px-3 py-1 rounded-lg hover:bg-blue-50 transition-all duration-200"
          >
            수정
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(post.id);
            }}
            className="text-red-500 hover:text-red-700 font-medium text-sm px-3 py-1 rounded-lg hover:bg-red-50 transition-all duration-200"
          >
            삭제
          </button>
        </div>
      </div>

      {post.content && (
        <p className="text-slate-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {post.content.substring(0, 120)}...
        </p>
      )}

      <div className="border-t border-slate-100 my-4"></div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <span className="text-slate-400">🕒</span>
            {time}
          </span>
          <span className="flex items-center gap-1">
            <span className="text-blue-400">👁️</span>
            {post.viewCount}
          </span>
          <span className="flex items-center gap-1">
            <span className="text-green-400">💬</span>
            {post.commentCount}
          </span>
          <span className="flex items-center gap-1">
            <span className="text-pink-400">❤️</span>
            {post.likeCount}
          </span>
        </div>

        {post.category && (
          <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-xs font-medium rounded-full">
            {post.category}
          </span>
        )}
      </div>
    </div>
  );
};

export default Review;