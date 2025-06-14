import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { loginContext, jobPostContext } from "../contexts";
import usePageTitle from '../hooks/usePageTitle'

function Main() {
    usePageTitle("JOBBLE")
    const navigate = useNavigate();
    const { isLogin, currentUser } = useContext(loginContext);
    const { jobPosts } = useContext(jobPostContext);

    // 최신 채용공고 4개 가져오기
    const latestJobs = jobPosts.slice(0, 4);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="p-6 max-w-7xl mx-auto">


                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-6 h-80">
                            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <span className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center shadow-lg shadow-orange-200">
                                    <span className="text-white text-sm">🔥</span>
                                </span>
                                추천 알바
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-56">
                                {latestJobs.slice(0, 2).map((job, index) => (
                                    <div
                                        key={job.id || index}
                                        className="bg-white/50 backdrop-blur-sm rounded-xl p-4 hover:shadow-lg hover:bg-white/70 transition-all duration-300 cursor-pointer border border-white/30 flex flex-col justify-between"
                                        onClick={() => navigate(`/recruit/${job.id}`)}
                                    >
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-lg shadow-blue-200">
                                                    {job.company}
                                                </span>
                                                <span className="text-xs text-slate-500">{job.region}</span>
                                            </div>
                                            <h3 className="font-semibold text-slate-800 mb-1 line-clamp-2">{job.title}</h3>
                                            <p className="text-sm text-slate-600 mb-2">
                                                시급 {parseInt(job.pay.replace(/[,원]/g, '')).toLocaleString()}원
                                            </p>
                                        </div>
                                        <div className="flex items-center text-xs text-green-600">
                                            <span>💰</span>
                                            <span className="ml-1">{job.time} 근무</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 backdrop-blur-md rounded-2xl shadow-lg border border-blue-200/50 p-6 hover:shadow-xl transition-all duration-300 cursor-pointer h-48"
                            onClick={() => navigate('/quiz')}>
                            <div className="flex items-center justify-between h-full">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-200">
                                            <span className="text-white text-sm">🎯</span>
                                        </span>
                                        <span className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg">NEW</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-blue-900 mb-2">
                                        ABTI 테스트 초대장이 도착했어요!
                                    </h3>
                                    <p className="text-blue-700 text-sm mb-3">
                                        나에게 딱 맞는 알바 유형을 찾아보세요
                                    </p>
                                    <div className="inline-flex items-center gap-2 text-blue-600 font-medium text-sm hover:text-blue-800 transition-colors">
                                        <span>테스트 시작하기</span>
                                        <span>→</span>
                                    </div>
                                </div>
                                <div className="text-4xl text-blue-500 animate-pulse">🎪</div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-6 h-80">
                            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <span className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-200">
                                    <span className="text-white text-sm">👤</span>
                                </span>
                                {isLogin ? `안녕하세요, ${currentUser}님!` : '회원 메뉴'}
                            </h2>
                            <div className="flex flex-col justify-center h-56">
                                {isLogin ? (
                                    <div className="text-center">
                                        <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-200">
                                            <span className="text-white text-2xl">👋</span>
                                        </div>
                                        <p className="text-slate-600 text-lg">환영합니다!</p>
                                        <p className="text-slate-500 text-sm mt-1">상단 메뉴를 이용해주세요</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <button
                                            onClick={() => navigate("/login")}
                                            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 font-medium shadow-lg shadow-blue-200 transform hover:-translate-y-0.5"
                                        >
                                            로그인
                                        </button>
                                        <button
                                            onClick={() => navigate("/register")}
                                            className="w-full py-3 bg-white/70 backdrop-blur-sm text-slate-700 rounded-xl hover:bg-white transition-all duration-300 font-medium border border-white/30 shadow-lg"
                                        >
                                            회원가입
                                        </button>
                                        <div
                                            className="text-center text-sm text-blue-600 hover:text-purple-600 cursor-pointer transition-colors duration-200 font-medium"
                                            onClick={() => navigate("/forgot-password")}
                                        >
                                            아이디/비밀번호 찾기
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-6 h-48 cursor-pointer hover:shadow-xl transition-all duration-300"
                            onClick={() => navigate("/mypage")}>
                            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <span className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg shadow-purple-200">
                                    <span className="text-white text-sm">📅</span>
                                </span>
                                일정 관리
                            </h2>
                            <div className="flex flex-col items-center justify-center h-24">
                                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-3 shadow-lg shadow-purple-200">
                                    <span className="text-white text-2xl">📅</span>
                                </div>
                                <p className="text-slate-600 text-center text-sm">마이페이지에서 일정을 관리하세요</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                            <span className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                                <span className="text-white">💼</span>
                            </span>
                            채용중인 알바
                        </h2>
                        <button
                            onClick={() => navigate('/recruit')}
                            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg shadow-blue-200 transform hover:-translate-y-0.5"
                        >
                            전체 보기
                        </button>
                    </div>

                    {latestJobs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {latestJobs.map((job, index) => (
                                <div
                                    key={job.id || index}
                                    className="bg-white/50 backdrop-blur-sm rounded-xl p-6 hover:shadow-lg hover:bg-white/70 transition-all duration-300 cursor-pointer border border-white/30 transform hover:-translate-y-1"
                                    onClick={() => navigate(`/recruit/${job.id}`)}
                                >
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg shadow-blue-200">
                                            {job.company}
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-slate-800 mb-2 line-clamp-2">{job.title}</h3>
                                    <div className="space-y-1 text-sm text-slate-600">
                                        <div className="flex items-center gap-1">
                                            <span>💰</span>
                                            <span className="font-semibold text-green-600">{parseInt(job.pay.replace(/[,원]/g, '')).toLocaleString()}원</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span>📍</span>
                                            <span>{job.region}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span>⏰</span>
                                            <span>{job.time}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl text-slate-400">💼</span>
                            </div>
                            <p className="text-slate-500 mb-4">아직 등록된 채용공고가 없습니다</p>
                            <button
                                onClick={() => navigate('/recruit/new')}
                                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg shadow-green-200 transform hover:-translate-y-0.5"
                            >
                                첫 공고 등록하기
                            </button>
                        </div>
                    )}
                </div>

                <div className="mt-8 bg-gradient-to-r from-slate-50/50 to-blue-50/50 backdrop-blur-sm rounded-2xl border border-white/30 p-6">
                    <div className="text-center">
                        <h3 className="text-lg font-semibold text-slate-800 mb-2">더 많은 서비스를 이용해보세요</h3>
                        <p className="text-slate-600 mb-4">JOBBLE에서 제공하는 다양한 기능들을 활용해보세요</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => navigate('/resume')}
                                className="bg-white/70 backdrop-blur-sm hover:bg-white text-slate-700 px-4 py-2 rounded-lg border border-white/30 transition-all duration-300 text-sm font-medium shadow-lg transform hover:-translate-y-0.5"
                            >
                                📝 이력서 관리
                            </button>
                            <button
                                onClick={() => navigate('/communityboard')}
                                className="bg-white/70 backdrop-blur-sm hover:bg-white text-slate-700 px-4 py-2 rounded-lg border border-white/30 transition-all duration-300 text-sm font-medium shadow-lg transform hover:-translate-y-0.5"
                            >
                                💬 후기 보기
                            </button>
                            <button
                                onClick={() => navigate('/customer-service')}
                                className="bg-white/70 backdrop-blur-sm hover:bg-white text-slate-700 px-4 py-2 rounded-lg border border-white/30 transition-all duration-300 text-sm font-medium shadow-lg transform hover:-translate-y-0.5"
                            >
                                🎧 고객센터
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;