import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { userContext, loginContext } from '../contexts';

const UserEditPage = () => {
    const { currentUser } = useContext(loginContext);
    const { users, userDispatch } = useContext(userContext);
    const currentUserObj = users?.find(user => user.id === currentUser);
    const navigate = useNavigate();

    const [editForm, setEditForm] = useState({
        password: currentUserObj?.password || '',
        email: currentUserObj?.email || ''
    });

    const handleSave = () => {
        if (!editForm.password.trim()) {
            alert('비밀번호를 입력해주세요.');
            return;
        }
        if (!editForm.email.trim()) {
            alert('이메일을 입력해주세요.');
            return;
        }

        userDispatch({
            type: 'UPDATE_USER',
            payload: {
                id: currentUser,
                password: editForm.password,
                email: editForm.email
            }
        });

        alert('회원 정보가 수정되었습니다!');
        navigate('/mypage');
    };

    const handleCancel = () => {
        navigate('/mypage');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="p-6 max-w-2xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        회원 정보 수정
                    </h1>
                    <p className="text-slate-600">개인 정보를 수정하세요</p>
                </div>

                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">아이디</label>
                            <input
                                type="text"
                                value={currentUserObj?.id || ''}
                                disabled
                                className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed"
                            />
                            <p className="text-xs text-slate-500 mt-1">아이디는 변경할 수 없습니다</p>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">비밀번호</label>
                            <input
                                type="text"
                                value={editForm.password}
                                onChange={(e) => setEditForm(prev => ({ ...prev, password: e.target.value }))}
                                className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                placeholder="새 비밀번호를 입력하세요"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">이메일</label>
                            <input
                                type="email"
                                value={editForm.email}
                                onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                                className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                placeholder="이메일을 입력하세요"
                            />
                        </div>

                        <div className="flex justify-end gap-4 pt-6">
                            <button
                                onClick={handleCancel}
                                className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-3 rounded-xl font-medium transition-all duration-200"
                            >
                                취소
                            </button>
                            <button
                                onClick={handleSave}
                                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200"
                            >
                                저장하기
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserEditPage;