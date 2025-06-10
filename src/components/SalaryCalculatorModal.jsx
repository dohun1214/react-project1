
const SalaryCalculatorModal = ({ isOpen, onClose, ...post }) => {
    if (!isOpen) return null;



    // id, company, title, region, time, pay, category, condition, preference, content, author, createdAt    
    return (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-80 relative shadow-lg">
                <button className="text-red-600 absolute top-2 right-2  hover:text-gray-800 hover:cursor-pointer" onClick={onClose}>X</button>

                <p className="text-2xl mb-3">급여 계산기</p>
                <hr />
                <div className="border-1 rounded-lg mt-7">
                    asdj
                    asd
                    asfasadas
                    asfassasgas
                    sdfadsgasdf
                    adasdasfas
                    
                </div>
            </div>
        </div>
    );
};


export default SalaryCalculatorModal