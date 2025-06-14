import Button from "./Button";

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, title, company, region }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-auto">
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                            <span className="text-2xl text-red-500">⚠️</span>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-slate-800">공고 삭제 확인</h3>
                            <p className="text-sm text-slate-600">이 작업은 되돌릴 수 없습니다</p>
                        </div>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                        <p className="text-sm text-red-800 font-medium mb-2">삭제될 공고:</p>
                        <p className="text-sm text-red-700">{title}</p>
                        <p className="text-xs text-red-600 mt-1">{company} • {region}</p>
                    </div>

                    <p className="text-slate-600 text-sm mb-6">
                        정말로 이 채용 공고를 삭제하시겠습니까? 삭제된 공고는 복구할 수 없으며, 지원자들도 더 이상 이 공고를 볼 수 없습니다.
                    </p>

                    <div className="flex gap-3">
                        <Button
                            onClick={onClose}
                            className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700"
                        >
                            취소
                        </Button>
                        <Button
                            onClick={onConfirm}
                            className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                        >
                            <span className="flex items-center justify-center gap-2">
                                <span>🗑️</span>
                                삭제하기
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmModal;