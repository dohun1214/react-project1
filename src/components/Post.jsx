// Post.jsx
import { useContext } from 'react';
import { loginContext, userContext } from '../contexts';

const Post = ({ id, company, title, region, time, pay, createdAt }) => {
  const { userDispatch } = useContext(userContext)
  const { currentUser } = useContext(loginContext)
  const { users } = useContext(userContext)

  const currentUserObj = users.find(user => user.id === currentUser);
  const isWishlisted = currentUserObj.wishlist.includes(id) || false;

  const toggleWishlist = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (!currentUser) {
      alert("로그인이 필요합니다")
      return;
    }

    const actionType = isWishlisted ? 'WISHLIST_DELETE' : 'WISHLIST_ADD';

    userDispatch({
      type: actionType,
      payload: { postId: id, userId: currentUser }
    })
  };

  return (
    <div className="flex justify-between items-start p-4 hover:bg-slate-50 rounded-xl transition-all duration-200 group">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-2 py-1 rounded-full font-medium">
            {company}
          </span>
          <span className="text-slate-400 text-xs">•</span>
          <span className="text-slate-500 text-xs">{region}</span>
        </div>

        <div className="flex items-start gap-3">
          <button
            onClick={toggleWishlist}
            className="mt-1 p-1 rounded-full hover:bg-white transition-all duration-200 focus:outline-none"
            aria-label={isWishlisted ? "위시리스트 해제" : "위시리스트 추가"}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${isWishlisted
                ? 'bg-gradient-to-r from-pink-500 to-red-500 shadow-lg shadow-pink-200'
                : 'bg-slate-100 hover:bg-slate-200'
              }`}>
              <span className={`text-sm ${isWishlisted ? 'text-white' : 'text-slate-400'}`}>
                {isWishlisted ? '❤️' : '🤍'}
              </span>
            </div>
          </button>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-slate-800 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
              {title}
            </h3>
            <div className="flex items-center gap-2 mt-2 text-sm text-slate-500">
              <span className="flex items-center gap-1">
                <span className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-500 text-xs">⏰</span>
                </span>
                {time}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-right ml-4 flex-shrink-0">
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold mb-2">
          {parseInt(pay).toLocaleString()}원
        </div>
        <p className="text-xs text-slate-400">
          {new Date(createdAt).toLocaleString('ko-KR', {
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  );
};

export default Post;