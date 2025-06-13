import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Review, Button } from '../../components';
import { communityContext } from '../../contexts/communityContext';

const CommunityBoard = () => {
  const { communityPosts, communityPostDispatch } = useContext(communityContext);
  const [searchTerm, setSearchTerm] = useState('');

  // 간단한 검색 필터링
  const filteredPosts = searchTerm.trim()
    ? communityPosts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.text.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : communityPosts;

  const handleDeletePost = (id) => {
    communityPostDispatch({ type: 'DELETE_POSTS', payload: id });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            커뮤니티
          </h1>
          <p className="text-slate-600">알바 후기와 경험을 공유하고 소통하세요</p>
        </div>

        <div className="mb-8">
          <Link to="/communitynew">
            <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2">
              <span className="text-lg">✏️</span>
              새 글 작성
            </button>
          </Link>
        </div>

        <div className="mb-6">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-4">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-slate-400"
                placeholder="제목이나 내용으로 검색하세요..."
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-slate-400">🔍</span>
              </div>
              {searchTerm && (
                <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-slate-500">
                  {filteredPosts.length}개 결과
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gradient-to-r from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl text-slate-400">
                  {searchTerm ? '🔍' : '💬'}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-slate-600 mb-2">
                {searchTerm ? '검색 결과가 없습니다' : '아직 작성된 후기가 없습니다'}
              </h3>
              <p className="text-slate-400 mb-6">
                {searchTerm ? '다른 키워드로 검색해보세요!' : '첫 번째 알바 후기를 작성해보세요!'}
              </p>
              <Link to="/communitynew">
                <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-200 font-semibold">
                  후기 작성하기
                </button>
              </Link>
            </div>
          ) : (
            <div className="space-y-0">
              {filteredPosts.map((post) => (
                <Review key={post.id} post={post} onDelete={handleDeletePost} />
              ))}
            </div>
          )}
        </div>

        {filteredPosts.length > 0 && (
          <div className="mt-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-blue-200/30">
            <div className="flex items-center justify-center text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {searchTerm ? filteredPosts.length : communityPosts.length}
                </div>
                <div className="text-sm text-slate-600">
                  {searchTerm ? '검색 결과' : '총 후기'}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityBoard;