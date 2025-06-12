import { createContext } from 'react';

export const jobPostContext = createContext({
  jobPosts: [],
  setJobPosts: () => { },
});

// id, company, title, region, time, pay, category, condition, preference, content, author, createdAt
export const initialJobPosts = [
  {
    id: 1,
    company: '세븐일레븐 고척점',
    title: '세븐일레븐 평일 17~23시 알바 구함 (주휴수당 지급)',
    region: '고척동',
    time: '17:00~23:00',
    pay: '10500',
    category: '편의점',
    condition: '평일',
    preference: '주휴수당',
    content: '내용',
    author: '관리자',
    createdAt: new Date('2025-10-03T10:00:00').toISOString(),
  },
  {
    id: 2,
    company: '이마트24 신림점',
    title: '이마트24 야간 알바 모집 (간단 업무)',
    region: '신림동',
    time: '22:00~06:00',
    pay: '12000',
    category: '편의점',
    condition: '주말',
    preference: '경력자 우대',
    content: '야간 시간대 간단한 계산 및 정리 업무입니다.',
    author: '관리자',
    createdAt: new Date('2025-10-05T09:30:00').toISOString(),
  },
  {
    id: 3,
    company: 'CU 서울대입구역점',
    title: 'CU 주말 오전 알바 구합니다',
    region: '관악구',
    time: '08:00~14:00',
    pay: '11000',
    category: '편의점',
    condition: '주말',
    preference: '근거리 거주자',
    content: '주말 오전 근무, 물품 정리 및 계산 업무',
    author: '관리자',
    createdAt: new Date('2025-10-06T14:45:00').toISOString(),
  },
];
