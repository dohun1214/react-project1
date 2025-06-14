import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../../components';
import { jobPostContext } from '../../contexts/';
import usePageTitle from '../../hooks/usePageTitle'

const RecruitBoard = () => {
  usePageTitle("채용정보 - JOBBLE")
  const { jobPosts } = useContext(jobPostContext);

  const [filters, setFilters] = useState({
    region: '',
    category: '',
    pay: '',
    time: '',
    search: ''
  });

  const regionOptions = ['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구'];
  const categoryOptions = ['편의점', '음식점', '사무직', '서비스업', '기술직', '기타'];
  const timeOptions = ['오전', '오후', '풀타임', '협의 후 결정'];
  const payOptions = ['10,000원', '10,500원', '11,000원', '11,500원', '12,000원', '12,500원', '협의 후 결정'];

  const filteredPosts = jobPosts.filter(post => {
    const matchesRegion = !filters.region || post.region === filters.region;
    const matchesCategory = !filters.category || post.category === filters.category;

    const matchesPay = !filters.pay ||
      post.pay.replace(/,/g, '') === filters.pay.replace(/,/g, '');

    const matchesTime = !filters.time || post.time === filters.time;
    const matchesSearch = !filters.search ||
      post.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      post.company.toLowerCase().includes(filters.search.toLowerCase()) ||
      post.content.toLowerCase().includes(filters.search.toLowerCase());

    return matchesRegion && matchesCategory && matchesPay && matchesTime && matchesSearch;
  });

  // 필터 업데이트
  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // 필터 초기화
  const resetFilters = () => {
    setFilters({
      region: '',
      category: '',
      pay: '',
      time: '',
      search: ''
    });
  };

  const activeFiltersCount = Object.values(filters).filter(value => value !== '').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="p-6">
        <div className="max-w-6xl mx-auto mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  채용정보
                </h1>
                <p className="text-slate-600">최신 채용 공고를 확인하고 지원하세요</p>
              </div>
              <Link to="/recruit/new">
                <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 transform hover:-translate-y-0.5">
                  <span className="flex items-center gap-2">
                    <span className="text-lg">✏️</span>
                    새 공고 작성
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mb-6">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <span className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs">🔍</span>
                </span>
                검색 및 필터
                {activeFiltersCount > 0 && (
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
              </h3>
              {activeFiltersCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="text-sm text-slate-500 hover:text-slate-700 transition-colors duration-200 flex items-center gap-1"
                >
                  <span>🔄</span>
                  초기화
                </button>
              )}
            </div>

            <div className="mb-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-slate-400 text-sm">🔍</span>
                </div>
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => updateFilter('search', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-slate-400"
                  placeholder="회사명, 제목, 내용으로 검색하세요..."
                />
              </div>
            </div>

            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">지역</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-slate-400 text-sm">📍</span>
                  </div>
                  <select
                    value={filters.region}
                    onChange={(e) => updateFilter('region', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
                  >
                    <option value="">전체 지역</option>
                    {regionOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-slate-400 text-sm">▼</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">카테고리</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-slate-400 text-sm">🏢</span>
                  </div>
                  <select
                    value={filters.category}
                    onChange={(e) => updateFilter('category', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
                  >
                    <option value="">전체 카테고리</option>
                    {categoryOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-slate-400 text-sm">▼</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">근무시간</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-slate-400 text-sm">⏰</span>
                  </div>
                  <select
                    value={filters.time}
                    onChange={(e) => updateFilter('time', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
                  >
                    <option value="">전체 시간</option>
                    {timeOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-slate-400 text-sm">▼</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">급여</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-slate-400 text-sm">💰</span>
                  </div>
                  <select
                    value={filters.pay}
                    onChange={(e) => updateFilter('pay', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
                  >
                    <option value="">전체 급여</option>
                    {payOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-slate-400 text-sm">▼</span>
                  </div>
                </div>
              </div>
            </div>

            {activeFiltersCount > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-200">
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-slate-600 mr-2">활성 필터:</span>
                  {filters.search && (
                    <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full flex items-center gap-1">
                      검색: "{filters.search}"
                      <button
                        onClick={() => updateFilter('search', '')}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {filters.region && (
                    <span className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full flex items-center gap-1">
                      지역: {filters.region}
                      <button
                        onClick={() => updateFilter('region', '')}
                        className="text-purple-600 hover:text-purple-800"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {filters.category && (
                    <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full flex items-center gap-1">
                      카테고리: {filters.category}
                      <button
                        onClick={() => updateFilter('category', '')}
                        className="text-green-600 hover:text-green-800"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {filters.time && (
                    <span className="bg-orange-100 text-orange-800 text-sm px-3 py-1 rounded-full flex items-center gap-1">
                      시간: {filters.time}
                      <button
                        onClick={() => updateFilter('time', '')}
                        className="text-orange-600 hover:text-orange-800"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {filters.pay && (
                    <span className="bg-emerald-100 text-emerald-800 text-sm px-3 py-1 rounded-full flex items-center gap-1">
                      급여: {filters.pay}
                      <button
                        onClick={() => updateFilter('pay', '')}
                        className="text-emerald-600 hover:text-emerald-800"
                      >
                        ×
                      </button>
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
            <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-600">
                  총 <span className="font-semibold text-blue-600">{filteredPosts.length}</span>개의 채용공고
                  {jobPosts.length !== filteredPosts.length && (
                    <span className="text-slate-500"> (전체 {jobPosts.length}개 중)</span>
                  )}
                </p>
                {filteredPosts.length > 0 && (
                  <div className="text-xs text-slate-500">
                    최신순으로 정렬됨
                  </div>
                )}
              </div>
            </div>

            {filteredPosts.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {filteredPosts.map((item, index) => (
                  <div
                    key={item.id}
                    className="hover:bg-white/50 transition-all duration-200"
                  >
                    <Link to={`/recruit/${item.id}`}>
                      <Post id={item.id} {...item} />
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl text-slate-400">
                    {activeFiltersCount > 0 ? '🔍' : '💼'}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-slate-600 mb-2">
                  {activeFiltersCount > 0
                    ? '검색 조건에 맞는 채용 공고가 없습니다'
                    : '아직 채용 공고가 없습니다'
                  }
                </h3>
                <p className="text-slate-500 mb-6">
                  {activeFiltersCount > 0
                    ? '다른 조건으로 검색해보시거나 필터를 조정해보세요'
                    : '첫 번째 채용 공고를 작성해보세요'
                  }
                </p>
                {activeFiltersCount > 0 ? (
                  <button
                    onClick={resetFilters}
                    className="bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 mr-3"
                  >
                    필터 초기화
                  </button>
                ) : (
                  <Link to="/recruit/new">
                    <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200">
                      공고 작성하기
                    </button>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitBoard;