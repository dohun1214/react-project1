import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../../components';
import { jobPostContext } from '../../contexts/';

const RecruitBoard = () => {
  const { jobPosts } = useContext(jobPostContext);

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

        {/* Job Posts Section */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
            {jobPosts.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {jobPosts.map((item, index) => (
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
                  <span className="text-3xl text-slate-400">💼</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-600 mb-2">아직 채용 공고가 없습니다</h3>
                <p className="text-slate-500 mb-6">첫 번째 채용 공고를 작성해보세요</p>
                <Link to="/recruit/new">
                  <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200">
                    공고 작성하기
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitBoard;