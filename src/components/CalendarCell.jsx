// CalendarCell.jsx
const CalendarCell = ({ date, isCurrentMonth, isToday, events, handleDateClick }) => {
    return (
        <div
            onClick={handleDateClick}
            className={`min-h-24 p-3 border-r border-b border-slate-100 cursor-pointer transition-all duration-200 hover:bg-blue-50 group ${!isCurrentMonth ? 'text-slate-300 bg-slate-50/50' : 'bg-white'
                } ${isToday ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600' : ''}`}
        >
            <div className={`text-right text-sm font-medium mb-2 ${isToday ? 'text-white' : isCurrentMonth ? 'text-slate-700' : 'text-slate-400'
                }`}>
                {date.getDate()}
            </div>

            <div className="space-y-1">
                {events.slice(0, 2).map((event, index) => (
                    <div
                        key={index}
                        className={`text-xs p-1 rounded truncate ${isToday
                                ? 'bg-white/20 text-white'
                                : 'bg-gradient-to-r from-blue-100 to-purple-100 text-slate-700'
                            }`}
                    >
                        {event}
                    </div>
                ))}
                {events.length > 2 && (
                    <div className={`text-xs font-medium ${isToday ? 'text-white/80' : 'text-slate-500'
                        }`}>
                        +{events.length - 2}개 더
                    </div>
                )}
            </div>
        </div>
    );
};

export default CalendarCell;