import { useContext, useState, useEffect } from "react";
import { jobPostContext, loginContext, userContext } from "../contexts";
import { Calendar, DateModal, Post } from "../components";
import { Link } from "react-router-dom";
import usePageTitle from '../hooks/usePageTitle'

const EVENTS_STORAGE_KEY = "calendar_events";

export default function Mypage() {
    usePageTitle("마이페이지")
    const { currentUser } = useContext(loginContext);
    const { users } = useContext(userContext);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const { jobPosts } = useContext(jobPostContext)
    const currentUserObj = users?.find(user => user.id === currentUser);
    const applications = currentUserObj.applications || [];

    const [events, setEvents] = useState(() => {
        const savedEvents = localStorage.getItem(EVENTS_STORAGE_KEY);
        return savedEvents ? JSON.parse(savedEvents) : {};
    });

    useEffect(() => {
        localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(events));
    }, [events]);

    const addEvent = (date, eventText) => {
        const dateKey = date.toISOString().split('T')[0];
        setEvents(prev => {
            const newEvents = {
                ...prev,
                [dateKey]: [...(prev[dateKey] || []), eventText]
            };
            return newEvents;
        });
    };

    const deleteEvent = (date, index) => {
        const dateKey = date.toISOString().split('T')[0];
        setEvents(prev => {
            const updatedEvents = [...prev[dateKey]];
            updatedEvents.splice(index, 1);
            const newEvents = {
                ...prev,
                [dateKey]: updatedEvents
            };
            if (updatedEvents.length === 0) {
                delete newEvents[dateKey];
            }
            return newEvents;
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="p-6 max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        마이페이지
                    </h1>
                    <p className="text-slate-600">관심 공고와 일정을 한눈에 관리하세요</p>
                </div>

                <div className="mb-8">
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
                                <span className="text-white text-xl">❤️</span>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-800">관심 공고</h2>
                                <p className="text-slate-500 text-sm">저장한 채용 공고를 확인하세요</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {jobPosts.filter(item => currentUserObj?.wishlist?.includes(item.id)).length > 0 ? (
                                jobPosts.filter(item => currentUserObj?.wishlist?.includes(item.id)).map(item => (
                                    <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100">
                                        <Link to={`/recruit/${item.id}`}>
                                            <Post id={item.id} {...item} />
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl text-slate-400">💼</span>
                                    </div>
                                    <p className="text-slate-500">아직 관심 공고가 없습니다</p>
                                    <p className="text-slate-400 text-sm">채용 공고에서 하트를 눌러 저장해보세요</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-200/50 p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-200/30 to-transparent rounded-full -mr-16 -mt-16"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-200/30 to-transparent rounded-full -ml-12 -mb-12"></div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <span className="text-white text-xl">🎯</span>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-800">지원 공고</h2>
                                    <p className="text-blue-600 text-sm font-medium">내가 지원한 채용 공고를 확인하세요</p>
                                </div>
                                <div className="ml-auto">
                                    <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                                        {applications.length}개
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {applications.length > 0 ? (
                                    applications.map(job => (
                                        <div key={job.id} className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-blue-200/50 hover:border-blue-300">
                                            <div className="flex items-start gap-3">
                                                <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                                <div className="flex-1">
                                                    <Link to={`/recruit/${job.id}`}>
                                                        <Post id={job.id} {...job} />
                                                    </Link>
                                                </div>
                                                <div className="flex-shrink-0">
                                                    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                                                        지원완료
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-16">
                                        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <span className="text-3xl text-blue-400">🚀</span>
                                        </div>
                                        <p className="text-slate-700 font-medium mb-2">아직 지원한 공고가 없습니다</p>
                                        <p className="text-blue-600 text-sm">채용 공고 상세에서 지원하기 버튼을 눌러보세요</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                                <span className="text-white text-xl">📅</span>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-800">일정 관리</h2>
                                <p className="text-slate-500 text-sm">면접 일정과 중요한 날짜를 기록하세요</p>
                            </div>
                        </div>

                        <Calendar
                            currentDate={currentDate}
                            setCurrentDate={setCurrentDate}
                            events={events}
                            onDateClick={(date) => {
                                setSelectedDate(date);
                                setIsModalOpen(true);
                            }}
                        />
                    </div>
                </div>

                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                                <span className="text-white text-xl">👤</span>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-800">회원 정보</h2>
                                <p className="text-slate-500 text-sm">개인 정보를 확인하고 수정하세요</p>
                            </div>
                        </div>
                        <Link to="/user/edit">
                            <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-xl font-medium transition-all duration-200">
                                수정
                            </button>
                        </Link>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">아이디</label>
                            <div className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-600">
                                {currentUserObj?.id || ''}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">비밀번호</label>
                            <div className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-600">
                                ••••••••
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">이메일</label>
                            <div className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-600">
                                {currentUserObj?.email || ''}
                            </div>
                        </div>
                    </div>
                </div>

                <DateModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    selectedDate={selectedDate}
                    wishlist={currentUserObj?.wishlist || []}
                    events={selectedDate ? events[selectedDate.toISOString().split('T')[0]] || [] : []}
                    addEvent={addEvent}
                    deleteEvent={deleteEvent}
                />
            </div>
        </div>
    );
}