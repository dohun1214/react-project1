import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Post from '../components/Post';
import { jobPostContext } from '../contexts/jobPostContext';

const RecruitBoard = () => {
  const { jobPosts } = useContext(jobPostContext);
  const [filtered, setFiltered] = useState([]);
  const [region, setRegion] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [detail, setDetail] = useState('');
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    setFiltered(jobPosts);
  }, [jobPosts]);

  const normalize = (str = '') =>
    str.replace(/['"\u201C\u201D]/g, '').trim().toLowerCase();

  const handleSearch = () => {
    const r = normalize(region);
    const c = normalize(category);
    const co = normalize(condition);
    const d = normalize(detail);
    const k = normalize(keyword);

    setFiltered(
      jobPosts.filter((p) => {
        const pr = normalize(p.region);
        const pc = normalize(p.category);
        const pco = normalize(p.condition);
        const pd = normalize(p.detail);
        const pt = normalize(p.title);
        return (
          (r === '' || pr.includes(r)) &&
          (c === '' || pc.includes(c)) &&
          (co === '' || pco.includes(co)) &&
          (d === '' || pd.includes(d)) &&
          (k === '' || pt.includes(k) || pr.includes(k) || pc.includes(k))
        );
      })
    );
  };

  const handleReset = () => {
    setRegion('');
    setCategory('');
    setCondition('');
    setDetail('');
    setKeyword('');
    setFiltered(jobPosts);
  };

  const onKeyDown = (e) => e.key === 'Enter' && handleSearch();

  return (
    <div className="p-6 bg-gray-50">
      {/* 검색 폼 */}
      <div className="mb-6 bg-white p-6 rounded shadow">
        {/* 4 inputs + textarea + buttons */}
        {/* ...위 RecruitBoard 검색 UI 코드 그대로... */}
        <div className="flex justify-between mb-4">
          <Link to="/recruit/new">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              새 공고 작성
            </button>
          </Link>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">오늘의 채용정보</h2>
      <ul className="divide-y">
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <li key={item.id} className="py-4">
              <Link to={`/recruit/${item.id}`}>
                <Post {...item} />
              </Link>
            </li>
          ))
        ) : (
          <li className="py-8 text-center text-gray-500">
            검색 결과가 없습니다.
          </li>
        )}
      </ul>
    </div>
  );
};

export default RecruitBoard;