import { useSearchParams, Link } from 'react-router-dom';
import { useContext } from 'react';
import { jobPostContext } from '../contexts/jobPostContext';
import usePageTitle from '../hooks/usePageTitle';

function SearchResults() {
  usePageTitle("검색 결과")
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');
  const { jobPosts } = useContext(jobPostContext);

  // 간단한 검색 결과 필터링
  const results = keyword
    ? jobPosts.filter(post =>
      post.title.toLowerCase().includes(keyword.toLowerCase()) ||
      post.company.toLowerCase().includes(keyword.toLowerCase()) ||
      post.content.toLowerCase().includes(keyword.toLowerCase())
    )
    : [];

  if (!keyword) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="p-6">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-orange-500">⚠️</span>
              </div>
              <h2 className="text-xl font-semibold text-slate-800 mb-2">검색어가 없습니다</h2>
              <p className="text-slate-600 mb-6">검색할 키워드를 입력해주세요.</p>
              <Link to="/recruit">
                <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200">
                  채용정보로 돌아가기
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="p-6">
        <div className="max-w-6xl mx-auto mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  검색 결과
                </h1>
                <p className="text-slate-600">
                  '<span className="font-semibold text-blue-600">{keyword}</span>' 검색 결과입니다
                </p>
              </div>
              <Link to="/recruit">
                <button className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-3 rounded-xl font-medium transition-all duration-200">
                  <span className="flex items-center gap-2">
                    <span>📋</span>
                    전체 채용정보
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
            <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs">🔍</span>
                  </span>
                  <p className="text-sm text-slate-600">
                    총 <span className="font-semibold text-blue-600">{results.length}</span>개의 검색 결과
                  </p>
                </div>
                {results.length > 0 && (
                  <div className="text-xs text-slate-500">
                    최신순으로 정렬됨
                  </div>
                )}
              </div>
            </div>

            {results.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {results.map((post, index) => (
                  <div
                    key={post.id}
                    className="hover:bg-white/50 transition-all duration-200 group"
                  >
                    <Link to={`/recruit/${post.id}`}>
                      <div className="flex justify-between items-start p-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                              {post.company}
                            </span>
                            <span className="text-slate-400 text-xs">•</span>
                            <span className="text-slate-500 text-xs">{post.region}</span>
                          </div>

                          <h3 className="text-lg font-semibold text-slate-800 group-hover:text-blue-600 transition-colors duration-200 mb-2 line-clamp-2">
                            {post.title}
                          </h3>

                          <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                            <span className="flex items-center gap-1">
                              <span className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-blue-500 text-xs">⏰</span>
                              </span>
                              {post.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="w-4 h-4 bg-purple-100 rounded-full flex items-center justify-center">
                                <span className="text-purple-500 text-xs">🏢</span>
                              </span>
                              {post.category}
                            </span>
                          </div>

                          <div className="text-sm text-slate-600 line-clamp-2">
                            {post.content}
                          </div>
                        </div>

                        <div className="text-right ml-6 flex-shrink-0">
                          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold mb-2">
                            {parseInt(post.pay.replace(/[,원]/g, '')).toLocaleString()}원
                          </div>
                          <p className="text-xs text-slate-400">
                            {new Date(post.createdAt).toLocaleString('ko-KR', {
                              month: '2-digit',
                              day: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl text-slate-400">🔍</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-600 mb-2">
                  검색 결과가 없습니다
                </h3>
                <p className="text-slate-500 mb-6">
                  '<span className="font-medium">{keyword}</span>'에 대한 검색 결과를 찾을 수 없습니다.<br />
                  다른 키워드로 검색해보시거나 전체 채용정보를 확인해보세요.
                </p>
                <div className="flex justify-center gap-3">
                  <Link to="/recruit">
                    <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200">
                      전체 채용정보 보기
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {results.length === 0 && (
          <div className="max-w-6xl mx-auto mt-6">
            <div className="bg-blue-50/50 backdrop-blur-sm rounded-2xl border border-blue-200/30 p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs">💡</span>
                </span>
                검색 팁
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
                <div className="space-y-2">
                  <p>• 키워드를 간단하게 입력해보세요</p>
                  <p>• 회사명이나 업종으로 검색해보세요</p>
                  <p>• 지역명으로도 검색할 수 있습니다</p>
                </div>
                <div className="space-y-2">
                  <p>• 띄어쓰기를 확인해보세요</p>
                  <p>• 유사한 단어로 검색해보세요</p>
                  <p>• 필터 기능을 활용해보세요</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResults;