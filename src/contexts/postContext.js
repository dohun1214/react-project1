import { createContext } from 'react';

const postContext = createContext();

const initialPosts = [
    {
        id: 1,
        company: '세븐일레븐 고척점',
        title: '세븐일레븐 평일 17~23시 알바 구함 (주휴수당 지급)',
        region: '세븐일레븐 고척점',
        time: '17:00~23:00',
        pay: '10,500원',
        date: '2025-10-03 10:00',
        category: '편의점',
        condition: '평일',
        detail: '주휴수당'
    },
    {
        id: 2,
        company: '베스킨라벤스 고척점',
        title: '일요일 오전 STAFF 구합니다.',
        region: '베스킨라벤스 고척점',
        time: '07:00~14:00',
        pay: '12,000원',
        date: '2025-10-02 23:18',
        category: '아이스크림',
        condition: '주말',
        detail: '오전'
    },
    {
        id: 3,
        company: '롯데리아 고척점',
        title: '수~목 야간 알바 모집합니다.',
        region: '롯데리아 고척점',
        time: '22:00~06:00',
        pay: '12,500원',
        date: '2025-10-02 16:31',
        category: '패스트푸드',
        condition: '야간',
        detail: '수목'
    },
    {
        id: 4,
        company: '육회바른언어 고척점',
        title: '육회바른언어 알바 구함! (급구)',
        region: '육회바른언어 고척점',
        time: '14:00~22:00',
        pay: '11,000원',
        date: '2025-10-01 08:29',
        category: '음식점',
        condition: '일반',
        detail: '급구'
    }
];

export {postContext,initialPosts}