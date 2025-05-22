import './App.css'
import React from "react";

const App = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">JOBBLE</h1>
          <div className="flex space-x-4">
            <a href="#" className="text-sm text-gray-700">로그인</a>
            <a href="#" className="text-sm text-gray-700">회원가입</a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 pb-4">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            className="w-full border rounded-lg p-2"
          />
        </div>
        <nav className="bg-white border-t border-b">
          <div className="max-w-7xl mx-auto px-4 py-2 flex space-x-6 text-sm">
            <a href="#" className="hover:text-blue-600">채용정보</a>
            <a href="#" className="hover:text-blue-600">브랜드알바</a>
            <a href="#" className="hover:text-blue-600">커뮤니티</a>
            <a href="#" className="hover:text-blue-600">고객센터</a>
            <a href="#" className="hover:text-blue-600">마이페이지</a>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* 빠른 알바 정보 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded shadow">
            CU편의점 12~19시 당일지급
          </div>
          <div className="bg-blue-100 p-4 rounded shadow">
            ABTI 테스트 초대장이 도착했어요{' '}
            <a href="#" className="text-blue-700 underline">
              테스트 해보기
            </a>
          </div>
          <div className="bg-white p-4 rounded shadow">
            제주돌봄/5.18 오후 파트타임
          </div>
        </div>

        {/* 알바 카테고리 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <h2 className="font-semibold mb-2">지역 · 동네 알바</h2>
            <ul className="text-sm space-y-1">
              <li>서울 경기 인천 부산 대구 대전</li>
              <li>경남 전남 충북 광주 울산 강원</li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold mb-2">테마별 알바</h2>
            <ul className="text-sm space-y-1">
              <li>단시간 알바</li>
              <li>당일 알바</li>
              <li>브랜드알바</li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold mb-2">대상별 알바</h2>
            <ul className="text-sm space-y-1">
              <li>중장년</li>
              <li>외국인</li>
              <li>청소년</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold mb-2">개인회원 · 기업회원</h2>
            <p className="text-sm mb-1">일자리 찾기 | 알바생 찾기</p>
            <button className="text-xs text-blue-600">
              아이디/비밀번호 찾기
            </button>
          </div>
        </div>

        {/* 채용중인 알바 */}
        <div>
          <h2 className="text-xl font-semibold mb-4">채용중인 알바</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded shadow">
              <p className="font-bold">Coupang</p>
              <p className="text-sm">물류 상하차 (당일지급)</p>
              <p className="text-sm">월급 360만원</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <p className="font-bold">스타벅스 알바</p>
              <p className="text-sm">월급 200만원</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <p className="font-bold">맥도날드 알바</p>
              <p className="text-sm">월급 200만원</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <p className="font-bold">다이소 알바</p>
              <p className="text-sm">월급 180만원</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 mt-10 py-6 text-sm text-center text-gray-500">
        <div className="max-w-7xl mx-auto px-4">
          <p>
            회사소개 | 이용약관 | 개인정보처리방침 | 위치기반서비스 이용약관 | 광고문의 | 제휴문의
          </p>
          <p className="mt-2">© JOBBLE Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};


export default App
