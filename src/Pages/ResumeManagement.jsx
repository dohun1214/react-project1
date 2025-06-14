import { useState, useContext } from 'react';
import { loginContext } from '../contexts';
import { TabNavigation, FormInput, ExperienceCard } from '../components';
import usePageTitle from '../hooks/usePageTitle'

const ResumeManagement = () => {
    usePageTitle("이력서 관리")
    const { currentUser, isLogin } = useContext(loginContext);
    const [activeTab, setActiveTab] = useState('basic');

    // 이력서 데이터 상태
    const [resumeData, setResumeData] = useState({
        // 기본 정보
        name: '',
        phone: '',
        email: '',
        address: '',
        birth: '',

        // 학력 정보
        school: '',
        major: '',
        grade: '',
        graduation: '',

        // 경력 정보
        experiences: [],

        // 자기소개서
        motivation: '',
        personality: '',
        experience: '',
        aspiration: ''
    });

    // 입력 핸들러
    const handleInputChange = (field, value) => {
        setResumeData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // 경력 추가
    const addExperience = () => {
        setResumeData(prev => ({
            ...prev,
            experiences: [...prev.experiences, {
                id: Date.now(),
                company: '',
                position: '',
                period: '',
                description: ''
            }]
        }));
    };

    // 경력 삭제
    const removeExperience = (id) => {
        setResumeData(prev => ({
            ...prev,
            experiences: prev.experiences.filter(exp => exp.id !== id)
        }));
    };

    // 경력 수정
    const updateExperience = (id, field, value) => {
        setResumeData(prev => ({
            ...prev,
            experiences: prev.experiences.map(exp =>
                exp.id === id ? { ...exp, [field]: value } : exp
            )
        }));
    };

    // 저장
    const handleSave = () => {
        localStorage.setItem(`resume_${currentUser}`, JSON.stringify(resumeData));
        alert('이력서가 저장되었습니다!');
    };

    // 불러오기
    const handleLoad = () => {
        const saved = localStorage.getItem(`resume_${currentUser}`);
        if (saved) {
            setResumeData(JSON.parse(saved));
            alert('이력서를 불러왔습니다!');
        } else {
            alert('저장된 이력서가 없습니다.');
        }
    };

    if (!isLogin) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8 text-center">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl text-orange-500">🔒</span>
                    </div>
                    <h2 className="text-xl font-semibold text-slate-800 mb-2">로그인이 필요합니다</h2>
                    <p className="text-slate-600 mb-6">이력서 관리 기능을 사용하려면 로그인해주세요.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="p-6 max-w-6xl mx-auto">
                {/* 헤더 */}
                <div className="mb-8">
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                                    이력서 관리
                                </h1>
                                <p className="text-slate-600">나만의 이력서를 작성하고 관리하세요</p>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={handleLoad}
                                    className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-2 rounded-xl font-medium transition-all duration-200"
                                >
                                    불러오기
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-2 rounded-xl font-medium transition-all duration-200"
                                >
                                    저장하기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 탭 네비게이션 */}
                <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

                {/* 탭 내용 */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
                    {/* 기본정보 탭 */}
                    {activeTab === 'basic' && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-slate-800 mb-6">기본 정보</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <FormInput
                                    label="이름"
                                    value={resumeData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    placeholder="이름을 입력하세요"
                                />
                                <FormInput
                                    label="연락처"
                                    type="tel"
                                    value={resumeData.phone}
                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                    placeholder="010-1234-5678"
                                />
                                <FormInput
                                    label="이메일"
                                    type="email"
                                    value={resumeData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    placeholder="example@email.com"
                                />
                                <FormInput
                                    label="생년월일"
                                    type="date"
                                    value={resumeData.birth}
                                    onChange={(e) => handleInputChange('birth', e.target.value)}
                                />
                                <div className="md:col-span-2">
                                    <FormInput
                                        label="주소"
                                        value={resumeData.address}
                                        onChange={(e) => handleInputChange('address', e.target.value)}
                                        placeholder="서울시 강남구..."
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 학력사항 탭 */}
                    {activeTab === 'education' && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-slate-800 mb-6">학력 사항</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <FormInput
                                    label="학교명"
                                    value={resumeData.school}
                                    onChange={(e) => handleInputChange('school', e.target.value)}
                                    placeholder="동양미래대학교"
                                />
                                <FormInput
                                    label="전공"
                                    value={resumeData.major}
                                    onChange={(e) => handleInputChange('major', e.target.value)}
                                    placeholder="컴퓨터소프트웨어공학과"
                                />
                                <FormInput
                                    label="학년"
                                    value={resumeData.grade}
                                    onChange={(e) => handleInputChange('grade', e.target.value)}
                                    options={['1학년', '2학년', '3학년', '4학년', '졸업']}
                                />
                                <FormInput
                                    label="졸업예정일"
                                    type="month"
                                    value={resumeData.graduation}
                                    onChange={(e) => handleInputChange('graduation', e.target.value)}
                                />
                            </div>
                        </div>
                    )}

                    {/* 경력사항 탭 */}
                    {activeTab === 'experience' && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold text-slate-800">경력 사항</h2>
                                <button
                                    onClick={addExperience}
                                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-4 py-2 rounded-xl font-medium transition-all duration-200"
                                >
                                    + 경력 추가
                                </button>
                            </div>

                            {resumeData.experiences.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl text-slate-400">💼</span>
                                    </div>
                                    <p className="text-slate-500">아직 등록된 경력이 없습니다</p>
                                    <p className="text-slate-400 text-sm">경력 추가 버튼을 눌러 경력을 등록해보세요</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {resumeData.experiences.map((exp, index) => (
                                        <ExperienceCard
                                            key={exp.id}
                                            experience={exp}
                                            onUpdate={updateExperience}
                                            onRemove={removeExperience}
                                            index={index}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* 자기소개서 탭 */}
                    {activeTab === 'cover' && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-slate-800 mb-6">자기소개서</h2>
                            <div className="space-y-6">
                                <FormInput
                                    label="지원동기"
                                    type="textarea"
                                    value={resumeData.motivation}
                                    onChange={(e) => handleInputChange('motivation', e.target.value)}
                                    placeholder="이 일자리에 지원하는 이유를 작성해주세요..."
                                />
                                <FormInput
                                    label="성격의 장단점"
                                    type="textarea"
                                    value={resumeData.personality}
                                    onChange={(e) => handleInputChange('personality', e.target.value)}
                                    placeholder="본인의 성격과 특징을 작성해주세요..."
                                />
                                <FormInput
                                    label="경험 및 능력"
                                    type="textarea"
                                    value={resumeData.experience}
                                    onChange={(e) => handleInputChange('experience', e.target.value)}
                                    placeholder="관련 경험이나 특별한 능력을 작성해주세요..."
                                />
                                <FormInput
                                    label="포부 및 각오"
                                    type="textarea"
                                    value={resumeData.aspiration}
                                    onChange={(e) => handleInputChange('aspiration', e.target.value)}
                                    placeholder="근무에 대한 의지와 포부를 작성해주세요..."
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* 도움말 */}
                <div className="mt-6 bg-blue-50/50 backdrop-blur-sm rounded-2xl border border-blue-200/30 p-6">
                    <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center">
                            <span className="text-white text-xs">💡</span>
                        </span>
                        작성 팁
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
                        <div className="space-y-2">
                            <p>• 정확하고 솔직한 정보를 입력하세요</p>
                            <p>• 경력은 최신순으로 작성하는 것이 좋습니다</p>
                            <p>• 자기소개서는 구체적인 경험을 포함하세요</p>
                        </div>
                        <div className="space-y-2">
                            <p>• 정기적으로 저장하여 작업을 보존하세요</p>
                            <p>• 지원하는 업종에 맞게 내용을 조정하세요</p>
                            <p>• 맞춤법과 띄어쓰기를 확인하세요</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeManagement;