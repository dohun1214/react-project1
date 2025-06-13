import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components';
import { jobPostContext } from '../../contexts/jobPostContext';

const timeOptions = ['오전', '오후', '풀타임', '협의 후 결정'];
const daysOptions = ['평일', '주말', '야간', '주휴'];
const categoryOptions = ['편의점', '음식점', '사무직', '서비스업', '기술직', '기타'];
const regionOptions = ['강남구', '강동구', '강북구', '강서구','관악구', '광진구', '구로구', '금천구','노원구', '도봉구', '동대문구', '동작구','마포구', '서대문구', '서초구', '성동구','성북구', '송파구', '양천구', '영등포구','용산구', '은평구', '종로구', '중구', '중랑구']
const payOptions = ['10,000원', '10,500원', '11,000원', '12,000원', '12,500원', '협의 후 결정'];
const preferenceOptions = ['경력자 우대','초보 가능','급구','친절','장기 근무 가능','시간 협의 가능','즉시 출근','주말 근무 가능','유니폼 제공','식사 제공'];


const RecruitNew = () => {
  const { jobPosts, setJobPosts } = useContext(jobPostContext);
  const [company, setCompany] = useState('');
  const [title, setTitle] = useState('');
  const [time, setTime] = useState(timeOptions[0]);
  const [days, setDays] = useState(daysOptions[0]);
  const [region, setRegion] = useState(regionOptions[0]);
  const [pay, setPay] = useState(payOptions[0]);
  const [category, setCategory] = useState(categoryOptions[0]);
  const [preference, setPreference] = useState(preferenceOptions[0]);
  const [content, setContent] = useState('');
  const [author] = useState('익명');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!company.trim()) return alert('회사명을 입력해주세요.');
    if (!title.trim()) return alert('제목을 입력해주세요.');
    if (!content.trim()) return alert('내용을 입력해주세요.');

    const newItem = {
      id: Date.now(),
      company: company.trim(),
      title: title.trim(),
      time, days, region, pay, category, preference,
      content, author,
      createdAt: new Date().toISOString(),
    };
    setJobPosts([newItem, ...jobPosts]);
    navigate('/recruit');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              새 채용공고 작성
            </h1>
            <p className="text-slate-600">새로운 채용 공고를 작성하여 인재를 모집하세요</p>
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
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
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
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
                  ['근무시간', time, setTime, timeOptions, '⏰'],
                  ['근무요일', days, setDays, daysOptions, '📅'],
                  ['지역', region, setRegion, regionOptions, '📍'],
                  ['급여', pay, setPay, payOptions, '💰'],
                  ['카테고리', category, setCategory, categoryOptions, '🏢'],
                  ['우대사항', preference, setPreference, preferenceOptions, '⭐'],
                ].map(([label, value, setter, opts, icon]) => (
                  <div key={label}>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {label}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-slate-400 text-sm">{icon}</span>
                      </div>
                      <select
                        value={value}
                        onChange={(e) => setter(e.target.value)}
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
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full h-48 p-4 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-slate-400 resize-none"
                  placeholder="채용 공고의 상세 내용을 입력하세요&#10;&#10;예시:&#10;- 업무 내용&#10;- 자격 요건&#10;- 우대 사항&#10;- 복리후생&#10;- 근무 환경 등"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-6 border-t border-slate-200">
              <Button
                onClick={() => navigate('/recruit')}
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-3"
              >
                취소
              </Button>
              <Button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                <span className="flex items-center gap-2">
                  <span>📝</span>
                  공고 등록
                </span>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-blue-50/50 backdrop-blur-sm rounded-2xl border border-blue-200/30 p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs">💡</span>
            </span>
            작성 팁
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
            <div className="space-y-2">
              <p>• 구체적이고 명확한 채용 제목을 작성하세요</p>
              <p>• 업무 내용과 자격 요건을 상세히 기술하세요</p>
              <p>• 근무 조건과 복리후생을 명시하세요</p>
            </div>
            <div className="space-y-2">
              <p>• 지원 방법과 절차를 안내하세요</p>
              <p>• 회사 소개와 근무 환경을 설명하세요</p>
              <p>• 연락처 정보를 정확히 입력하세요</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitNew;