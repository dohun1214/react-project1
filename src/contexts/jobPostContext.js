import { createContext } from 'react';

export const jobPostContext = createContext({
  jobPosts: [],
  setJobPosts: () => {},
});

export const initialJobPosts = [
  {
    id: 1,
    company: '세븐일레븐 고척점',
    title: '세븐일레븐 평일 17~23시 알바 구함 (주휴수당 지급)',
    region: '고척동',
    time: '17:00~23:00',
    pay: '10,500원',
    category: '편의점',
    condition: '평일',
    preference: '주휴수당',
    content: '내용',
    author: '관리자',
    createdAt: new Date('2025-10-03T10:00:00').toISOString(),
  },
];
