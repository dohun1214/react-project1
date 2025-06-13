const TabNavigation = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'basic', name: '기본정보', icon: '👤' },
        { id: 'education', name: '학력사항', icon: '🎓' },
        { id: 'experience', name: '경력사항', icon: '💼' },
        { id: 'cover', name: '자기소개서', icon: '📝' }
    ];

    return (
        <div className="mb-6">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-2">
                <div className="grid grid-cols-4 gap-2">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`py-3 px-4 rounded-xl font-medium transition-all duration-200 ${activeTab === tab.id
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
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
    );
};

export default TabNavigation;