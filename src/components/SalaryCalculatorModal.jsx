
const SalaryCalculatorModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-80 relative shadow-lg">
                <button className="text-red-600 absolute top-2 right-2  hover:text-gray-800 hover:cursor-pointer" onClick={onClose}>X</button>
                <p>내용</p>
            </div>
        </div>
    );
};


export default SalaryCalculatorModal