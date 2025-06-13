// Calendar.jsx
import CalendarCell from "./CalendarCell";

export default function Calendar({
    currentDate,
    setCurrentDate,
    events,
    onDateClick
}) {
    // 달력 계산 로직
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayofMonth = new Date(year, month, 1);
    const lastDayofMonth = new Date(year, month + 1, 0);

    const startDay = new Date(firstDayofMonth);
    startDay.setDate(firstDayofMonth.getDate() - firstDayofMonth.getDay());

    const endDay = new Date(lastDayofMonth);
    endDay.setDate(lastDayofMonth.getDate() + (6 - lastDayofMonth.getDay()));

    // 주 단위로 날짜 그룹화
    const groupDatesByWeek = () => {
        const weeks = [];
        let currentDate = new Date(startDay);

        while (currentDate <= endDay) {
            const week = [];
            for (let i = 0; i < 7; i++) {
                week.push(new Date(currentDate));
                currentDate.setDate(currentDate.getDate() + 1);
            }
            weeks.push(week);
        }
        return weeks;
    };

    const weeks = groupDatesByWeek();

    // 월 변경 핸들러
    const handlePrevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    // 요일 헤더 생성
    const renderWeekdays = () => {
        const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
        return weekdays.map((day, index) => (
            <div key={index} className={`font-semibold text-center py-3 text-sm ${index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : 'text-slate-600'
                }`}>
                {day}
            </div>
        ));
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
                <button
                    onClick={handlePrevMonth}
                    className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors duration-200"
                >
                    <span className="text-slate-600 font-bold">‹</span>
                </button>
                <h2 className="text-xl font-bold text-slate-800">
                    {year}년 {month + 1}월
                </h2>
                <button
                    onClick={handleNextMonth}
                    className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors duration-200"
                >
                    <span className="text-slate-600 font-bold">›</span>
                </button>
            </div>

            <div className="grid grid-cols-7 border-b border-slate-100">
                {renderWeekdays()}
            </div>

            <div className="grid grid-cols-7">
                {weeks.map((week, weekIndex) => (
                    week.map((date, dayIndex) => {
                        const dateKey = date.toISOString().split('T')[0];
                        const dayEvents = events[dateKey] || [];
                        const isCurrentMonth = date.getMonth() === month;
                        const isToday = date.toDateString() === new Date().toDateString();

                        return (
                            <CalendarCell
                                key={`${weekIndex}-${dayIndex}`}
                                date={date}
                                isCurrentMonth={isCurrentMonth}
                                isToday={isToday}
                                events={dayEvents}
                                handleDateClick={() => onDateClick(date)}
                            />
                        );
                    })
                ))}
            </div>
        </div>
    );
}