import { useState, useEffect } from 'react';

const SalaryCalculatorModal = ({ isOpen, onClose, ...post }) => {
    if (!isOpen) return null;

    const [form, setForm] = useState({
        hours: 3,
        daysPerWeek: 5,
        weeklyAllowance: 'included',
        tax: '3.3',
        probation: 'notApplied',
    });

    const [result, setResult] = useState({
        monthlyWage: 0,
        weeklyAllowance: 0,
        finalAmount: 0,
    });

    useEffect(() => {
        calculate();
    }, [form]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const calculate = () => {
        const hourlyWage = parseInt(post.pay, 10) || 0;
        const hoursPerDay = parseInt(form.hours, 10);
        const daysPerWeek = parseInt(form.daysPerWeek, 10);
        const weeksPerMonth = 4.345;

        const basePay = hourlyWage * hoursPerDay * daysPerWeek * weeksPerMonth;

        const totalWeeklyHours = hoursPerDay * daysPerWeek;
        const isEligibleForWeeklyAllowance =
            form.weeklyAllowance === 'included' && totalWeeklyHours >= 15;

        const weeklyAllowanceAmount = isEligibleForWeeklyAllowance
            ? (hourlyWage * hoursPerDay)
            : 0;
        const monthlyAllowance = weeklyAllowanceAmount * weeksPerMonth;

        let total = basePay + monthlyAllowance;

        if (form.probation === 'applied') {
            total *= 0.9;
        }

        const taxRate = parseFloat(form.tax) / 100;
        total *= (1 - taxRate);

        setResult({
            monthlyWage: Math.floor(basePay),
            weeklyAllowance: Math.floor(monthlyAllowance),
            finalAmount: Math.floor(total),
        });
    };

    return (
        <div className="fixed inset-0 bg-white-900 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-8 w-full max-w-2xl relative shadow-2xl max-h-[80vh] overflow-y-auto animate-in slide-in-from-bottom-4 duration-300">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">💰 급여 계산기</h2>
                        <p className="text-gray-600">정확한 월급을 미리 계산해보세요</p>
                    </div>
                    <button
                        className="w-10 h-10 rounded-full bg-gray-100 hover:bg-red-100 hover:text-red-600 flex items-center justify-center text-gray-500 transition-all duration-200 hover:scale-105"
                        onClick={onClose}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 mb-8 border border-blue-100">
                    <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        근무 조건 설정
                    </h3>

                    <div className="space-y-4">
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                            <label className="block text-sm font-semibold text-gray-700 mb-3">💵 시급</label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="text"
                                    className="flex-1 text-lg font-bold text-blue-600 bg-gray-50 border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                                    value={post.pay ? parseInt(post.pay).toLocaleString() : '0'}
                                    readOnly
                                />
                                <span className="text-gray-600 font-medium text-lg">원</span>
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                            <label className="block text-sm font-semibold text-gray-700 mb-3">⏰ 일일 근무시간</label>
                            <select
                                name="hours"
                                value={form.hours}
                                onChange={handleChange}
                                className="w-full text-lg border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors bg-white"
                            >
                                {[3, 4, 5, 6, 7, 8, 9].map(hour => (
                                    <option key={hour} value={hour}>{hour}시간</option>
                                ))}
                            </select>
                        </div>

                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                            <label className="block text-sm font-semibold text-gray-700 mb-3">📅 주 근무일</label>
                            <select
                                name="daysPerWeek"
                                value={form.daysPerWeek}
                                onChange={handleChange}
                                className="w-full text-lg border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors bg-white"
                            >
                                {[1, 2, 3, 4, 5, 6, 7].map(day => (
                                    <option key={day} value={day}>{day}일</option>
                                ))}
                            </select>
                        </div>

                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                            <label className="block text-sm font-semibold text-gray-700 mb-3">🧾 세금</label>
                            <select
                                name="tax"
                                value={form.tax}
                                onChange={handleChange}
                                className="w-full text-lg border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors bg-white"
                            >
                                <option value="3.3">기본 (3.3%)</option>
                                <option value="9.4">4대보험 포함 (9.4%)</option>
                            </select>
                        </div>

                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                            <label className="block text-sm font-semibold text-gray-700 mb-4">🎁 주휴수당</label>
                            <div className="flex gap-3">
                                <label className="relative flex-1 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="weeklyAllowance"
                                        value="included"
                                        checked={form.weeklyAllowance === 'included'}
                                        onChange={handleChange}
                                        className="sr-only"
                                    />
                                    <div className={`
                                        flex items-center justify-center h-12 px-4 rounded-xl border-2 font-medium text-sm transition-all duration-200
                                        ${form.weeklyAllowance === 'included'
                                            ? 'bg-blue-500 border-blue-500 text-white shadow-lg transform scale-105'
                                            : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400'
                                        }
                                    `}>
                                        <span className="flex items-center gap-2">
                                            <div className={`
                                                w-4 h-4 rounded-full border-2 flex items-center justify-center
                                                ${form.weeklyAllowance === 'included'
                                                    ? 'border-white'
                                                    : 'border-gray-400'
                                                }
                                            `}>
                                                {form.weeklyAllowance === 'included' && (
                                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                                )}
                                            </div>
                                            포함
                                        </span>
                                    </div>
                                </label>
                                <label className="relative flex-1 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="weeklyAllowance"
                                        value="excluded"
                                        checked={form.weeklyAllowance === 'excluded'}
                                        onChange={handleChange}
                                        className="sr-only"
                                    />
                                    <div className={`
                                        flex items-center justify-center h-12 px-4 rounded-xl border-2 font-medium text-sm transition-all duration-200
                                        ${form.weeklyAllowance === 'excluded'
                                            ? 'bg-blue-500 border-blue-500 text-white shadow-lg transform scale-105'
                                            : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400'
                                        }
                                    `}>
                                        <span className="flex items-center gap-2">
                                            <div className={`
                                                w-4 h-4 rounded-full border-2 flex items-center justify-center
                                                ${form.weeklyAllowance === 'excluded'
                                                    ? 'border-white'
                                                    : 'border-gray-400'
                                                }
                                            `}>
                                                {form.weeklyAllowance === 'excluded' && (
                                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                                )}
                                            </div>
                                            미포함
                                        </span>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                            <label className="block text-sm font-semibold text-gray-700 mb-4">👔 수습</label>
                            <div className="flex gap-3">
                                <label className="relative flex-1 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="probation"
                                        value="notApplied"
                                        checked={form.probation === 'notApplied'}
                                        onChange={handleChange}
                                        className="sr-only"
                                    />
                                    <div className={`
                                        flex items-center justify-center h-12 px-4 rounded-xl border-2 font-medium text-sm transition-all duration-200
                                        ${form.probation === 'notApplied'
                                            ? 'bg-green-500 border-green-500 text-white shadow-lg transform scale-105'
                                            : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400'
                                        }
                                    `}>
                                        <span className="flex items-center gap-2">
                                            <div className={`
                                                w-4 h-4 rounded-full border-2 flex items-center justify-center
                                                ${form.probation === 'notApplied'
                                                    ? 'border-white'
                                                    : 'border-gray-400'
                                                }
                                            `}>
                                                {form.probation === 'notApplied' && (
                                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                                )}
                                            </div>
                                            미적용
                                        </span>
                                    </div>
                                </label>
                                <label className="relative flex-1 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="probation"
                                        value="applied"
                                        checked={form.probation === 'applied'}
                                        onChange={handleChange}
                                        className="sr-only"
                                    />
                                    <div className={`
                                        flex items-center justify-center h-12 px-4 rounded-xl border-2 font-medium text-sm transition-all duration-200
                                        ${form.probation === 'applied'
                                            ? 'bg-orange-500 border-orange-500 text-white shadow-lg transform scale-105'
                                            : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400'
                                        }
                                    `}>
                                        <span className="flex items-center gap-2">
                                            <div className={`
                                                w-4 h-4 rounded-full border-2 flex items-center justify-center
                                                ${form.probation === 'applied'
                                                    ? 'border-white'
                                                    : 'border-gray-400'
                                                }
                                            `}>
                                                {form.probation === 'applied' && (
                                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                                )}
                                            </div>
                                            적용 (10% 감액)
                                        </span>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-200">
                        <div className="flex items-start gap-3">
                            <div className="bg-amber-100 p-2 rounded-full">
                                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-semibold text-amber-800 mb-2">💡 계산 방법 안내</h4>
                                <ul className="text-sm text-amber-700 space-y-1">
                                    <li>• 기본 월급 = 시급 × 일일근무시간 × 주근무일수 × 월평균주수(4.345)</li>
                                    <li>• 주휴수당: 주 15시간 이상 근무 시 1일분의 급여 지급</li>
                                    <li>• 세금: 3.3%(원천징수세) 또는 9.4%(4대보험 포함)</li>
                                    <li>• 수습 적용 시 최종 금액의 10% 감액</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                        <svg className="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        계산 결과
                    </h3>

                    <div className="space-y-4">
                        <div className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center border border-gray-200">
                            <span className="font-semibold text-gray-700">기본 월급</span>
                            <span className="text-xl font-bold text-gray-800">{result.monthlyWage.toLocaleString()}원</span>
                        </div>

                        <div className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center border border-gray-200">
                            <span className="font-semibold text-gray-700">주휴수당</span>
                            <span className="text-xl font-bold text-gray-800">
                                {result.weeklyAllowance > 0 ? `${result.weeklyAllowance.toLocaleString()}원` : '해당없음'}
                            </span>
                        </div>

                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-xl text-white shadow-lg">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-blue-100 text-sm font-medium">최종 예상 금액</p>
                                    <p className="text-3xl font-bold">{result.finalAmount.toLocaleString()}원</p>
                                </div>
                                <div className="text-4xl">💸</div>
                            </div>
                            <div className="mt-2 text-blue-100 text-sm">
                                (세금 {form.tax}% {form.probation === 'applied' ? '+ 수습 10% 감액' : ''} 적용)
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalaryCalculatorModal;