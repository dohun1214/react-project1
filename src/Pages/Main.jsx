import { useNavigate } from "react-router-dom";

function Main() {
    const navi = useNavigate();
    return (
        <>
            <main className="w-full max-w-7xl mx-auto px-4 md:px-8 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
                    <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-2xl shadow">
                            CU편의점 12~19시 당일지급
                        </div>
                        <div className="bg-white p-4 rounded-2xl shadow">
                            제주돌봄/5.18 오후 파트타임
                        </div>
                        <a
                            href="/abti-test"
                            className="bg-blue-100 p-6 rounded-2xl shadow col-span-2 flex items-center justify-between hover:bg-blue-200 transition cursor-pointer"
                        >
                            <div>
                                <p className="text-sm font-semibold text-blue-900">
                                    ABTI 테스트 초대장이 도착했어요!
                                </p>
                                <p className="text-xs text-blue-800 mt-1 underline">
                                    테스트 해보기
                                </p>
                            </div>
                            <div className="text-blue-500 text-xl">➤</div>
                        </a>
                    </div>

                    <div className="col-span-2 lg:col-span-1 space-y-4">
                        <div className="bg-white p-4 rounded-2xl shadow text-center">
                            <p className="font-semibold text-lg mb-2">회원 메뉴</p>
                            <button onClick={() => { navi("/login") }} className="w-full py-2 mb-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">
                                로그인
                            </button>
                            <button onClick={() => { navi("/register") }} className="w-full py-2 bg-gray-200 text-sm rounded hover:bg-gray-300">
                                회원가입
                            </button>
                            <div className="mt-2 text-xs text-blue-600 underline cursor-pointer">
                                아이디/비밀번호 찾기
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-2xl shadow">
                            <h2 className="font-semibold mb-2">일정 관리</h2>
                            <div className="grid grid-cols-7 gap-1 text-xs text-center">
                                {[...Array(35)].map((_, i) => (
                                    <div key={i} className="p-2 border rounded hover:bg-gray-100 cursor-pointer"> {i < 5 ? '' : i - 4} </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-2xl shadow">
                        <h2 className="font-semibold mb-2">지역 · 동네 알바</h2>
                        <ul className="text-sm space-y-1">
                            <li>서울 경기 인천 부산 대구 대전</li>
                            <li>경남 전남 충북 광주 울산 강원</li>
                        </ul>
                    </div>
                    <div className="bg-white p-4 rounded-2xl shadow">
                        <h2 className="font-semibold mb-2">테마별 알바</h2>
                        <ul className="text-sm space-y-1">
                            <li>단시간 알바</li>
                            <li>당일 알바</li>
                            <li>브랜드알바</li>
                        </ul>
                    </div>
                    <div className="bg-white p-4 rounded-2xl shadow">
                        <h2 className="font-semibold mb-2">대상별 알바</h2>
                        <ul className="text-sm space-y-1">
                            <li>중장년</li>
                            <li>외국인</li>
                            <li>청소년</li>
                        </ul>
                    </div>
                    <div className="bg-white p-4 rounded-2xl shadow">
                        <h2 className="font-semibold mb-2">개인회원 · 기업회원</h2>
                        <p className="text-sm mb-1">일자리 찾기 | 알바생 찾기</p>
                        <button className="text-xs text-blue-600">아이디/비밀번호 찾기</button>
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-4">채용중인 알바</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white p-4 rounded-2xl shadow">
                            <p className="font-bold">Coupang</p>
                            <p className="text-sm">물류 상하차 (당일지급)</p>
                            <p className="text-sm">월급 360만원</p>
                        </div>
                        <div className="bg-white p-4 rounded-2xl shadow">
                            <p className="font-bold">스타벅스 알바</p>
                            <p className="text-sm">월급 200만원</p>
                        </div>
                        <div className="bg-white p-4 rounded-2xl shadow">
                            <p className="font-bold">맥도날드 알바</p>
                            <p className="text-sm">월급 200만원</p>
                        </div>
                        <div className="bg-white p-4 rounded-2xl shadow">
                            <p className="font-bold">다이소 알바</p>
                            <p className="text-sm">월급 180만원</p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Main;