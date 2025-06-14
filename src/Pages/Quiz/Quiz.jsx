import { useQuiz } from '../../contexts/QuizContext';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import usePageTitle from '../../hooks/usePageTitle'


export default function Quiz() {
  usePageTitle("알바 유형 검사 - JOBBLE"); 
  const { questions, currentIdx, answer, resultType, typeData } = useQuiz();
  const navigate = useNavigate();

  if (resultType) {
    const { title, description, scores, image } = typeData[resultType];
    const labelMap = { social: '사회력', logical: '논리력', creative: '창의력', detail: '꼼꼼함' };

    const getGradientClass = (pct) => {
      if (pct < 25) return 'from-red-400 to-pink-400';
      if (pct < 50) return 'from-pink-400 to-purple-400';
      if (pct === 50) return 'from-purple-500 to-purple-500';
      if (pct < 75) return 'from-purple-400 to-blue-400';
      return 'from-blue-400 to-sky-400';
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="p-6 max-w-4xl mx-auto">
          {/* 헤더 */}
          <div className="mb-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                🎯 알바 유형 검사 결과
              </h1>
              <p className="text-slate-600">당신에게 딱 맞는 알바 유형을 확인해보세요</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* 메인 결과 */}
            <div className="lg:col-span-2 space-y-6">
              {/* 유형 결과 */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
                <div className="text-center mb-6">
                  <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg px-4 py-2 rounded-full font-bold mb-4">
                    {resultType}
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-3">{title}</h2>

                  <div className="bg-white/50 rounded-xl p-4 mb-6">
                    <img
                      src={image}
                      alt={`${resultType} 결과 이미지`}
                      className="w-full max-w-md mx-auto rounded-xl shadow-md"
                    />
                  </div>
                </div>

                <div className="bg-white/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs">✨</span>
                    </span>
                    당신의 특징
                  </h3>
                  <ul className="space-y-3">
                    {description.map((line, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-slate-700">
                        <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span className="leading-relaxed">{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 능력치 분석 */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
                <h3 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">📊</span>
                  </span>
                  능력치 분석
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(scores).map(([dim, val]) => {
                    const maxPerDim = 2;
                    const pct = ((val + maxPerDim) / (2 * maxPerDim)) * 100;
                    const gradient = getGradientClass(pct);

                    return (
                      <div key={dim} className="bg-white/50 rounded-xl p-4">
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-medium text-slate-700">{labelMap[dim]}</span>
                          <span className="text-lg font-bold text-slate-800">{Math.round(pct)}%</span>
                        </div>
                        <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                          <div
                            className={`h-3 rounded-full bg-gradient-to-r ${gradient} transition-all duration-700 ease-out`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <div className="mt-2 text-xs text-slate-500">
                          {pct >= 75 ? '매우 높음' : pct >= 50 ? '높음' : pct >= 25 ? '보통' : '낮음'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 사이드바 */}
            <div className="space-y-6">
              {/* 추천 액션 */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-200/50 p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">🎯</span>
                  </span>
                  추천 액션
                </h3>
                <p className="text-slate-600 text-sm mb-4">
                  이 결과를 바탕으로 나에게 맞는 알바를 찾아보세요!
                </p>
                <Button
                  onClick={() => navigate('/recruit')}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-4 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <span className="flex items-center justify-center gap-2">
                    <span>💼</span>
                    알바 찾기
                  </span>
                </Button>
              </div>

              {/* 다시하기 */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">🔄</span>
                  </span>
                  다시 검사하기
                </h3>
                <p className="text-slate-600 text-sm mb-4">
                  다른 답변으로 새로운 결과를 확인해보세요
                </p>
                <Button
                  onClick={() => window.location.reload()}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-3 rounded-xl font-medium transition-all duration-200"
                >
                  <span className="flex items-center justify-center gap-2">
                    <span>🔄</span>
                    다시하기
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 퀴즈 진행 중
  const { text, options } = questions[currentIdx];
  const progress = ((currentIdx + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="p-6 max-w-2xl mx-auto">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              🎯 알바 유형 검사
            </h1>
            <p className="text-slate-600">나에게 딱 맞는 알바 유형을 찾아보세요</p>

            {/* 프로그레스 바 */}
            <div className="mt-6">
              <div className="flex justify-between text-sm font-medium text-slate-600 mb-2">
                <span>진행률</span>
                <span>{currentIdx + 1} / {questions.length}</span>
              </div>
              <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                <div
                  className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 질문 */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">❓</span>
            </div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">
              질문 {currentIdx + 1}
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed">
              {text}
            </p>
          </div>

          <div className="space-y-4">
            {options.map((opt, idx) => (
              <Button
                key={idx}
                onClick={() => answer(opt.value)}
                className="w-full bg-white/50 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white text-slate-700 hover:shadow-lg border border-slate-200 hover:border-transparent px-6 py-4 rounded-xl font-medium transition-all duration-300 transform hover:-translate-y-1 group"
              >
                <span className="flex items-center justify-between">
                  <span className="text-left flex-1">{opt.label}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    →
                  </span>
                </span>
              </Button>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-slate-500 text-sm">
              정확한 결과를 위해 솔직하게 답변해주세요
            </p>
          </div>
        </div>

        {/* 안내 */}
        <div className="mt-6 bg-blue-50/50 backdrop-blur-sm rounded-2xl border border-blue-200/30 p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs">💡</span>
            </span>
            검사 안내
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
            <div className="space-y-1">
              <p>• 총 {questions.length}개의 질문에 답변해주세요</p>
              <p>• 각 질문은 업무 스타일을 분석합니다</p>
            </div>
            <div className="space-y-1">
              <p>• 정확한 결과를 위해 솔직하게 답변하세요</p>
              <p>• 검사 결과로 맞춤 알바를 추천받을 수 있어요</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}