import { useContext, useState, useEffect } from "react";
import { jobPostContext, loginContext, userContext } from "../contexts";
import { Calendar, DateModal, Post } from "../components";
import { Link } from "react-router-dom";

const EVENTS_STORAGE_KEY = "calendar_events";

export default function Mypage() {
    const { currentUser } = useContext(loginContext);
    const { users } = useContext(userContext);
    const wishlist = users?.find(user => user.id == currentUser)?.wishlist || [];
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const { jobPosts } = useContext(jobPostContext)
    const currentUserObj = users?.find(user => user.id === currentUser);

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
                            {jobPosts.filter(item => currentUserObj.wishlist.includes(item.id)).length > 0 ? (
                                jobPosts.filter(item => currentUserObj.wishlist.includes(item.id)).map(item => (
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

                {/* 회원 정보 섹션 */}
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
                    wishlist={wishlist}
                    events={selectedDate ? events[selectedDate.toISOString().split('T')[0]] || [] : []}
                    addEvent={addEvent}
                    deleteEvent={deleteEvent}
                />
            </div>
        </div>
    );
}