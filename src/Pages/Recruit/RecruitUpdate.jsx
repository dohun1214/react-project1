import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components';
import { jobPostContext } from '../../contexts/jobPostContext';
import usePageTitle from '../../hooks/usePageTitle'

const timeOptions = ['오전', '오후', '풀타임', '협의 후 결정'];
const daysOptions = ['평일', '주말', '야간', '주휴'];
const categoryOptions = ['편의점', '음식점', '사무직', '서비스업', '기술직', '기타'];
const regionOptions = ['강남구', '용산구', '동작구', '송파구', '마포구', '서초구', '영등포구', '종로구', '중구', '관악구', '구로구', '광진구', '성동구', '노원구', '강북구'];
const payOptions = ['10,000원', '10,500원', '11,000원', '12,000원', '12,500원', '협의 후 결정'];
const preferenceOptions = ['경력자 우대', '초보 가능', '급구', '친절'];

const RecruitUpdate = () => {
  const { id } = useParams();
  const { jobPosts, setJobPosts } = useContext(jobPostContext);
  const [form, setForm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  usePageTitle("채용공고 수정 - JOBBLE")  

  useEffect(() => {
    const post = jobPosts.find((p) => p.id === Number(id));
    if (!post) return navigate('/recruit');
    setForm(post);
    setIsLoading(false);
  }, [id, jobPosts, navigate]);

  const updateField = (field, value) =>
    setForm({ ...form, [field]: value });

  const handleUpdate = () => {
    if (!form.company.trim()) return alert('회사명을 입력해주세요.');
    if (!form.title.trim()) return alert('제목을 입력해주세요.');
    if (!form.content.trim()) return alert('내용을 입력해주세요.');

    setJobPosts(jobPosts.map((p) => (p.id === form.id ? form : p)));
    navigate(`/recruit/${form.id}`);
  };

  if (isLoading || !form) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-2xl text-blue-500">⏳</span>
          </div>
          <p className="text-slate-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  채용공고 수정
                </h1>
                <p className="text-slate-600">채용 공고 내용을 수정하세요</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <span className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-500 text-xs">📝</span>
                </span>
                수정 모드
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
          <div className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  회사명 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-slate-400 text-sm">🏢</span>
                  </div>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => updateField('company', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-slate-400"
                    placeholder="회사명을 입력하세요"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  채용 제목 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-slate-400 text-sm">💼</span>
                  </div>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => updateField('title', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-slate-400"
                    placeholder="채용 제목을 입력하세요"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs">⚙️</span>
                </span>
                근무 조건
              </h3>
              <div className="grid lg:grid-cols-3 gap-4">
                {[
                  ['time', '근무시간', timeOptions, '⏰'],
                  ['days', '근무요일', daysOptions, '📅'],
                  ['region', '지역', regionOptions, '📍'],
                  ['pay', '급여', payOptions, '💰'],
                  ['category', '카테고리', categoryOptions, '🏢'],
                  ['preference', '우대사항', preferenceOptions, '⭐'],
                ].map(([key, label, opts, icon]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {label}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-slate-400 text-sm">{icon}</span>
                      </div>
                      <select
                        value={form[key]}
                        onChange={(e) => updateField(key, e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
                      >
                        {opts.map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-slate-400 text-sm">▼</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                상세 내용 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <textarea
                  value={form.content}
                  onChange={(e) => updateField('content', e.target.value)}
                  className="w-full h-48 p-4 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-slate-400 resize-none"
                  placeholder="채용 공고의 상세 내용을 입력하세요"
                />
              </div>
            </div>

            <div className="bg-blue-50/50 backdrop-blur-sm rounded-xl border border-blue-200/30 p-4">
              <div className="flex items-center gap-2 text-sm text-blue-700">
                <span className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">ℹ️</span>
                </span>
                <span>원본 작성일: {new Date(form.createdAt).toLocaleString('ko-KR')}</span>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-6 border-t border-slate-200">
              <Button
                onClick={() => navigate(`/recruit/${form.id}`)}
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-3"
              >
                <span className="flex items-center gap-2">
                  <span>❌</span>
                  취소
                </span>
              </Button>
              <Button
                onClick={handleUpdate}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                <span className="flex items-center gap-2">
                  <span>💾</span>
                  수정 완료
                </span>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-amber-50/50 backdrop-blur-sm rounded-2xl border border-amber-200/30 p-6">
          <h3 className="text-lg font-semibold text-amber-800 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 bg-amber-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs">⚠️</span>
            </span>
            수정 시 주의사항
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-amber-700">
            <div className="space-y-2">
              <p>• 수정된 내용은 즉시 반영됩니다</p>
              <p>• 중요한 정보 변경 시 지원자에게 안내하세요</p>
            </div>
            <div className="space-y-2">
              <p>• 급여나 근무조건 변경 시 신중히 검토하세요</p>
              <p>• 수정 후 내용을 다시 한번 확인하세요</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitUpdate;