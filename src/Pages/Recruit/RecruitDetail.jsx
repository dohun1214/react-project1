import { useContext, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, SalaryCalculatorModal } from '../../components';
import { jobPostContext } from '../../contexts'

const RecruitDetail = () => {
  const { id } = useParams();
  const { jobPosts } = useContext(jobPostContext);
  const nav = useNavigate();
  const post = jobPosts.find((p) => p.id === Number(id));
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-red-500">❌</span>
          </div>
          <h2 className="text-xl font-semibold text-slate-800 mb-2">존재하지 않는 공고입니다</h2>
          <p className="text-slate-600 mb-6">요청하신 채용 공고를 찾을 수 없습니다.</p>
          <Button onClick={() => nav('/recruit')} className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            목록으로 돌아가기
          </Button>
        </div>
      </div>
    );
  }

  const time = new Date(post.createdAt).toLocaleString();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm px-3 py-1 rounded-full font-medium">
                    {post.company}
                  </span>
                  <span className="text-slate-400 text-sm">•</span>
                  <span className="text-slate-500 text-sm">{post.region}</span>
                </div>
                <h1 className="text-3xl font-bold text-slate-800 mb-2">{post.title}</h1>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <span className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-500 text-xs">👤</span>
                    </span>
                    작성자: {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-500 text-xs">📅</span>
                    </span>
                    작성일: {time}
                  </span>
                </div>
              </div>
              <Button
                onClick={() => nav('/recruit')}
                className="bg-slate-200 text-slate-700 hover:bg-slate-300 transition-all duration-200"
              >
                ← 목록
              </Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">📋</span>
                </span>
                근무 조건
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-500 text-xs">⏰</span>
                    </span>
                    <span className="text-sm font-medium text-slate-600">근무시간</span>
                  </div>
                  <p className="text-slate-800 font-medium">{post.time}</p>
                </div>
                <div className="bg-white/50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-500 text-xs">📅</span>
                    </span>
                    <span className="text-sm font-medium text-slate-600">근무요일</span>
                  </div>
                  <p className="text-slate-800 font-medium">{post.days}</p>
                </div>
                <div className="bg-white/50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-500 text-xs">📍</span>
                    </span>
                    <span className="text-sm font-medium text-slate-600">지역</span>
                  </div>
                  <p className="text-slate-800 font-medium">{post.region}</p>
                </div>
                <div className="bg-white/50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-500 text-xs">💰</span>
                    </span>
                    <span className="text-sm font-medium text-slate-600">급여</span>
                  </div>
                  <p className="text-lg font-bold text-green-600">{ parseInt(post.pay.replace(/[,원]/g, '')).toLocaleString()}원</p>
                </div>
                <div className="bg-white/50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-orange-500 text-xs">🏢</span>
                    </span>
                    <span className="text-sm font-medium text-slate-600">카테고리</span>
                  </div>
                  <p className="text-slate-800 font-medium">{post.category}</p>
                </div>
                <div className="bg-white/50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center">
                      <span className="text-pink-500 text-xs">⭐</span>
                    </span>
                    <span className="text-sm font-medium text-slate-600">우대사항</span>
                  </div>
                  <p className="text-slate-800 font-medium">{post.preference}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-gradient-to-r from-green-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">📝</span>
                </span>
                상세 내용
              </h2>
              <div className="bg-white/50 rounded-xl p-6">
                <div className="whitespace-pre-wrap text-slate-700 leading-relaxed">
                  {post.content}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">🧮</span>
                </span>
                급여 계산기
              </h3>
              <p className="text-slate-600 text-sm mb-4">
                예상 급여를 계산해보세요
              </p>
              <button
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-4 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                onClick={openModal}
              >
                계산기 열기
              </button>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">⚙️</span>
                </span>
                관리
              </h3>
              <div className="space-y-3">
                <Button
                  onClick={() => nav(`/recruit/edit/${post.id}`)}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                >
                  <span className="flex items-center justify-center gap-2">
                    <span>✏️</span>
                    수정하기
                  </span>
                </Button>
                <Link to="/recruit" className="block">
                  <Button className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700">
                    <span className="flex items-center justify-center gap-2">
                      <span>📋</span>
                      목록으로
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {isModalOpen && (
          <SalaryCalculatorModal
            isOpen={isModalOpen}
            onClose={closeModal}
            {...post}
          />
        )}
      </div>
    </div>
  );
};

export default RecruitDetail;