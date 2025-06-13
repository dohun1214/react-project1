import { useNavigate } from 'react-router-dom';

const Notfound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8 mb-6">
          <div className="w-24 h-24 bg-gradient-to-r from-red-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <span className="text-4xl">🔍</span>
          </div>

          <div className="mb-4">
            <h1 className="text-6xl font-black bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent mb-2">
              404
            </h1>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              페이지를 찾을 수 없습니다
            </h2>
            <p className="text-slate-600">
              요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => navigate('/')}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <span className="flex items-center justify-center gap-2">
                <span>🏠</span>
                홈으로 돌아가기
              </span>
            </button>

            <button
              onClick={() => navigate(-1)}
              className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium py-3 px-6 rounded-xl transition-all duration-200"
            >
              <span className="flex items-center justify-center gap-2">
                <span>←</span>
                이전 페이지로
              </span>
            </button>
          </div>
        </div>

        <div className="bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center justify-center gap-2">
            <span className="w-6 h-6 bg-gradient-to-r from-green-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs">💡</span>
            </span>
            이런 페이지는 어떠세요?
          </h3>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <button
              onClick={() => navigate('/recruit')}
              className="bg-white/70 hover:bg-white/90 text-slate-700 py-3 px-4 rounded-xl transition-all duration-200 border border-slate-200 hover:border-blue-300"
            >
              <div className="flex flex-col items-center gap-1">
                <span className="text-lg">💼</span>
                <span className="font-medium">채용정보</span>
              </div>
            </button>

            <button
              onClick={() => navigate('/communityboard')}
              className="bg-white/70 hover:bg-white/90 text-slate-700 py-3 px-4 rounded-xl transition-all duration-200 border border-slate-200 hover:border-green-300"
            >
              <div className="flex flex-col items-center gap-1">
                <span className="text-lg">💬</span>
                <span className="font-medium">커뮤니티</span>
              </div>
            </button>

            <button
              onClick={() => navigate('/mypage')}
              className="bg-white/70 hover:bg-white/90 text-slate-700 py-3 px-4 rounded-xl transition-all duration-200 border border-slate-200 hover:border-purple-300"
            >
              <div className="flex flex-col items-center gap-1">
                <span className="text-lg">👤</span>
                <span className="font-medium">마이페이지</span>
              </div>
            </button>

            <button
              onClick={() => navigate('/login')}
              className="bg-white/70 hover:bg-white/90 text-slate-700 py-3 px-4 rounded-xl transition-all duration-200 border border-slate-200 hover:border-indigo-300"
            >
              <div className="flex flex-col items-center gap-1">
                <span className="text-lg">🔐</span>
                <span className="font-medium">로그인</span>
              </div>
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-slate-400 text-sm">
            문제가 계속 발생한다면{' '}
            <button
              onClick={() => window.location.reload()}
              className="text-blue-500 hover:text-blue-600 underline transition-colors duration-200"
            >
              페이지를 새로고침
            </button>
            해보세요
          </p>
        </div>
      </div>
    </div>
  );
};

export default Notfound;