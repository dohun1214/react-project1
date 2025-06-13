import { useState } from "react";

const DateModal = ({ isOpen, onClose, selectedDate, wishlist, events = [], addEvent, deleteEvent }) => {
    const [newEvent, setNewEvent] = useState("");

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newEvent.trim() && selectedDate) {
            addEvent(selectedDate, newEvent.trim());
            setNewEvent("");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-white">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-xl font-bold">
                                {selectedDate &&
                                    `${selectedDate.getFullYear()}년 
                                    ${selectedDate.getMonth() + 1}월 
                                    ${selectedDate.getDate()}일`}
                            </h3>
                            <p className="text-blue-100 text-sm mt-1">일정을 관리하세요</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                        >
                            <span className="text-white font-bold">✕</span>
                        </button>
                    </div>
                </div>

                <div className="p-6 max-h-96 overflow-y-auto">
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-lg">📋</span>
                            <h4 className="font-semibold text-slate-800">등록된 일정</h4>
                            <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full font-medium">
                                {events.length}
                            </span>
                        </div>

                        {events.length === 0 ? (
                            <div className="text-center py-8">
                                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <span className="text-slate-400 text-xl">📅</span>
                                </div>
                                <p className="text-slate-500 text-sm">등록된 일정이 없습니다</p>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {events.map((event, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-between items-center bg-slate-50 hover:bg-slate-100 p-3 rounded-xl transition-colors group"
                                    >
                                        <span className="text-slate-700 flex-1 truncate pr-2">{event}</span>
                                        <button
                                            onClick={() => deleteEvent(selectedDate, index)}
                                            className="opacity-0 group-hover:opacity-100 w-7 h-7 bg-red-100 hover:bg-red-200 rounded-lg flex items-center justify-center transition-all duration-200"
                                        >
                                            <span className="text-red-500 text-sm">🗑️</span>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="mb-4">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-lg">➕</span>
                            <h4 className="font-semibold text-slate-800">새 일정 추가</h4>
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newEvent}
                                onChange={(e) => setNewEvent(e.target.value)}
                                placeholder="일정을 입력하세요"
                                className="flex-1 p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button
                                type="submit"
                                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 font-medium"
                            >
                                추가
                            </button>
                        </div>
                    </form>
                </div>

                <div className="bg-slate-50 p-4 flex justify-end">
                    <button
                        className="px-6 py-2 bg-slate-200 hover:bg-slate-300 rounded-xl transition-colors font-medium text-slate-700"
                        onClick={onClose}
                    >
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DateModal;
