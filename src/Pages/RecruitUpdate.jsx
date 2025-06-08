import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';
import { jobPostContext } from '../contexts/jobPostContext';

const timeOptions = ['오전', '오후', '풀타임', '협의 후 결정'];
const daysOptions = ['평일', '주말', '야간', '주휴'];
const categoryOptions = ['편의점', '음식점', '사무직', '서비스업', '기술직', '기타'];
const regionOptions = ['강남구', '용산구', '동작구', '송파구', '마포구', '서초구', '영등포구', '종로구', '중구', '관악구', '구로구', '광진구', '성동구', '노원구', '강북구'];
const payOptions = ['10,000원', '10,500원', '11,000원', '12,000원', '12,500원', '협의 후 결정'];
const preferenceOptions = ['경력자 우대', '초보 가능', '급구', '친절'];

const RecruitUpdate = () => {
  const { id } = useParams();
  const { jobPosts, setJobPosts } = useContext(jobPostContext);
  const [form, setForm] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const post = jobPosts.find((p) => p.id === Number(id));
    if (!post) return navigate('/recruit');
    setForm(post);
  }, [id, jobPosts, navigate]);

  const updateField = (field, value) =>
    setForm({ ...form, [field]: value });

  const handleUpdate = () => {
    setJobPosts(jobPosts.map((p) => (p.id === form.id ? form : p)));
    navigate('/recruit');
  };

  if (!form) return <p>로딩 중...</p>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">공고 수정</h1>

      <div className="mb-4">
        <label className="block mb-1">회사명</label>
        <input
          value={form.company}
          onChange={(e) => updateField('company', e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">제목</label>
        <input
          value={form.title}
          onChange={(e) => updateField('title', e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      {[
        ['time', '근무시간', timeOptions],
        ['days', '근무요일', daysOptions],
        ['region', '지역', regionOptions],
        ['pay', '급여', payOptions],
        ['category', '카테고리', categoryOptions],
        ['preference', '우대사항', preferenceOptions],
      ].map(([key, label, opts]) => (
        <div key={key} className="mb-4">
          <label className="block mb-1">{label}</label>
          <select
            value={form[key]}
            onChange={(e) => updateField(key, e.target.value)}
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
          value={form.content}
          onChange={(e) => updateField('content', e.target.value)}
          className="w-full h-40 border rounded p-3"
        />
      </div>

      <Button onClick={handleUpdate} className="bg-blue-500 text-white">
        저장
      </Button>
    </div>
  );
};

export default RecruitUpdate;
