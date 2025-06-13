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

    // 로컬 스토리지에서 일정 불러오기
    const [events, setEvents] = useState(() => {
        const savedEvents = localStorage.getItem(EVENTS_STORAGE_KEY);
        return savedEvents ? JSON.parse(savedEvents) : {};
    });

    // events가 변경될 때마다 로컬 스토리지에 저장
    useEffect(() => {
        localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(events));
    }, [events]);

    // 일정 추가 함수
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

    // 일정 삭제 함수
    const deleteEvent = (date, index) => {
        const dateKey = date.toISOString().split('T')[0];
        setEvents(prev => {
            const updatedEvents = [...prev[dateKey]];
            updatedEvents.splice(index, 1);
            const newEvents = {
                ...prev,
                [dateKey]: updatedEvents
            };
            // 일정이 모두 삭제된 경우 해당 날짜 키 제거
            if (updatedEvents.length === 0) {
                delete newEvents[dateKey];
            }
            return newEvents;
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="p-6 max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        마이페이지
                    </h1>
                    <p className="text-slate-600">관심 공고와 일정을 한눈에 관리하세요</p>
                </div>

                {/* Wishlist Section */}
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

                {/* Calendar Section */}
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