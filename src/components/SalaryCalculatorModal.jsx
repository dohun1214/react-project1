const SalaryCalculatorModal = ({ isOpen, onClose, ...post }) => {
    if (!isOpen) return null;

    

    // id, company, title, region, time, pay, category, condition, preference, content, author, createdAt     
    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-10 w-[90%] max-w-2xl relative shadow-2xl max-h-[80vh] overflow-y-auto">
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-red-600 hover:bg-red-50 cursor-pointer text-2xl w-8 h-8 flex items-center justify-center rounded-full transition-colors"
                    onClick={onClose}
                >
                    &times;
                </button>

                <p className="text-3xl font-bold mb-5 text-gray-800">급여 계산기</p>
                <hr className="border-gray-200 mb-8" />

                <div className="border border-gray-200 rounded-xl mt-8 p-6 mb-8 bg-gray-50">
                    <label className="block text-lg mb-2">
                        <div className="flex items-center gap-4 mb-4">
                            <span className="font-medium text-gray-700 w-28">시급</span>
                            <input
                                type="text"
                                name="salary"
                                className="w-32 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={0}
                            />
                            <span className="text-gray-600 font-medium">원</span>
                        </div>
                        <br />
                        <div className="flex items-center gap-4 mb-4">
                            <span className="font-medium text-gray-700 w-28">일일 근무시간</span>
                            <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
                                <option value={"3hours"}>3시간</option>
                                <option value={"4hours"}>4시간</option>
                                <option value={"5hours"}>5시간</option>
                                <option value={"6hours"}>6시간</option>
                                <option value={"7hours"}>7시간</option>
                                <option value={"8hours"}>8시간</option>
                            </select>
                        </div>
                        <br />
                        <div className="flex items-center gap-4 mb-4">
                            <span className="font-medium text-gray-700 w-28">주휴수당</span>
                            <div className="flex gap-6">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="weeklyAllowance" value="excluded" className="w-4 h-4 text-blue-600" />
                                    <span className="text-gray-700">미포함</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="weeklyAllowance" value="included" defaultChecked className="w-4 h-4 text-blue-600" />
                                    <span className="text-gray-700">포함</span>
                                </label>
                            </div>
                        </div>
                        <br />
                        <div className="flex items-center gap-4 mb-4">
                            <span className="font-medium text-gray-700 w-28">세금</span>
                            <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
                                <option value={"9.4%"}>9.4%</option>
                                <option value={"3.3%"}>3.3%</option>
                            </select>
                        </div>
                        <br />

                        <div className="flex items-center gap-4 mb-6">
                            <span className="font-medium text-gray-700 w-28">수습</span>
                            <div className="flex gap-6">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="probation" value="notApplied" defaultChecked className="w-4 h-4 text-blue-600" />
                                    <span className="text-gray-700">미적용</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="probation" value="applied" className="w-4 h-4 text-blue-600" />
                                    <span className="text-gray-700">적용</span>
                                </label>
                            </div>
                        </div>
                        <br />

                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">계산하기</button>


                    </label>

                </div>

                <div className="border border-gray-200 rounded-xl p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">계산 결과</h3>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-blue-200">
                            <span className="font-medium text-gray-700">예상 월급</span>
                            <span className="font-semibold text-lg text-gray-800">0원</span>
                        </div>
                        <br />
                        <div className="flex justify-between items-center py-2 border-b border-blue-200">
                            <span className="font-medium text-gray-700">예상 주휴수당</span>
                            <span className="font-semibold text-lg text-gray-800">0원</span>
                        </div>
                        <br />
                        <div className="flex justify-between items-center py-2 border-b border-blue-200">
                            <span className="font-medium text-gray-700">예상 월 연장 수당</span>
                            <span className="font-semibold text-lg text-gray-800">0원</span>
                        </div>
                        <br />

                        <div className="mt-6 pt-4 border-t-2 border-blue-300">
                            <div className="flex justify-between items-center">
                                <span className="text-xl font-bold text-gray-800">최종 환산 금액</span>
                                <span className="text-2xl font-bold text-blue-600">0원</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalaryCalculatorModal;
