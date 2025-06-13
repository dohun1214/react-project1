import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Review, Button } from '../../components';
import { communityContext } from '../../contexts/communityContext';

const CommunityBoard = () => {
  const { communityPosts, communityPostDispatch } = useContext(communityContext);

  const handleDeletePost = (id) => {
    communityPostDispatch({ type: 'DELETE_POSTS', payload: id });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            커뮤니티
          </h1>
          <p className="text-slate-600">알바 후기와 경험을 공유하고 소통하세요</p>
        </div>

        {/* New Post Button */}
        <div className="mb-8">
          <Link to="/communitynew">
            <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2">
              <span className="text-lg">✏️</span>
              새 글 작성
            </button>
          </Link>
        </div>

        {/* Posts Container */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
          {communityPosts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gradient-to-r from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl text-slate-400">💬</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-600 mb-2">아직 작성된 후기가 없습니다</h3>
              <p className="text-slate-400 mb-6">첫 번째 알바 후기를 작성해보세요!</p>
              <Link to="/communitynew">
                <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-200 font-semibold">
                  후기 작성하기
                </button>
              </Link>
            </div>
          ) : (
            <div className="space-y-0">
              {communityPosts.map((post) => (
                <Review key={post.id} post={post} onDelete={handleDeletePost} />
              ))}
            </div>
          )}
        </div>

        {/* Stats Card */}
        {communityPosts.length > 0 && (
          <div className="mt-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-blue-200/30">
            <div className="flex items-center justify-center text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">{communityPosts.length}</div>
                <div className="text-sm text-slate-600">총 후기</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityBoard;