import { useContext, useState, useEffect } from "react";
import Post from "../components/Post";
import { jobPostContext } from "../contexts/jobPostContext";

function Recruit() {
  const { jobPosts } = useContext(jobPostContext);

  const [region,    setRegion]    = useState("");
  const [category,  setCategory]  = useState("");
  const [condition, setCondition] = useState("");
  const [detail,    setDetail]    = useState("");
  const [keyword,   setKeyword]   = useState("");
  const [filtered,  setFiltered]  = useState([]);

  useEffect(() => {
    setFiltered(jobPosts);
  }, [jobPosts]);

  const normalize = (str = "") =>
    str.replace(/['"\u201C\u201D]/g, "").trim().toLowerCase();

  const handleSearch = () => {
    const rgn  = normalize(region);
    const cat  = normalize(category);
    const cond = normalize(condition);
    const det  = normalize(detail);
    const key  = normalize(keyword);

    const result = jobPosts.filter((p) => {
      const prgn  = normalize(p.region);
      const pcmp  = normalize(p.company);
      const pcat  = normalize(p.category);
      const pcond = normalize(p.condition);
      const pdet  = normalize(p.detail);
      const pttl  = normalize(p.title);

      return (
        (rgn === "" || prgn.includes(rgn) || pcmp.includes(rgn)) &&
        (cat === ""  || pcat.includes(cat)) &&
        (cond === "" || pcond.includes(cond)) &&
        (det === ""  || pdet.includes(det)) &&
        (key === "" ||
          pttl.includes(key) ||
          pcmp.includes(key) ||
          prgn.includes(key) ||
          pcat.includes(key) ||
          pcond.includes(key) ||
          pdet.includes(key)
        )
      );
    });

    setFiltered(result);
  };

  const handleReset = () => {
    setRegion("");
    setCategory("");
    setCondition("");
    setDetail("");
    setKeyword("");
    setFiltered(jobPosts);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="w-full p-6 bg-gray-50 rounded-xl">
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <div className="grid grid-cols-4 gap-4 mb-4">
          <input
            className="border border-black rounded-lg px-4 py-2"
            placeholder="지역"
            value={region}
            onChange={e => setRegion(e.target.value)}
            onKeyDown={onKeyDown}
          />
          <input
            className="border border-black rounded-lg px-4 py-2"
            placeholder="업직종"
            value={category}
            onChange={e => setCategory(e.target.value)}
            onKeyDown={onKeyDown}
          />
          <input
            className="border border-black rounded-lg px-4 py-2"
            placeholder="근무조건"
            value={condition}
            onChange={e => setCondition(e.target.value)}
            onKeyDown={onKeyDown}
          />
          <input
            className="border border-black rounded-lg px-4 py-2"
            placeholder="상세조건"
            value={detail}
            onChange={e => setDetail(e.target.value)}
            onKeyDown={onKeyDown}
          />
        </div>
        <textarea
          className="w-full border border-black rounded-lg px-4 py-2 mb-4"
          rows={3}
          placeholder="키워드 입력"
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <div className="flex justify-end space-x-4">
          <button
            className="border border-black rounded-lg px-6 py-2"
            onClick={handleReset}
          >
            초기화
          </button>
          <button
            className="bg-[#7989F6] text-white rounded-lg px-6 py-2"
            onClick={handleSearch}
          >
            검색
          </button>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">오늘의 채용정보</h2>
      <ul className="divide-y">
        {filtered.length > 0 ? (
          filtered.map(item => (
            <li key={item.id} className="py-4">
              <Post {...item} />
            </li>
          ))
        ) : (
          <li className="text-center text-gray-500 py-8">
            검색 결과가 없습니다.
          </li>
        )}
      </ul>
    </div>
  );
}

export default Recruit;
