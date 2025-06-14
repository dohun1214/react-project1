import { createContext, useContext, useState } from 'react';
import r1 from '../assets/results/r1.png';
import r2 from '../assets/results/r2.png';
import r3 from '../assets/results/r3.png';
import r4 from '../assets/results/r4.png';
import r5 from '../assets/results/r5.png';
import r6 from '../assets/results/r6.png';
import r7 from '../assets/results/r7.png';
import r8 from '../assets/results/r8.png';
import r9 from '../assets/results/r9.png';
import r10 from '../assets/results/r10.png';
import r11 from '../assets/results/r11.png';
import r12 from '../assets/results/r12.png';
import r13 from '../assets/results/r13.png';
import r14 from '../assets/results/r14.png';
import r15 from '../assets/results/r15.png';
import r16 from '../assets/results/r15.png';



const QuizContext = createContext();
export const useQuiz = () => useContext(QuizContext);

const typeData = {
  SLCD: {
    title: '함께 나누며 완벽을 추구하는 실행가',
    image: r1,
    description: [
      '사람들과의 협업에서 활력을 얻고 의견을 주도해요.',
      '분석적인 사고로 모든 단계를 꼼꼼히 계획해요.',
      '새로운 아이디어를 기획하고 실행하는 걸 즐겨요.',
      '세부까지 완벽하게 챙겨 높은 완성도를 선사해요.',
      '팀의 중심에서 프로젝트를 원활하게 이끌어요.',
    ],
    scores: { social: 1, logical: 1, creative: 1, detail: 1 },
  },
  SLCd: {
    title: '협력하며 안정 속 변화를 이끄는 리더',
    image: r2,
    description: [
      '팀워크를 통해 아이디어를 공유하고 조율해요.',
      '논리적인 계획으로 안정적인 목표 달성을 이뤄요.',
      '과도한 실험보다는 검증된 방법을 선호해요.',
      '전체 흐름을 중시하며 예측 가능한 결과를 만들어가요.',
      '팀에 신뢰감을 주는 조율자 역할을 해요.',
    ],
    scores: { social: 1, logical: 1, creative: 1, detail: -1 },
  },
  SLcD: {
    title: '전략적으로 완성도를 높이는 기획자',
    image: r3,
    description: [
      '협업 속에서 논리적인 틀을 세워 프로젝트를 이끌어요.',
      '검증된 데이터로 안정적인 결과를 보장해요.',
      '새로운 아이디어보다는 완성도에 집중해요.',
      '세부 사항을 놓치지 않아 결과물이 탄탄해요.',
      '분석과 계획을 기반으로 실행력을 발휘해요.',
    ],
    scores: { social: 1, logical: 1, creative: -1, detail: 1 },
  },
  SLcd: {
    title: '안정 속에서 협력하며 완성을 추구하는 조율가',
    image: r4,
    description: [
      '협업을 통해 의견을 수렴하고 조율해요.',
      '논리적인 프로세스를 중시해 안정적인 성과를 내요.',
      '큰 틀에서 방향을 잡고 세부는 유연하게 조정해요.',
      '완성도를 위해 필요한 부분만 집중적으로 관리해요.',
      '팀에게 신뢰를 주는 안정적 리더에요.',
    ],
    scores: { social: 1, logical: 1, creative: -1, detail: -1 },
  },
  SlCD: {
    title: '감성과 논리를 조화시키는 융합가',
    image: r5,
    description: [
      '사교적이면서도 직관적으로 아이디어를 나눠요.',
      '논리적인 구조로 영감을 체계화해요.',
      '새로운 발상과 분석을 균형 있게 활용해요.',
      '세부 구현도 직관을 바탕으로 충실히 해내요.',
      '팀의 분위기를 살리는 조화로운 중재자에요.',
    ],
    scores: { social: 1, logical: -1, creative: 1, detail: 1 },
  },
  SlCd: {
    title: '열린 소통으로 즉흥적 영감을 실현하는 혁신가',
    image: r6,
    description: [
      '사교적인 태도로 영감을 자유롭게 나눠요.',
      '즉흥적인 아이디어로 변화를 주도해요.',
      '필요에 따라 논리적 근거로 아이디어를 보강해요.',
      '유연한 접근으로 프로젝트를 유동적으로 이끌어요.',
      '팀에 활력을 불어넣는 창의적 분위기 메이커에요.',
    ],
    scores: { social: 1, logical: -1, creative: 1, detail: -1 },
  },
  SlcD: {
    title: '창의적 아이디어를 완성도로 연결하는 조율자',
    image: r7,
    description: [
      '감정의 흐름을 감지해 팀 분위기를 조성해요.',
      '즉흥적 아이디어를 체계적으로 관리해요.',
      '필요한 디테일은 놓치지 않아 완성도를 유지해요.',
      '감성과 논리를 균형 있게 융합해요.',
      '따뜻한 조율자로서 신뢰를 쌓아요.',
    ],
    scores: { social: 1, logical: -1, creative: -1, detail: 1 },
  },
  Slcd: {
    title: '순간의 감성을 따라 즉시 실행하는 즉흥가',
    image: r8,
    description: [
      '감각이 열릴 때마다 즉시 행동으로 옮겨요.',
      '직관을 믿고 새로운 길을 개척해요.',
      '논리에 얽매이지 않고 자유롭게 표현해요.',
      '큰 흐름을 중시하고 세부는 유연하게 대응해요.',
      '팀에 활기를 불어넣는 즉흥적 리더에요.',
    ],
    scores: { social: 1, logical: -1, creative: -1, detail: -1 },
  },
  sLCD: {
    title: '혼자서도 창의와 분석을 완성하는 전략가',
    image: r9,
    description: [
      '내향적이지만 깊은 사고로 통찰을 얻어요.',
      '논리적 근거 위에 창의적 아이디어를 세워요.',
      '실험 결과를 체계적으로 기록하고 검증해요.',
      '한 번 몰입하면 높은 집중력으로 완성도를 높여요.',
      '뒤에서 프로젝트를 완성하는 묵묵한 설계자예요.',
    ],
    scores: { social: -1, logical: 1, creative: 1, detail: 1 },
  },
  sLCd: {
    title: '분석력과 안정성을 갖춘 계획가',
    image: r10,
    description: [
      '조용히 단계별 계획을 세우고 실행해요.',
      '논리적 구조로 업무 효율을 높여요.',
      '검증된 방법으로 안정적인 성과를 유지해요.',
      '세부까지 꼼꼼히 관리해 완성도를 보장해요.',
      '신중함으로 팀에 신뢰를 주는 전문가예요.',
    ],
    scores: { social: -1, logical: 1, creative: 1, detail: -1 },
  },
  sLcD: {
    title: '차분히 계획하며 디테일을 완성하는 전문가',
    image: r11,
    description: [
      '내향적 환경에서 체계적으로 업무를 수행해요.',
      '논리적 절차로 실수를 최소화해요.',
      '실험보다는 검증된 방식을 고수해 안정성을 유지해요.',
      '작은 부분까지 세심하게 관리해 완성도를 높여요.',
      '신중한 태도로 신뢰받는 전문가 역할을 해요.',
    ],
    scores: { social: -1, logical: 1, creative: -1, detail: 1 },
  },
  sLcd: {
    title: '조용한 즉흥가이자 관찰형 창작자',
    image: r12,
    description: [
      '내향적 공간에서 즉흥적 영감을 소중히 다뤄요.',
      '순간의 아이디어를 빠르게 시도해요.',
      '계획보다는 직관과 감각을 신뢰해요.',
      '유연한 사고로 세부를 조정해요.',
      '고요 속에서 독창적 결과를 만들어내요.',
    ],
    scores: { social: -1, logical: -1, creative: 1, detail: -1 },
  },
  slCD: {
    title: '감성과 논리를 융합해 새로운 가치를 창출하는 통섭가',
    image: r13,
    description: [
      '감성적 공감으로 팀을 이끌어요.',
      '직관적 아이디어를 논리적으로 구조화해요.',
      '창의적 발상을 세밀하게 구현해요.',
      '감성과 디테일을 균형 있게 조율해요.',
      '통합적 관점으로 최적의 솔루션을 제시해요.',
    ],
    scores: { social: -1, logical: -1, creative: 1, detail: 1 },
  },
  slCd: {
    title: '고요 속에서 창조적 흐름을 포착하는 예술가',
    image: r14,
    description: [
      '조용한 상태에서 새로운 아이디어를 떠올려요.',
      '직관적 영감을 즉시 작품처럼 표현해요.',
      '계획보다는 순간의 감각을 믿어요.',
      '세부보다는 전체 흐름을 중시해요.',
      '내향적 열정으로 독창적 결과를 만들어내요.',
    ],
    scores: { social: -1, logical: -1, creative: 1, detail: -1 },
  },
  slcD: {
    title: '차분하게 완성을 추구하는 신뢰의 완수자',
    image: r15,
    description: [
      '고요히 시작해 끝까지 완성해요.',
      '절차를 충실히 지켜 안정감을 높여요.',
      '반복 작업도 꼼꼼히 수행해 완성도를 보장해요.',
      '변화보다는 꾸준함으로 신뢰를 얻어요.',
      '차분한 모습으로 팀의 신뢰를 받는 완수자예요.',
    ],
    scores: { social: -1, logical: -1, creative: -1, detail: 1 },
  },
  slcd: {
    title: '고요 속에서 창조적 흐름을 포착하는 예술가',
    image: r16,
    description: [
      '조용한 상태에서 새로운 아이디어를 떠올려요.',
      '직관적 영감을 즉시 작품처럼 표현해요.',
      '계획보다는 순간의 감각을 믿어요.',
      '세부보다는 전체 흐름을 중시해요.',
      '내향적 열정으로 독창적 결과를 만들어내요.',
    ],
    scores: { social: -1, logical: -1, creative: 1, detail: -1 },
  },
};


export function QuizProvider({ children }) {
  const questions = [
    {
      id: 1, dimension: 'social', text: '일할 때, 팀과 같이 움직이는 걸 선호하나요?', options: [
        { label: '네, 함께일 때 시너지가 납니다', value: 'social+' },
        { label: '아니요, 혼자 집중하는 게 편해요', value: 'social-' },
      ]
    },
    {
      id: 2, dimension: 'social', text: '파트너와 함께 배워가며 성장하는 편인가요?', options: [
        { label: '네, 서로 피드백 주고받길 원해요', value: 'social+' },
        { label: '아니에요, 제 방식이 더 효율적이에요', value: 'social-' },
      ]
    },
    {
      id: 3, dimension: 'logical', text: '근무 중에 문제 해결 과정을 논리적으로 풀어나가는 것을 좋아하나요?', options: [
        { label: '네, 체계적으로 분석하고 싶어요', value: 'logical+' },
        { label: '아니면 직관과 감성으로 해결해요', value: 'logical-' },
      ]
    },
    {
      id: 4, dimension: 'logical', text: '업무 지침서를 꼼꼼히 읽고 따라가는 편인가요?', options: [
        { label: '네, 규칙대로 하는 게 편해요', value: 'logical+' },
        { label: '아니요, 상황에 따라 유연하게 해요', value: 'logical-' },
      ]
    },
    {
      id: 5, dimension: 'creative', text: '새로운 아이디어를 내고 적용해 보는 것을 즐기시나요?', options: [
        { label: '네, 기발한 아이디어 좋아해요', value: 'creative+' },
        { label: '아니요, 현실적인 방법을 선호해요', value: 'creative-' },
      ]
    },
    {
      id: 6, dimension: 'creative', text: '틀에 박힌 일보다는 자유로운 업무 방식을 원하나요?', options: [
        { label: '네, 즉흥적이어도 괜찮아요', value: 'creative+' },
        { label: '아니요, 계획적인 방식이 좋아요', value: 'creative-' },
      ]
    },
    {
      id: 7, dimension: 'detail', text: '작은 디테일까지 놓치지 않고 꼼꼼히 신경 쓰는 편인가요?', options: [
        { label: '네, 꼼꼼함이 제 강점이에요', value: 'detail+' },
        { label: '아니요, 융통성 있게 넘어가요', value: 'detail-' },
      ]
    },
    {
      id: 8, dimension: 'detail', text: '반복적인 확인 작업도 지루하지 않게 해내시나요?', options: [
        { label: '네, 반복 작업도 중요해요', value: 'detail+' },
        { label: '아니요, 빠르게 끝내고 싶어요', value: 'detail-' },
      ]
    },
  ];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [scores, setScores] = useState({ social: 0, logical: 0, creative: 0, detail: 0 });
  const answer = (value) => {
    const [dim, sign] = value.match(/^[a-z]+|[+-]$/g);
    setScores(prev => ({ ...prev, [dim]: prev[dim] + (sign === '+' ? 1 : -1) }));
    setCurrentIdx(i => i + 1);
  };
  const resultType = currentIdx >= questions.length
    ? Object.entries(scores).map(([dim, score]) => score >= 0 ? dim[0].toUpperCase() : dim[0].toLowerCase()).join('')
    : null;
  return (
    <QuizContext.Provider value={{ questions, currentIdx, answer, resultType, typeData }}>
      {children}
    </QuizContext.Provider>
  );
}
