import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { jobPostContext } from '../contexts/jobPostContext';

const timeOptions = ['오전', '오후', '풀타임', '협의 후 결정'];
const daysOptions = ['평일', '주말', '야간', '주휴'];
const categoryOptions = ['편의점', '음식점', '사무직', '서비스업', '기술직', '기타'];
const regionOptions = ['강남구', '용산구', '동작구', '송파구', '마포구', '서초구', '영등포구', '종로구', '중구', '관악구', '구로구', '광진구', '성동구', '노원구', '강북구'];
const payOptions = ['10,000원', '10,500원', '11,000원', '12,000원', '12,500원', '협의 후 결정'];
const preferenceOptions = ['경력자 우대', '초보 가능', '급구', '친절'];

const RecruitNew = () => {
  const { jobPosts, setJobPosts } = useContext(jobPostContext);
  const [company, setCompany] = useState('');
  const [title, setTitle] = useState('');
  const [time, setTime] = useState(timeOptions[0]);
  const [days, setDays] = useState(daysOptions[0]);
  const [region, setRegion] = useState(regionOptions[0]);
  const [pay, setPay] = useState(payOptions[0]);
  const [category, setCategory] = useState(categoryOptions[0]);
  const [preference, setPreference] = useState(preferenceOptions[0]);
  const [content, setContent] = useState('');
  const [author] = useState('익명');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!company.trim()) return alert('회사명을 입력해주세요.');
    if (!title.trim()) return alert('제목을 입력해주세요.');
    if (!content.trim()) return alert('내용을 입력해주세요.');

    const newItem = {
      id: Date.now(),
      company: company.trim(),
      title: title.trim(),
      time, days, region, pay, category, preference,
      content, author,
      createdAt: new Date().toISOString(),
    };
    setJobPosts([newItem, ...jobPosts]);
    navigate('/recruit');
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">새 채용공고 작성</h1>
      <div className="mb-4">
        <label className="block mb-1">회사명</label>
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          placeholder="회사명을 입력하세요"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">제목</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          placeholder="제목을 입력하세요"
        />
      </div>
      {/* 상세조건 */}
      {[
        ['근무시간', time, setTime, timeOptions],
        ['근무요일', days, setDays, daysOptions],
        ['지역', region, setRegion, regionOptions],
        ['급여', pay, setPay, payOptions],
        ['카테고리', category, setCategory, categoryOptions],
        ['우대사항', preference, setPreference, preferenceOptions],
      ].map(([label, value, setter, opts]) => (
        <div key={label} className="mb-4">
          <label className="block mb-1">{label}</label>
          <select
            value={value}
            onChange={(e) => setter(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            {opts.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
      ))}
      <div className="mb-4">
        <label className="block mb-1">내용</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-40 border rounded p-3"
          placeholder="공고 내용을 입력하세요"
        />
      </div>
      <Button onClick={handleSubmit} className="bg-[#7989F6] text-white">
        등록
      </Button>
    </div>
  );
};

export default RecruitNew;
