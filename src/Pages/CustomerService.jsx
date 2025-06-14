import { useState } from 'react';

const CustomerService = () => {
    const [activeTab, setActiveTab] = useState('faq');
    const [selectedCategory, setSelectedCategory] = useState('service');
    const [inquiryForm, setInquiryForm] = useState({
        category: 'service',
        title: '',
        content: '',
        email: ''
    });

    // FAQ 데이터
    const faqData = {
        service: [
            {
                question: "회원가입은 어떻게 하나요?",
                answer: "상단 우측의 '회원가입' 버튼을 클릭하여 아이디, 비밀번호, 이메일을 입력하시면 가입이 완료됩니다."
            },
            {
                question: "이력서는 어떻게 작성하나요?",
                answer: "로그인 후 '이력서관리' 메뉴에서 기본정보, 학력사항, 경력사항, 자기소개서를 탭별로 작성할 수 있습니다."
            },
            {
                question: "관심공고는 어떻게 저장하나요?",
                answer: "채용공고 상세페이지에서 하트(❤️) 버튼을 클릭하면 관심공고로 저장되며, 마이페이지에서 확인할 수 있습니다."
            },
            {
                question: "비밀번호를 잊어버렸어요",
                answer: "로그인 페이지에서 '비밀번호를 잊으셨나요?' 링크를 클릭하시면 비밀번호 찾기 페이지로 이동합니다. 가입 시 사용한 아이디와 이메일을 입력하시면 비밀번호를 확인할 수 있습니다."
            }
        ],
        job: [
            {
                question: "최저시급은 얼마인가요?",
                answer: "2025년 최저시급은 시간당 10,300원입니다. 모든 사업장에서 이 금액 이상을 지급해야 합니다."
            },
            {
                question: "주휴수당은 언제 받나요?",
                answer: "주 15시간 이상 근무하고 소정근로일에 모두 출근한 경우, 유급휴일 1일분의 임금을 주휴수당으로 받을 수 있습니다."
            },
            {
                question: "야간수당 계산법은?",
                answer: "오후 10시부터 오전 6시까지 근무하면 통상시급의 50%를 가산하여 지급받습니다."
            },
            {
                question: "4대보험 가입 조건은?",
                answer: "월 60시간 이상 근무하거나 3개월 이상 계속 근무할 예정인 경우 4대보험에 가입해야 합니다."
            }
        ],
        company: [
            {
                question: "채용공고는 어떻게 올리나요?",
                answer: "채용정보 페이지에서 '새 공고 작성' 버튼을 클릭하여 회사정보, 근무조건, 상세내용을 입력하시면 됩니다."
            },
            {
                question: "공고 수정은 어떻게 하나요?",
                answer: "채용공고 상세페이지에서 '수정하기' 버튼을 클릭하여 내용을 수정할 수 있습니다."
            },
            {
                question: "공고 삭제는 가능한가요?",
                answer: "현재는 공고 삭제 기능이 준비 중입니다. 삭제가 필요한 경우 고객센터로 문의해주세요."
            }
        ]
    };

    // 공지사항 데이터
    const notices = [
        {
            id: 1,
            title: "JOBBLE 서비스 정식 오픈!",
            date: "2024.12.20",
            content: "알바 구직자와 구인 업체를 위한 JOBBLE 서비스가 정식으로 오픈되었습니다."
        },
        {
            id: 2,
            title: "이력서 관리 기능 추가",
            date: "2024.12.19",
            content: "이력서를 온라인으로 작성하고 관리할 수 있는 기능이 추가되었습니다."
        },
        {
            id: 3,
            title: "커뮤니티 후기 작성 기능 오픈",
            date: "2024.12.18",
            content: "알바 후기를 익명으로 작성하고 공유할 수 있는 커뮤니티 기능을 제공합니다."
        }
    ];

    // 문의하기 폼 핸들러
    const handleInquiryChange = (field, value) => {
        setInquiryForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmitInquiry = () => {
        if (!inquiryForm.title.trim()) {
            alert('제목을 입력해주세요.');
            return;
        }
        if (!inquiryForm.content.trim()) {
            alert('문의내용을 입력해주세요.');
            return;
        }
        if (!inquiryForm.email.trim()) {
            alert('답변받을 이메일을 입력해주세요.');
            return;
        }

        alert('문의가 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.');
        setInquiryForm({
            category: 'service',
            title: '',
            content: '',
            email: ''
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="p-6 max-w-6xl mx-auto">
                <div className="mb-8">
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
                                고객센터
                            </h1>
                            <p className="text-slate-600">무엇을 도와드릴까요? 궁금한 점이 있으시면 언제든 문의해주세요</p>
                        </div>
                    </div>
                </div>

                {/* 탭 네비게이션 */}
                <div className="mb-6">
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-2">
                        <div className="grid grid-cols-3 gap-2">
                            {[
                                { id: 'faq', name: '자주 묻는 질문', icon: '❓' },
                                { id: 'inquiry', name: '문의하기', icon: '📝' },
                                { id: 'notice', name: '공지사항', icon: '📢' }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`py-3 px-4 rounded-xl font-medium transition-all duration-200 ${activeTab === tab.id
                                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                                        : 'text-slate-700 hover:bg-white/50'
                                        }`}
                                >
                                    <div className="flex flex-col items-center gap-1">
                                        <span className="text-lg">{tab.icon}</span>
                                        <span className="text-sm">{tab.name}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 탭 콘텐츠 */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
                    {/* FAQ 탭 */}
                    {activeTab === 'faq' && (
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800 mb-6">자주 묻는 질문</h2>

                            {/* FAQ 카테고리 */}
                            <div className="mb-6">
                                <div className="flex gap-2">
                                    {[
                                        { id: 'service', name: '서비스 이용', icon: '🛠️' },
                                        { id: 'job', name: '알바 관련', icon: '💼' },
                                        { id: 'company', name: '기업 회원', icon: '🏢' }
                                    ].map(category => (
                                        <button
                                            key={category.id}
                                            onClick={() => setSelectedCategory(category.id)}
                                            className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${selectedCategory === category.id
                                                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                                }`}
                                        >
                                            <span className="mr-2">{category.icon}</span>
                                            {category.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* FAQ 리스트 */}
                            <div className="space-y-4">
                                {faqData[selectedCategory].map((faq, index) => (
                                    <div key={index} className="bg-white/50 rounded-xl p-6 border border-slate-200">
                                        <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-start gap-2">
                                            <span className="text-blue-500 mt-1">Q.</span>
                                            {faq.question}
                                        </h3>
                                        <p className="text-slate-600 leading-relaxed pl-6">
                                            <span className="text-green-500 font-semibold">A.</span> {faq.answer}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 문의하기 탭 */}
                    {activeTab === 'inquiry' && (
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800 mb-6">문의하기</h2>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">문의 유형</label>
                                    <select
                                        value={inquiryForm.category}
                                        onChange={(e) => handleInquiryChange('category', e.target.value)}
                                        className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    >
                                        <option value="service">서비스 이용 문의</option>
                                        <option value="account">계정 관련 문의</option>
                                        <option value="technical">기술적 문제</option>
                                        <option value="report">신고/제보</option>
                                        <option value="suggestion">제안사항</option>
                                        <option value="other">기타</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">제목</label>
                                    <input
                                        type="text"
                                        value={inquiryForm.title}
                                        onChange={(e) => handleInquiryChange('title', e.target.value)}
                                        className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        placeholder="문의 제목을 입력해주세요"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">문의 내용</label>
                                    <textarea
                                        value={inquiryForm.content}
                                        onChange={(e) => handleInquiryChange('content', e.target.value)}
                                        className="w-full h-40 px-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                                        placeholder="문의하실 내용을 자세히 작성해주세요"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">답변받을 이메일</label>
                                    <input
                                        type="email"
                                        value={inquiryForm.email}
                                        onChange={(e) => handleInquiryChange('email', e.target.value)}
                                        className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        placeholder="example@email.com"
                                    />
                                </div>

                                <div className="flex justify-end pt-4">
                                    <button
                                        onClick={handleSubmitInquiry}
                                        className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                    >
                                        문의하기
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 공지사항 탭 */}
                    {activeTab === 'notice' && (
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800 mb-6">공지사항</h2>
                            <div className="space-y-4">
                                {notices.map((notice) => (
                                    <div key={notice.id} className="bg-white/50 rounded-xl p-6 border border-slate-200 hover:shadow-md transition-all duration-200">
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="text-lg font-semibold text-slate-800">{notice.title}</h3>
                                            <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                                                {notice.date}
                                            </span>
                                        </div>
                                        <p className="text-slate-600">{notice.content}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* 연락처 정보 */}
                <div className="mt-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border border-orange-200/50 p-6">
                    <h3 className="text-lg font-semibold text-orange-700 mb-4 flex items-center gap-2">
                        <span className="text-xl">📞</span>
                        연락처 정보
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6 text-orange-600">
                        <div className="space-y-2">
                            <p className="flex items-center gap-2">
                                <span className="font-medium">📞 고객센터:</span>
                                <span>1588-0000</span>
                            </p>
                            <p className="flex items-center gap-2">
                                <span className="font-medium">📧 이메일:</span>
                                <span>help@jobble.com</span>
                            </p>
                        </div>
                        <div className="space-y-2">
                            <p className="flex items-center gap-2">
                                <span className="font-medium">🕐 운영시간:</span>
                                <span>평일 09:00 - 18:00</span>
                            </p>
                            <p className="flex items-center gap-2">
                                <span className="font-medium">💬 카카오톡:</span>
                                <span>@JOBBLE</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerService;